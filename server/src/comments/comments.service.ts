import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import {
  CommentData,
  CommentRO,
  CreateCommentOrReplyDto,
  FindReplyDto,
  ReplyData,
  ReplyRO,
} from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCommentOrReply(
    createCommentDto: CreateCommentOrReplyDto,
    userId: number,
    postId: number,
  ) {
    const { comment_text, replyToUserId, parentCommentId } = createCommentDto;

    // If it's a reply
    if (parentCommentId && replyToUserId) {
      const createReply = this.prismaService.comments.create({
        data: {
          comment_text,
          userId,
          postId,
          parentCommentId,
          parentComment: {
            create: { replyToUserId },
          },
        },
        include: { user: { select: { username: true } } },
      });

      const addOneToParentAmount = this.prismaService.comments.update({
        where: { id: parentCommentId },
        data: { replyAmount: { increment: 1 } },
      });

      const res = await this.prismaService.$transaction([
        createReply,
        addOneToParentAmount,
      ]);

      return res[0];
    }

    const createCommentOrReply = this.prismaService.comments.create({
      data: {
        postId,
        userId,
        comment_text,
      },
      include: { user: { select: { username: true } } },
    });

    return createCommentOrReply;
  }

  async findAllComments(postId: number, userId: number): Promise<CommentRO[]> {
    const res = await this.prismaService.comments.findMany({
      where: {
        postId,
        parentCommentId: null,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        commentInteractions: userId ? { where: { userId } } : false,
      },
      orderBy: { createdAt: 'desc' },
    });

    console.log(res);

    return this.buildCommentRO(res);
  }

  async findAllReplies(
    postId: number,
    findReplyDto: FindReplyDto,
    userId: number,
  ): Promise<ReplyRO[]> {
    const { parentCommentId } = findReplyDto;

    // https://stackoverflow.com/questions/8779918/postgres-multiple-joins
    // const data = await this.prismaService.$queryRaw<rawReply>`select
    //   comments.*, comments."replyToUserId", comments."userId",
    //       "replyToUsername".username as "replyToUsername", "user".username,
    //   from comments
    //       join "user" as "replyToUsername" on "replyToUsername".id = comments."replyToUserId"
    //       join "user" on "user".id = comments."userId"
    //   where comments."postId" = ${postId} and comments."parentCommentId" = ${parentCommentId};
    // `;

    // return this.buildReplyRO(data);
    const res = await this.prismaService.comments.findMany({
      where: { postId, parentCommentId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        commentInteractions: userId ? { where: { userId } } : false,
        parentComment: { include: { user: { select: { username: true } } } },
      },
    });

    return this.buildReplyRO(res);
  }

  async editComment(
    id: number,
    updateCommentDto: UpdateCommentDto,
    userId: number,
  ): Promise<CommentRO> {
    const originalComment = await this.prismaService.comments.findUnique({
      where: { id },
    });
    if (originalComment.userId !== userId) return null;

    const { comment_text } = updateCommentDto;
  }

  async deleteComment(id: number, userId: number): Promise<boolean> {
    const originalComment = await this.prismaService.comments.findUnique({
      where: { id },
    });
    if (originalComment.userId !== userId) return null;

    await this.prismaService.comments.delete({ where: { id } });

    return true;
  }

  private buildCommentRO(data: CommentData): CommentRO[] {
    const commentRO: CommentRO[] = [];

    for (let i = 0; i < data.length; i++) {
      const comment = data[i];

      const res: CommentRO = {
        ...comment,
        commentInteractions: comment.commentInteractions[0],
      };

      commentRO.push(res);
    }

    return commentRO;
  }

  private buildReplyRO(data: ReplyData): ReplyRO[] {
    const replyRO: ReplyRO[] = [];

    for (let i = 0; i < data.length; i++) {
      const reply = data[i];

      const res: ReplyRO = {
        ...reply,
        commentInteractions: reply.commentInteractions[0],
        parentComment: { username: reply.parentComment[0].user.username },
      };

      replyRO.push(res);
    }

    return replyRO;
  }
}
