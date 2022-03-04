import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    const { title, content } = createPostDto;

    const createdPost = await this.prismaService.post.create({
      data: { title, content, userId },
    });

    return createdPost;
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
