import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { CreatePostDto, PostRO } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPostDto: CreatePostDto, userId: number): Promise<PostRO> {
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

    // createdPost returns [post, user]
    return createdPost[0];
  }

  async findPaginatedPost(take: number = 2, cursor?: number) {
    if (cursor)
      return this.prismaService.post.findMany({
        take, // default take 10
        skip: 1,
        cursor: {  }, // id
        orderBy: { createdAt: 'desc' },
      });

    return this.prismaService.post.findMany({
      take, // default take 10
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prismaService.post.findUnique({ where: { id } });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
