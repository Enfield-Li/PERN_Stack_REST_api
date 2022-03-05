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
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, CursorAndTake } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create-post')
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    if (!req.session.userId) throw new HttpException('Not authenticated', 401);

    return this.postService.create(createPostDto, req.session.userId);
  }

  @ApiQuery({
    name: 'take',
    required: false,
  })
  @ApiQuery({
    name: 'cursor',
    required: false,
  })
  @Get('get-all-posts')
  findAll(@Query('take') take?: number, @Query('cursor') cursor?: number) {
    return this.postService.findPaginatedPost(+take, +cursor);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch('update-post/:id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete('delete-post/:id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
