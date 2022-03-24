import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import {
  CommentOrReplyRO,
  CreateCommentOrReplyDto,
  FetchRelyWithReplyToUserId,
  FindReplyDto,
} from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCommentOrReply(
    createCommentDto: CreateCommentOrReplyDto,
    userId: number,
    postId: number,
  ): Promise<CommentOrReplyRO> {
    const { comment_text, replyToUserId, parentCommentId } = createCommentDto;

    const createCommentOrReply = this.prismaService.comments.create({
      data: { postId, userId, comment_text, replyToUserId, parentCommentId },
      include: { user: { select: { username: true } } },
    });

    // If it's a reply
    if (replyToUserId && parentCommentId) {
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

  async findAllComments(postId: number): Promise<CommentOrReplyRO[]> {
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
  ): Promise<CommentOrReplyRO[]> {
    const { parentCommentId, replyToUserId } = findReplyDto;

    const data = await this.prismaService
      .$queryRaw<FetchRelyWithReplyToUserId>`select comments.*, comments."replyToUserId", "user".username 
      from comments join "user" on "user".id = comments."replyToUserId" 
      where comments."postId" = ${postId} 
      and comments."parentCommentId" = ${parentCommentId} 
      and comments."replyToUserId" = ${replyToUserId};
    `;

    return this.buildCommentOrReplyROArr(data);
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }

  private buildCommentOrReplyROArr(
    input: FetchRelyWithReplyToUserId,
  ): CommentOrReplyRO[] {
    const res: CommentOrReplyRO[] = [];

    for (let i = 0; i < input.length; i++) {
      const inputItem = input[i];
      const commentOrReplyRO = {
        user: { username: inputItem.username },
        ...inputItem,
      };

      delete commentOrReplyRO.username;
      res.push(commentOrReplyRO);
    }

    return res;
  }
}
