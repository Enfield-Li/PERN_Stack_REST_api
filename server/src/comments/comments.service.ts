import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import {
  CommentData,
  CommentDataArr,
  CommentRO,
  CreateCommentOrReplyDto,
  FindReplyDto,
  ReplyData,
  ReplyDataArr,
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
  ): Promise<CommentRO | ReplyRO> {
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
        include: {
          user: { select: { username: true } },
          parentComment: {
            include: { user: { select: { username: true, id: true } } },
          },
        },
      });

      const addOneToParentAmount = this.prismaService.comments.update({
        where: { id: parentCommentId },
        data: { replyAmount: { increment: 1 } },
      });

      const res = await this.prismaService.$transaction([
        createReply,
        addOneToParentAmount,
      ]);

      return this.buildReplyRO(res[0]);
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

    return this.buildCommentROArr(res);
  }

  async findAllReplies(
    postId: number,
    findReplyDto: FindReplyDto,
    userId: number,
  ): Promise<ReplyRO[]> {
    const { parentCommentId } = findReplyDto;

    const res = await this.prismaService.comments.findMany({
      where: { postId, parentCommentId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        commentInteractions: userId ? { where: { userId } } : false,
        parentComment: {
          include: { user: { select: { username: true, id: true } } },
        },
      },
    });

    return this.buildReplyROArr(res);
  }

  async editComment(
    id: number,
    updateCommentDto: UpdateCommentDto,
    userId: number,
  ): Promise<Boolean> {
    const originalComment = await this.prismaService.comments.findUnique({
      where: { id },
    });
    if (originalComment.userId !== userId) return null;

    const { comment_text } = updateCommentDto;

    await this.prismaService.comments.update({
      where: { id },
      data: {
        comment_text,
      },
    });

    return true;
  }

  async deleteComment(id: number, userId: number): Promise<boolean> {
    const originalComment = await this.prismaService.comments.findUnique({
      where: { id },
    });
    if (originalComment.userId !== userId) return null;

    await this.prismaService.comments.delete({ where: { id } });

    return true;
  }

  private buildCommentROArr(data: CommentDataArr): CommentRO[] {
    const commentRO: CommentRO[] = [];

    for (let i = 0; i < data.length; i++) {
      const comment = data[i];

      const res = this.buildCommentRO(comment);

      commentRO.push(res);
    }

    return commentRO;
  }

  private buildCommentRO(comment: CommentData): CommentRO {
    const commentRO: CommentRO = {
      ...comment,
      commentInteractions:
        comment.commentInteractions && comment.commentInteractions[0],
    };

    return commentRO;
  }

  private buildReplyROArr(data: ReplyDataArr): ReplyRO[] {
    const replyRO: ReplyRO[] = [];

    for (let i = 0; i < data.length; i++) {
      const reply = data[i];

      const res = this.buildReplyRO(reply);

      replyRO.push(res);
    }

    return replyRO;
  }

  private buildReplyRO(reply: ReplyData): ReplyRO {
    const replyRO: ReplyRO = {
      ...reply,
      commentInteractions:
        reply.commentInteractions && reply.commentInteractions[0],
      parentComment: {
        userId: reply.parentComment[0].user.id,
        username: reply.parentComment[0].user.username,
      },
    };

    return replyRO;
  }
}
