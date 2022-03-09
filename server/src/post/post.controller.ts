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
  Put,
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
import { post } from '@prisma/client';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create-post')
  @ApiCreatedResponse({ type: PostAndInteraction })
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    if (!req.session.userId) throw new HttpException('Not authenticated', 401);

    const post = await this.postService.createPost(
      createPostDto,
      req.session.userId,
    );
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
  @ApiCreatedResponse({ type: PaginatedPost })
  @Get('paginated-posts')
  findAll(
    @Req() req: Request,
    @Query('take') take: string = '10',
    @Query('cursor') cursor?: Date,
  ): Promise<PaginatedPost> {
    return this.postService.getPaginatedPost(req.session.userId, +take, cursor);
  }

  @ApiOkResponse({ type: PostAndInteraction })
  @Get('single-post/:id')
  findOne(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<PostAndInteraction> {
    return this.postService.fetchOnePost(req.session.userId, +id);
  }

  @ApiQuery({
    name: 'value',
    type: Boolean,
  })
  @ApiQuery({
    name: 'field',
    enum: ['vote', 'like', 'laugh', 'confused'],
  })
  @Get('interact/:id')
  @ApiOkResponse({ type: Boolean })
  votings(
    @Param('id') id: string,
    @Query('value') value: string,
    @Query('field') field: 'vote' | 'like' | 'laugh' | 'confused',
    @Req() req: Request,
  ): Promise<Boolean> {
    return this.postService.votePost(
      +id,
      req.session.userId,
      value === 'true' ? true : value === 'false' ? false : null,
      field,
    );
  }

  @ApiCreatedResponse({ type: PostAndInteraction })
  @Patch('edit/:id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: Request,
  ): Promise<PostAndInteraction> {
    if (!req.session.userId) throw new HttpException('Not authenticated', 401);

    const updatedPost = await this.postService.editPost(
      +id,
      updatePostDto,
      req.session.userId,
    );

    if (!updatedPost) throw new HttpException('Not authorized', 403);

    return updatedPost;
  }

  @ApiOkResponse({ type: Boolean })
  @Delete('delete/:id')
  remove(@Req() req: Request, @Param('id') id: string): Promise<Boolean> {
    if (!req.session.userId) throw new HttpException('Not authenticated', 401);

    return this.postService.deletePost(+id);
  }
}
