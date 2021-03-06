import { Injectable } from '@nestjs/common';
import { interactions } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { InteractionIds, VoteFields } from './dto/create-interaction.dto';

@Injectable()
export class InteractionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async fetchInteractives(
    userId: number,
    getAll: boolean,
  ): Promise<interactions[]> {
    const interactives = await this.prismaService.interactions.findMany({
      // Fetch based on Post's creator ie. userId
      where: {
        post: { userId },
        // Exclude oneself's interactives with it's own post
        userId: { not: userId },
        // One or more conditions must return true.
        OR: [
          { voteStatus: { not: null } },
          { laughStatus: { not: null } },
          { likeStatus: { not: null } },
        ],
      },

      // Plus voting user's name
      include: {
        user: { select: { username: true } },
        post: { select: { title: true } },
      },

      orderBy: { updatedAt: 'desc' },
      take: getAll === true ? undefined : 5,
    });

    return interactives;
  }

  async setNotificationChecked(ids: InteractionIds[]) {
    for (let i = 0; i < ids.length; i++) {
      const { userId, postId } = ids[i];

      await this.prismaService.interactions.update({
        data: { checked: true },
        where: { userId_postId: { userId, postId } },
      });
    }

    return true;
  }

  async setInteractionRead(ids: InteractionIds) {
    const { userId, postId } = ids;

    await this.prismaService.interactions.update({
      where: { userId_postId: { userId, postId } },
      data: { read: true },
    });

    return true;
  }

  async setAllInteractionsRead(ids: InteractionIds[]) {
    for (let i = 0; i < ids.length; i++) {
      const { userId, postId } = ids[i];

      await this.prismaService.interactions.update({
        data: { read: true },
        where: { userId_postId: { userId, postId } },
      });
    }

    return true;
  }

  async voteComment(
    commentId: number,
    userId: number,
    voteValue: boolean,
  ): Promise<boolean> {
    const votesOnComment =
      await this.prismaService.commentInteractions.findUnique({
        where: { userId_commentId: { userId, commentId } },
      });

    // Create new vote for comment
    if (!votesOnComment) {
      const createInteraction = this.prismaService.commentInteractions.create({
        data: {
          voteStatus: voteValue,
          commentId: commentId,
          userId,
        },
      });

      const updateCommentVoteAmount = this.prismaService.comments.update({
        where: { id: commentId },
        data: {
          upvoteAmount: voteValue ? { increment: 1 } : undefined,
          downvoteAmount: !voteValue ? { increment: 1 } : undefined,
        },
      });

      await this.prismaService.$transaction([
        createInteraction,
        updateCommentVoteAmount,
      ]);

      return true;
    }

    // Vote cacelled before
    else if (votesOnComment.voteStatus === null) {
      const createInteraction = this.prismaService.commentInteractions.update({
        where: { userId_commentId: { userId, commentId } },
        data: {
          voteStatus: voteValue ? true : false,
        },
      });

      const updateCommentVoteAmount = this.prismaService.comments.update({
        where: { id: commentId },
        data: {
          upvoteAmount: voteValue ? { increment: 1 } : undefined,
          downvoteAmount: !voteValue ? { increment: 1 } : undefined,
        },
      });

      await this.prismaService.$transaction([
        createInteraction,
        updateCommentVoteAmount,
      ]);

      return true;
    }

    // Cancel vote
    else if (votesOnComment.voteStatus === voteValue) {
      const createInteraction = this.prismaService.commentInteractions.update({
        where: { userId_commentId: { userId, commentId } },
        data: {
          voteStatus: null,
        },
      });

      const updateCommentVoteAmount = this.prismaService.comments.update({
        where: { id: commentId },
        data: {
          upvoteAmount: voteValue ? { decrement: 1 } : undefined,
          downvoteAmount: !voteValue ? { decrement: 1 } : undefined,
        },
      });

      await this.prismaService.$transaction([
        createInteraction,
        updateCommentVoteAmount,
      ]);

      return true;
    }

    // Change vote
    else if (votesOnComment.voteStatus !== voteValue) {
      const createInteraction = this.prismaService.commentInteractions.update({
        where: { userId_commentId: { userId, commentId } },
        data: {
          voteStatus: voteValue,
        },
      });

      const updateCommentVoteAmount = this.prismaService.comments.update({
        where: { id: commentId },
        data: {
          upvoteAmount: voteValue ? { increment: 1 } : { decrement: 1 },
          downvoteAmount: !voteValue ? { increment: 1 } : { decrement: 1 },
        },
      });

      await this.prismaService.$transaction([
        createInteraction,
        updateCommentVoteAmount,
      ]);

      return true;
    }

    return true;
  }

  async voteAndInteractWithPost(
    postId: number,
    userId: number,
    value: boolean,
    field: VoteFields,
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
        return true;
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
          return true;
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
          return true;
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
          return true;
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
        return true;
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
          return true;
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
          return true;
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
          return true;
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
        return true;
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
          return true;
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
          return true;
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
          return true;
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
        return true;
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
          return true;
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
          return true;
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
          return true;
        }
      }
    }

    return true;
  }
}
