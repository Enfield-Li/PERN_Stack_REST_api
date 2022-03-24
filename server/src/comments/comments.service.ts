import { Injectable } from '@nestjs/common';
import { comments } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import {
  CommentOrReplyRO,
  CreateCommentOrReplyDto,
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

    return this.prismaService.comments.create({
      data: { postId, userId, comment_text, replyToUserId, parentCommentId },
      include: { user: { select: { username: true } } },
    });
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

  async findAllReplies(postId: number, findReplyDto: FindReplyDto) {
    const { parentCommentId } = findReplyDto;

    return this.prismaService.comments.findMany({
      where: { postId, parentCommentId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
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
}
