import { Injectable } from '@nestjs/common';
import { post } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import {
  CreatePostDto,
  PaginatedPost,
  PostAndInteractions,
} from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(
    createPostDto: CreatePostDto,
    userId: number,
  ): Promise<PostAndInteractions> {
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
      include: {
        user: { select: { username: true } },
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
    // return {
    //   user: createdPost[0].user,
    //   posts: { ...createdPost[0] },
    // };
  }

  async getPaginatedPost(
    userId: number,
    take: number = 10,
    cursor?: Date,
  ): Promise<PaginatedPost> {
    const takeLimit = Math.min(25, take);
    const takeLimitPlusOne = takeLimit + 1;

    const posts = await this.prismaService.post.findMany({
      take: takeLimitPlusOne,
      skip: cursor ? 1 : undefined,
      orderBy: { createdAt: 'desc' },
      cursor: cursor ? { createdAt: cursor } : undefined,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    let postAndInteractions: PostAndInteractions[] = [];

    // if user is loged in, then show their interactions with post[]
    if (userId) {
      for (let i = 0; i < posts.length - 1; i++) {
        const interactions = await this.prismaService.interactions.findUnique({
          where: { userId_postId: { userId, postId: posts[i].id } },
        });

        const postIdMapToInteractions: PostAndInteractions = {
          ...posts[i],
          user: {
            ...posts[i].user,
            interactions,
          },
        };

        postAndInteractions.push(postIdMapToInteractions);
      }
    }

    // no interactions without loged in
    else {
      posts.forEach((post) => {
        postAndInteractions = posts;
      });
    }

    return {
      hasMore: posts.length === takeLimitPlusOne,
      postAndInteractions,
    };
  }

  async getOnePost(userId: number, postId: number): Promise<post> {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            username: true,
            interactions: userId ? { where: { userId, postId } } : false,
          },
        },
      },
    });

    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
