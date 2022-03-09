import { HttpException, Injectable } from '@nestjs/common';
import { interactions } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import {
  CreatePostDto,
  PaginatedPost,
  PostAndInteraction,
} from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(
    createPostDto: CreatePostDto,
    userId: number,
  ): Promise<PostAndInteraction> {
    const { title, content } = createPostDto;

    // create post & create relevant interactions
    const createPost = this.prismaService.post.create({
      data: {
        title,
        content,
        userId,
        votePoints: 1, // self voted when creating post
        likePoints: 1, // self liked when creating post
        interactions: {
          create: { userId, voteStatus: true, likeStatus: true },
        },
      },
      include: {
        user: { select: { username: true, id: true } },
        interactions: { where: { userId } },
      },
    });

    // update user postAmounts - increament one
    const updateUserPostAmounts = this.prismaService.user.update({
      data: {
        postAmounts: {
          increment: 1,
        },
      },
      where: { id: userId },
    });

    const createdPost = await this.prismaService.$transaction([
      createPost,
      updateUserPostAmounts,
    ]);

    const interactions = createdPost[0].interactions[0];

    delete createdPost[0].interactions;

    return { post: createdPost[0], interactions };
  }

  async getPaginatedPost(
    userId: number,
    take: number = 10,
    cursor?: Date,
  ): Promise<PaginatedPost> {
    const takeLimit = Math.min(25, take);
    const takeLimitPlusOne = takeLimit + 1;

    const posts = await this.prismaService.post.findMany({
      take: takeLimitPlusOne,
      skip: cursor ? 1 : undefined,
      orderBy: { createdAt: 'desc' },
      cursor: cursor ? { createdAt: cursor } : undefined,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    const postAndInteractions: PostAndInteraction[] = [];

    for (let i = 0; i < posts.length - 1; i++) {
      // send snippets numbering 49
      posts[i].content = posts[i].content.slice(0, 50);

      let interactions: interactions | null = null;

      if (userId) {
        interactions = await this.prismaService.interactions.findUnique({
          where: { userId_postId: { userId, postId: posts[i].id } },
        });
      }

      postAndInteractions[i] = {
        post: posts[i],
        interactions,
      };
    }

    return {
      hasMore: posts.length === takeLimitPlusOne,
      postAndInteractions,
    };
  }

  async fetchOnePost(
    userId: number,
    postId: number,
  ): Promise<PostAndInteraction> {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    let interactions: interactions | null = null;

    if (userId) {
      interactions = await this.prismaService.interactions.findUnique({
        where: { userId_postId: { userId, postId: post.id } },
      });
    }

    return { post, interactions };
  }

  async editPost(
    id: number,
    updatePostDto: UpdatePostDto,
    userId: number,
  ): Promise<PostAndInteraction> {
    // check if user owns the post
    const originalPost = await this.prismaService.post.findUnique({
      where: { id },
    });
    if (originalPost.userId !== userId) return null;

    const { title, content } = updatePostDto;

    const updatedPost = await this.prismaService.post.update({
      where: { id },
      data: {
        title,
        content,
      },
      include: { interactions: { where: { userId: userId } } },
    });

    const interactions = updatedPost.interactions[0];
    delete updatedPost.interactions;

    return { post: updatedPost, interactions };
  }

  async deletePost(id: number): Promise<Boolean> {
    await this.prismaService.post.delete({ where: { id } });

    return true;
  }

  async votePost(
    postId: number,
    userId: number,
    value: boolean,
    field: 'vote' | 'like' | 'laugh' | 'confused',
  ): Promise<Boolean> {
    const interactions = await this.prismaService.interactions.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (field === 'vote') {
      // user has not interacted before so to create new interactions
      if (!interactions) {
        await this.prismaService.post.update({
          where: { id: postId },
          data: {
            votePoints: value ? { increment: 1 } : { decrement: 1 },
            interactions: {
              // create here
              create: {
                userId,
                voteStatus: value,
              },
            },
          },
        });
      }

      // user has not voted before
      else {
        if (interactions.voteStatus === null) {
          await this.prismaService.post.update({
            where: { id: postId },
            data: {
              votePoints: value ? { increment: 1 } : { decrement: 1 },
              interactions: {
                // update here
                update: {
                  data: {
                    voteStatus: value,
                  },
                  where: { userId_postId: { userId, postId } },
                },
              },
            },
          });
        }

        // user has voted before and want to undo vote
        if (
          interactions.voteStatus === value &&
          interactions.voteStatus !== null
        ) {
          await this.prismaService.post.update({
            where: { id: postId },
            data: {
              votePoints: value ? { decrement: 1 } : { increment: 1 },
              interactions: {
                update: {
                  data: {
                    voteStatus: null,
                  },
                  where: { userId_postId: { userId, postId } },
                },
              },
            },
          });
        }

        // user has voted before and want to change vote
        if (
          interactions.voteStatus !== value &&
          interactions.voteStatus !== null
        ) {
          await this.prismaService.post.update({
            where: { id: postId },
            data: {
              votePoints: value ? { increment: 2 } : { decrement: 2 },
              interactions: {
                update: {
                  data: {
                    voteStatus: value,
                  },
                  where: { userId_postId: { userId, postId } },
                },
              },
            },
          });
        }
      }
    }

    if (field === 'laugh') {
      // user has not interacted before so to create new interactions
      if (!interactions) {
        await this.prismaService.post.update({
          where: { id: postId },
          data: {
            laughPoints: value ? { increment: 1 } : { decrement: 1 },
            interactions: {
              // create here
              create: {
                userId,
                laughStatus: value,
              },
            },
          },
        });
      }

      // user has not laughd before
      else {
        if (interactions.laughStatus === null) {
          await this.prismaService.post.update({
            where: { id: postId },
            data: {
              laughPoints: value ? { increment: 1 } : { decrement: 1 },
              interactions: {
                // update here
                update: {
                  data: {
                    laughStatus: value,
                  },
                  where: { userId_postId: { userId, postId } },
                },
              },
            },
          });
        }

        // user has laughd before and want to undo laugh
        if (
          interactions.laughStatus === value &&
          interactions.laughStatus !== null
        ) {
          await this.prismaService.post.update({
            where: { id: postId },
            data: {
              laughPoints: value ? { decrement: 1 } : { increment: 1 },
              interactions: {
                update: {
                  data: {
                    laughStatus: null,
                  },
                  where: { userId_postId: { userId, postId } },
                },
              },
            },
          });
        }

        // user has laughd before and want to change laugh
        if (
          interactions.laughStatus !== value &&
          interactions.laughStatus !== null
        ) {
          await this.prismaService.post.update({
            where: { id: postId },
            data: {
              laughPoints: value ? { increment: 2 } : { decrement: 2 },
              interactions: {
                update: {
                  data: {
                    laughStatus: value,
                  },
                  where: { userId_postId: { userId, postId } },
                },
              },
            },
          });
        }
      }
    }

    if (field === 'like') {
      // user has not interacted before so to create new interactions
      if (!interactions) {
        await this.prismaService.post.update({
          where: { id: postId },
          data: {
            likePoints: value ? { increment: 1 } : { decrement: 1 },
            interactions: {
              // create here
              create: {
                userId,
                likeStatus: value,
              },
            },
          },
        });
      }

      // user has not liked before
      else {
        if (interactions.likeStatus === null) {
          await this.prismaService.post.update({
            where: { id: postId },
            data: {
              likePoints: value ? { increment: 1 } : { decrement: 1 },
              interactions: {
                // update here
                update: {
                  data: {
                    likeStatus: value,
                  },
                  where: { userId_postId: { userId, postId } },
                },
              },
            },
          });
        }

        // user has liked before and want to undo like
        if (
          interactions.likeStatus === value &&
          interactions.likeStatus !== null
        ) {
          await this.prismaService.post.update({
            where: { id: postId },
            data: {
              likePoints: value ? { decrement: 1 } : { increment: 1 },
              interactions: {
                update: {
                  data: {
                    likeStatus: null,
                  },
                  where: { userId_postId: { userId, postId } },
                },
              },
            },
          });
        }

        // user has liked before and want to change like
        if (
          interactions.likeStatus !== value &&
          interactions.likeStatus !== null
        ) {
          await this.prismaService.post.update({
            where: { id: postId },
            data: {
              likePoints: value ? { increment: 2 } : { decrement: 2 },
              interactions: {
                update: {
                  data: {
                    likeStatus: value,
                  },
                  where: { userId_postId: { userId, postId } },
                },
              },
            },
          });
        }
      }
    }

    if (field === 'confused') {
      // user has not interacted before so to create new interactions
      if (!interactions) {
        await this.prismaService.post.update({
          where: { id: postId },
          data: {
            confusedPoints: value ? { increment: 1 } : { decrement: 1 },
            interactions: {
              // create here
              create: {
                userId,
                confusedStatus: value,
              },
            },
          },
        });
      }

      // user has not confusedd before
      else {
        if (interactions.confusedStatus === null) {
          await this.prismaService.post.update({
            where: { id: postId },
            data: {
              confusedPoints: value ? { increment: 1 } : { decrement: 1 },
              interactions: {
                // update here
                update: {
                  data: {
                    confusedStatus: value,
                  },
                  where: { userId_postId: { userId, postId } },
                },
              },
            },
          });
        }

        // user has confusedd before and want to undo confused
        if (
          interactions.confusedStatus === value &&
          interactions.confusedStatus !== null
        ) {
          await this.prismaService.post.update({
            where: { id: postId },
            data: {
              confusedPoints: value ? { decrement: 1 } : { increment: 1 },
              interactions: {
                update: {
                  data: {
                    confusedStatus: null,
                  },
                  where: { userId_postId: { userId, postId } },
                },
              },
            },
          });
        }

        // user has confusedd before and want to change confused
        if (
          interactions.confusedStatus !== value &&
          interactions.confusedStatus !== null
        ) {
          await this.prismaService.post.update({
            where: { id: postId },
            data: {
              confusedPoints: value ? { increment: 2 } : { decrement: 2 },
              interactions: {
                update: {
                  data: {
                    confusedStatus: value,
                  },
                  where: { userId_postId: { userId, postId } },
                },
              },
            },
          });
        }
      }
    }

    return true;
  }
}
