import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  BadRequestException,
  HttpException,
  Query,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  CreatePostDto,
  CursorAndTake,
  PaginatedPost,
  PostAndInteractions,
} from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create-post')
  @ApiCreatedResponse({ type: PostAndInteractions })
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
  ) {
    return this.postService.getPaginatedPost(req.session.userId, +take, cursor);
  }

  @ApiCreatedResponse({ type: PostAndInteractions })
  @Get('single-post/:id')
  findOne(@Req() req: Request, @Param('id') id: string) {
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
  @Put('vote/:id')
  votings(
    @Param('id') id: string,
    @Query('value') value: string,
    @Query('field') field: 'vote' | 'like' | 'laugh' | 'confused',
    @Req() req: Request,
  ) {
    this.postService.votePost(
      +id,
      req.session.userId,
      value === 'true' ? true : value === 'false' ? false : null,
      field,
    );
  }

  @ApiCreatedResponse({ type: PostAndInteractions })
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @ApiCreatedResponse({ type: Boolean })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
