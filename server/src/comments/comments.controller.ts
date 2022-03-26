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
  CommentRO,
  FindReplyDto,
  ReplyRO,
} from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiCreatedResponse({ type: CommentRO })
  @Post('/createCommentOrReply/:id')
  createCommentOrReply(
    @Body() createCommentDto: CreateCommentOrReplyDto,
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<CommentRO> {
    return this.commentsService.createCommentOrReply(
      createCommentDto,
      req.session.userId,
      +id,
    );
  }

  @ApiCreatedResponse({ type: [CommentRO] })
  @Get('/fetchComments/:id')
  findComments(@Param('id') id: string): Promise<CommentRO[]> {
    return this.commentsService.findAllComments(+id);
  }

  @ApiCreatedResponse({ type: [ReplyRO] })
  @Put('/fetchReplies/:id')
  findAllReplies(
    @Param('id') id: string,
    @Body() findReplyDto: FindReplyDto,
  ): Promise<ReplyRO[]> {
    return this.commentsService.findAllReplies(+id, findReplyDto);
  }

  @Patch('/updateComment/:id')
  @ApiCreatedResponse({ type: CommentRO })
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentRO> {
    return this.commentsService.editComment(+id, updateCommentDto);
  }

  @Delete('/deleteComment/:id')
  @ApiCreatedResponse({ type: Boolean })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.commentsService.remove(+id);
  }
}
