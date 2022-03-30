import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpException,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  CreatePostDto,
  PaginatedPost,
  PostAndInteraction,
} from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiQuery({
    name: 'take',
    required: false,
  })
  @ApiQuery({
    name: 'keyword',
    required: true,
  })
  @ApiQuery({
    name: 'skipTimes',
    required: false,
    type: Number,
  })
  @Get('search-post')
  async searchPosts(
    @Query('keyword') keyword: string,
    @Query('take') take: string = '10',
    @Req() req: Request,
    @Query('skipTimes') skipTimes?: string,
  ) {
    const userId = req.session.userId;

    return this.postService.searchPosts(keyword, +take, userId, +skipTimes);
  }

  @Post('create-post')
  @ApiCreatedResponse({ type: PostAndInteraction })
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: Request,
  ): Promise<PostAndInteraction> {
    const userId = req.session.userId;

    if (!userId) throw new HttpException('Not authenticated', 401);

    const post = await this.postService.createPost(createPostDto, userId);
    return post;
  }

  @ApiQuery({
    name: 'take',
    required: false,
  })
  @ApiQuery({
    name: 'cursor',
    required: false,
    type: Date,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['new', 'hot', 'best'],
  })
  @ApiCreatedResponse({ type: PaginatedPost })
  @Get('paginated-posts')
  findAll(
    @Req() req: Request,
    @Query('take') take: string = '10',
    @Query('sortBy') sortBy: 'new' | 'hot' | 'best' = 'best',
    @Query('cursor') cursor?: string,
  ): Promise<PaginatedPost> {
    const userId = req.session.userId;

    return this.postService.fetchPaginatedPost(
      sortBy,
      userId,
      +take,
      cursor && new Date(cursor),
    );
  }

  @ApiQuery({
    name: 'time',
    required: false,
    enum: ['half-year', 'one-year', 'all-time'],
  })
  @ApiQuery({
    name: 'skipTimes',
    required: false,
    type: Number,
  })
  @Get('paginated-posts/top')
  @ApiCreatedResponse({ type: PaginatedPost })
  findByTop(
    @Req() req: Request,
    @Query('time') time: 'half-year' | 'one-year' | 'all-time' = 'half-year',
    @Query('skipTimes') skipTimes?: string,
  ): Promise<PaginatedPost> {
    const userId = req.session.userId;

    return this.postService.fetchPaginatedPostsSortByTop(
      10,
      time,
      userId,
      +skipTimes,
    );
  }

  @ApiOkResponse({ type: PostAndInteraction })
  @Get('single-post/:id')
  findOne(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<PostAndInteraction> {
    const userId = req.session.userId;

    return this.postService.fetchOnePost(userId, +id);
  }

  @ApiCreatedResponse({ type: PostAndInteraction })
  @Patch('edit/:id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: Request,
  ): Promise<PostAndInteraction> {
    const userId = req.session.userId;

    if (!userId) throw new HttpException('Not authenticated', 401);

    const updatedPost = await this.postService.editPost(
      +id,
      updatePostDto,
      userId,
    );

    if (!updatedPost) throw new HttpException('Not authorized', 403);

    return updatedPost;
  }

  @ApiOkResponse({ type: Boolean })
  @Delete('delete/:id')
  remove(@Req() req: Request, @Param('id') id: string): Promise<Boolean> {
    const userId = req.session.userId;

    if (!userId) throw new HttpException('Not authenticated', 401);

    return this.postService.deletePost(+id, userId);
  }
}
