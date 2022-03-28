import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import {
  CommentRO,
  CreateCommentOrReplyDto,
  FetchRelyWithReplyToUserId,
  FindReplyDto,
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

  async findAllComments(postId: number): Promise<CommentRO[]> {
    return this.prismaService.comments.findMany({
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
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllReplies(
    postId: number,
    findReplyDto: FindReplyDto,
  ): Promise<ReplyRO[]> {
    const { parentCommentId } = findReplyDto;

    const data = await this.prismaService
      .$queryRaw<FetchRelyWithReplyToUserId>`select 
      comments.*, comments."replyToUserId", comments."userId", 
          "replyToUsername".username as "replyToUsername", "user".username  
      from comments 
          join "user" as "replyToUsername" on "replyToUsername".id = comments."replyToUserId" 
          join "user" on "user".id = comments."userId"
      where comments."postId" = ${postId} and comments."parentCommentId" = ${parentCommentId};
    `;

    return this.buildReplyROArr(data);
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
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

  private buildReplyROArr(input: FetchRelyWithReplyToUserId): ReplyRO[] {
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
}
