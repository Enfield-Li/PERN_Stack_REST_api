import { Injectable } from '@nestjs/common';
import { interactions, post } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { SocketGateway } from 'src/socket/socket.gateway';
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

    // refactor json data
    const interactions = createdPost[0].interactions[0];
    delete createdPost[0].interactions;

    return { post: createdPost[0], interactions };
  }

  async getPaginatedPost(
    sortBy: 'new' | 'hot' | 'best',
    userId: number,
    take: number,
    cursor?: Date,
  ): Promise<PaginatedPost> {
    const takeLimit = Math.min(25, take);
    const takeLimitPlusOne = takeLimit + 1;

    let dateSpec: Date | undefined = undefined;
    if (cursor) {
      if (sortBy === 'best') {
        dateSpec = this.calculateDate(30, cursor);
      } else if (sortBy === 'hot') {
        dateSpec = this.calculateDate(7, cursor);
      }
    }

    let sortCondition: any;
    if (sortBy === 'new') {
      sortCondition = undefined;
    } else if (sortBy === 'best') {
      sortCondition = {
        votePoints: { gte: 30 },
        laughPoints: { gte: 20 },
        createdAt: { gte: dateSpec },
      };
    } else if (sortBy === 'hot') {
      sortCondition = {
        createdAt: { gte: dateSpec },
        likePoints: { gte: 20 },
      };
    }

    const posts = await this.prismaService.post.findMany({
      take: takeLimitPlusOne,
      skip: cursor ? 1 : undefined,
      cursor: cursor ? { createdAt: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      where: sortCondition,
    });

    if (!posts.length) {
      return this.fetchPaginatedPostsSortByTop(take, 'all-time', userId);
    }

    const hasMore = posts.length === takeLimitPlusOne;

    const postAndInteractions = await this.processPostWithInteractions(
      hasMore,
      posts,
      userId,
    );

    return { hasMore, postAndInteractions };
  }

  async fetchPaginatedPostsSortByTop(
    take: number,
    time: 'half-year' | 'one-year' | 'all-time',
    userId: number,
    skipTimes?: number,
  ): Promise<PaginatedPost> {
    const takeLimit = Math.min(25, take);
    const takeLimitPlusOne = takeLimit + 1;
    let dateSpec: Date | undefined = undefined;

    if (time === 'half-year') {
      dateSpec = this.calculateDate(180, new Date(Date.now()));
    } else if (time === 'one-year') {
      dateSpec = this.calculateDate(360, new Date(Date.now()));
    }

    // ugly as f*ck
    const posts = await this.prismaService.post.findMany({
      take: takeLimitPlusOne,
      skip: skipTimes ? takeLimitPlusOne * skipTimes : undefined,
      where: time === 'all-time' ? undefined : { createdAt: { gte: dateSpec } },
      orderBy: { votePoints: 'desc' },
      include: { user: { select: { username: true } } },
    });

    const hasMore = posts.length === takeLimitPlusOne;

    const postAndInteractions = await this.processPostWithInteractions(
      hasMore,
      posts,
      userId,
    );

    return { hasMore, postAndInteractions };
  }

  async fetchOnePost(
    userId: number,
    postId: number,
  ): Promise<PostAndInteraction> {
    const post = this.prismaService.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    const incrementView = this.prismaService.post.update({
      where: { id: postId },
      data: { viewCount: { increment: 1 } },
    });

    const createdPost = await this.prismaService.$transaction([
      post,
      incrementView,
    ]);

    let interactions: interactions | null = null;

    if (userId) {
      interactions = await this.prismaService.interactions.findUnique({
        where: { userId_postId: { userId, postId } },
      });
    }

    return { post: createdPost[0], interactions };
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

  async voteAndInteractWithPost(
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

  private calculateDate(daysLimit: number, dateSpe: Date): Date {
    //number of milliseconds in a day
    const days = 86400000;

    let daysPlus: number = days * daysLimit;

    const itemsBeforeDate = new Date(dateSpe.getTime() - daysPlus);

    return itemsBeforeDate;
  }

  private async processPostWithInteractions(
    hasMore: boolean,
    posts: (post & {
      user: {
        username: string;
      };
    })[],
    userId: number,
  ): Promise<PostAndInteraction[]> {
    // make sure return full list if hasMore === false
    const fullLength = hasMore ? posts.length - 1 : posts.length;
    const postAndInteractions: PostAndInteraction[] = [];

    for (let i = 0; i < fullLength; i++) {
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

    return postAndInteractions;
  }
}
