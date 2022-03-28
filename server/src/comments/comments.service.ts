import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import {
  CommentRO,
  CreateCommentOrReplyDto,
  rawReply,
  FindReplyDto,
  ReplyRO,
  rawComment,
} from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCommentOrReply(
    createCommentDto: CreateCommentOrReplyDto,
    userId: number,
    postId: number,
  ): Promise<CommentRO> {
    const { comment_text, replyToUserId, parentCommentId, isReply } =
      createCommentDto;

    const createCommentOrReply = this.prismaService.comments.create({
      data: {
        postId,
        userId,
        comment_text,
        replyToUserId,
        parentCommentId,
        isReply,
      },
      include: { user: { select: { username: true } } },
    });

    // If it's a reply
    if (parentCommentId && replyToUserId) {
      const addOneToParentAmount = this.prismaService.comments.update({
        where: { id: parentCommentId },
        data: { replyAmount: { increment: 1 } },
      });

      const res = await this.prismaService.$transaction([
        createCommentOrReply,
        addOneToParentAmount,
      ]);

      return res[0];
    }

    return createCommentOrReply;
  }

  async findAllComments(postId: number, userId: number): Promise<CommentRO[]> {
    const res = await this.prismaService.comments.findMany({
      where: {
        postId,
        OR: [
          { parentCommentId: { equals: null } },
          { replyToUserId: { equals: null } },
        ],
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

    return this.buildCommentRO(res);
  }

  async findAllReplies(
    postId: number,
    findReplyDto: FindReplyDto,
  ): Promise<ReplyRO[]> {
    const { parentCommentId } = findReplyDto;

    // https://stackoverflow.com/questions/8779918/postgres-multiple-joins
    const data = await this.prismaService.$queryRaw<rawReply>`select 
      comments.*, comments."replyToUserId", comments."userId", 
          "replyToUsername".username as "replyToUsername", "user".username,   
      from comments 
          join "user" as "replyToUsername" on "replyToUsername".id = comments."replyToUserId" 
          join "user" on "user".id = comments."userId"
      where comments."postId" = ${postId} and comments."parentCommentId" = ${parentCommentId};
    `;

    return this.buildReplyRO(data);
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

    return this.prismaService.comments.update({
      where: { id },
      data: { comment_text },
      include: { user: { select: { username: true } } },
    });
  }

  async deleteComment(id: number, userId: number): Promise<boolean> {
    const originalComment = await this.prismaService.comments.findUnique({
      where: { id },
    });
    if (originalComment.userId !== userId) return null;

    await this.prismaService.comments.delete({ where: { id } });

    return true;
  }

  private buildReplyRO(input: rawReply): ReplyRO[] {
    const res: ReplyRO[] = [];

    for (let i = 0; i < input.length; i++) {
      const inputItem = input[i];
      const commentOrReplyRO = {
        ...inputItem,
        user: { username: inputItem.username },
        replyToUser: { username: inputItem.replyToUsername },
      };

      delete commentOrReplyRO.username;
      delete commentOrReplyRO.replyToUsername;

      res.push(commentOrReplyRO);
    }

    return res;
  }

  private buildCommentRO(input: rawComment): CommentRO[] {
    const res: CommentRO[] = [];

    for (let i = 0; i < input.length; i++) {
      const inputItem = input[i];

      const commentRO = {
        ...inputItem,
        commentInteractions: inputItem.commentInteractions[0],
      };

      res.push(commentRO);
    }

    return res;
  }
}
