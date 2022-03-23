import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CommentsService } from './comments.service';
import {
  CreateCommentOrReplyDto,
  CommentOrReplyRO,
  FindReplyDto,
} from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiCreatedResponse({ type: CommentOrReplyRO })
  @Post('/createCommentOrReply/:id')
  createCommentOrReply(
    @Body() createCommentDto: CreateCommentOrReplyDto,
    @Req() req: Request,
    @Param('id') id: string,
  ) {
    return this.commentsService.createCommentOrReply(
      createCommentDto,
      req.session.userId,
      +id,
    );
  }

  @ApiCreatedResponse({ type: CommentOrReplyRO })
  @Get('/commentsForPost/:id')
  findComments(@Param('id') id: string) {
    return this.commentsService.findAllComments(+id);
  }

  @ApiCreatedResponse({ type: CommentOrReplyRO })
  @Put('/repliesForPost/:id')
  findAllReplies(@Param('id') id: string, @Body() findReplyDto: FindReplyDto) {
    return this.commentsService.findAllReplies(+id, findReplyDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
