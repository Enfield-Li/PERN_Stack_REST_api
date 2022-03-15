import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
    postId: number,
  ) {
    const { comment_text, parentId } = createCommentDto;

    const res = await this.prismaService.comments.create({
      data: { postId, userId, comment_text, parentId },
    });

    return res;
  }

  async findAll(postId: number) {
    const res = await this.prismaService.comments.findMany({
      where: { postId },
      include: { user: { select: { username: true } } },
    });

    return res;
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
