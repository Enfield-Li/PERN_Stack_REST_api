import { Injectable } from '@nestjs/common';
import { interactions, post } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import {
  CreatePostDto,
  PaginatedPost,
  PostAndInteraction,
} from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async searchPosts(
    keyword: string,
    take: number,
    userId: number,
    skipTimes: number,
  ): Promise<PaginatedPost> {
    const takeLimit = Math.min(25, take);
    const takeLimitPlusOne = takeLimit + 1;

    const posts = await this.prismaService.post.findMany({
      // Sort condition
      where: {
        OR: [
          { title: { search: keyword, mode: 'insensitive' } },
          { content: { search: keyword, mode: 'insensitive' } },
        ],
      },
      take: takeLimitPlusOne,
      orderBy: {
        _relevance: {
          search: keyword,
          fields: ['content', 'title'],
          sort: 'desc',
        },
      },
      skip: skipTimes ? takeLimitPlusOne * skipTimes : undefined,

      // Include fields
      include: {
        user: { select: { username: true } },
        interactions: userId ? { where: { userId } } : false,
      },
    });

    const hasMore = posts.length === takeLimitPlusOne;

    const postAndInteractions = await this.processPostWithInteractions(
      hasMore,
      posts,
      keyword,
    );

    return { hasMore, postAndInteractions };
  }

  async createPost(
    createPostDto: CreatePostDto,
    userId: number,
  ): Promise<PostAndInteraction> {
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
        user: { select: { username: true, id: true } },
        interactions: { where: { userId } },
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

    // refactor json data
    const interactions = createdPost[0].interactions[0];
    delete createdPost[0].interactions;

    return { post: createdPost[0], interactions };
  }

  async fetchPaginatedPost(
    sortBy: 'new' | 'hot' | 'best',
    userId: number,
    take: number,
    cursor?: Date,
  ): Promise<PaginatedPost> {
    const takeLimit = Math.min(25, take);
    const takeLimitPlusOne = takeLimit + 1;

    let dateSpec: Date | undefined = undefined;
    if (cursor) {
      if (sortBy === 'best') {
        dateSpec = this.calculateDate(60, cursor);
      } else if (sortBy === 'hot') {
        dateSpec = this.calculateDate(30, cursor);
      }
    }

    let sortCondition: any;
    if (sortBy === 'new') {
      sortCondition = undefined;
    } else if (sortBy === 'best') {
      sortCondition = {
        votePoints: { gte: 30 },
        laughPoints: { gte: 20 },
        createdAt: { gte: dateSpec },
      };
    } else if (sortBy === 'hot') {
      sortCondition = {
        createdAt: { gte: dateSpec },
        likePoints: { gte: 20 },
      };
    }

    const posts = await this.prismaService.post.findMany({
      take: takeLimitPlusOne,
      skip: cursor ? 1 : undefined,
      cursor: cursor ? { createdAt: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        interactions: userId ? { where: { userId } } : false,
      },
      where: sortCondition,
    });

    if (!posts.length) {
      return this.fetchPaginatedPostsSortByTop(take, 'all-time', userId);
    }

    const hasMore = posts.length === takeLimitPlusOne;

    const postAndInteractions = await this.processPostWithInteractions(
      hasMore,
      posts,
    );

    return { hasMore, postAndInteractions };
  }

  async fetchPaginatedPostsSortByTop(
    take: number,
    time: 'half-year' | 'one-year' | 'all-time',
    userId: number,
    skipTimes?: number,
  ): Promise<PaginatedPost> {
    const takeLimit = Math.min(25, take);
    const takeLimitPlusOne = takeLimit + 1;
    let dateSpec: Date | undefined = undefined;

    if (time === 'half-year') {
      dateSpec = this.calculateDate(180, new Date(Date.now()));
    } else if (time === 'one-year') {
      dateSpec = this.calculateDate(360, new Date(Date.now()));
    }

    // ugly as f*ck
    const posts = await this.prismaService.post.findMany({
      take: takeLimitPlusOne,
      skip: skipTimes ? takeLimitPlusOne * skipTimes : undefined,
      where: time === 'all-time' ? undefined : { createdAt: { gte: dateSpec } },
      orderBy: { votePoints: 'desc' },
      include: {
        user: { select: { username: true } },
        interactions: userId ? { where: { userId } } : false,
      },
    });

    const hasMore = posts.length === takeLimitPlusOne;

    const postAndInteractions = await this.processPostWithInteractions(
      hasMore,
      posts,
    );

    return { hasMore, postAndInteractions };
  }

  async fetchOnePost(
    userId: number,
    postId: number,
  ): Promise<PostAndInteraction> {
    const post = this.prismaService.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    const incrementView = this.prismaService.post.update({
      where: { id: postId },
      data: { viewCount: { increment: 1 } },
    });

    const createdPost = await this.prismaService.$transaction([
      post,
      incrementView,
    ]);

    let interactions: interactions | null = null;

    if (userId) {
      interactions = await this.prismaService.interactions.findUnique({
        where: { userId_postId: { userId, postId } },
      });
    }

    return { post: createdPost[0], interactions };
  }

  async editPost(
    id: number,
    updatePostDto: UpdatePostDto,
    userId: number,
  ): Promise<PostAndInteraction> {
    // check if user owns the post
    const originalPost = await this.prismaService.post.findUnique({
      where: { id },
    });
    if (originalPost.userId !== userId) return null;

    const { title, content } = updatePostDto;

    const updatedPost = await this.prismaService.post.update({
      where: { id },
      data: {
        title,
        content,
      },
      include: { interactions: { where: { userId: userId } } },
    });

    const interactions = updatedPost.interactions[0];
    delete updatedPost.interactions;

    return { post: updatedPost, interactions };
  }

  async deletePost(postId: number, userId: number): Promise<Boolean> {
    const deletePost = this.prismaService.post.delete({
      where: { id: postId },
    });

    const userPostAmountDecrementOne = this.prismaService.user.update({
      where: { id: userId },
      data: { postAmounts: { decrement: 1 } },
    });

    this.prismaService.$transaction([deletePost, userPostAmountDecrementOne]);

    return true;
  }

  private calculateDate(daysLimit: number, dateSpe: Date): Date {
    //number of milliseconds in a day
    const days = 86400000;

    let daysPlus: number = days * daysLimit;

    const itemsBeforeDate = new Date(dateSpe.getTime() - daysPlus);

    return itemsBeforeDate;
  }

  private async processPostWithInteractions(
    hasMore: boolean,
    posts: (post & {
      interactions: interactions[];
      user: {
        username: string;
      };
    })[],
    keyword?: string,
  ): Promise<PostAndInteraction[]> {
    // make sure return full list if hasMore === false
    const fullLength = hasMore ? posts.length - 1 : posts.length;
    const postAndInteractions: PostAndInteraction[] = [];

    for (let i = 0; i < fullLength; i++) {
      // send snippets numbering 49
      if (keyword) {
        posts[i].content = this.getContentArea(keyword, posts[i].content);
      } else {
        posts[i].content = posts[i].content.slice(0, 50);
      }

      postAndInteractions[i] = {
        post: posts[i],
        interactions: posts[i].interactions && posts[i].interactions[0],
      };

      delete posts[i].interactions;
    }

    return postAndInteractions;
  }

  // Match the word in between paragraphs
  private getContentArea(keyword: string, content: string) {
    // https://stackoverflow.com/questions/2295657/return-positions-of-a-regex-match-in-javascript
    const match = RegExp(keyword).exec(content);

    // Cut through from the start
    if (keyword.length <= 10) {
      return content.slice(0, match.index + 50 - keyword.length);
    }

    // Cut through the middle
    return content.slice(match.index - 10, match.index + 40 - keyword.length);
  }
}
