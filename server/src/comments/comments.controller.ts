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
  HttpException,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CommentsService } from './comments.service';
import {
  CreateCommentOrReplyDto,
  CommentRO,
  FindReplyDto,
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
  ) {
    const userId = req.session.userId;
    if (!userId) throw new HttpException('Not authenticated', 401);

    return this.commentsService.createCommentOrReply(
      createCommentDto,
      userId,
      +id,
    );
  }

  @ApiCreatedResponse({ type: [CommentRO] })
  @Get('/fetchComments/:id')
  findComments(@Param('id') id: string, @Req() req: Request) {
    const userId = req.session.userId;

    return this.commentsService.findAllComments(+id, userId);
  }

  @ApiCreatedResponse({ type: [CommentRO] })
  @Put('/fetchReplies/:id')
  findAllReplies(
    @Param('id') id: string,
    @Body() findReplyDto: FindReplyDto,
    @Req() req: Request,
  ) {
    const userId = req.session.userId;

    return this.commentsService.findAllReplies(+id, findReplyDto, userId);
  }

  @Patch('/updateComment/:id')
  @ApiCreatedResponse({ type: CommentRO })
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: Request,
  ): Promise<CommentRO> {
    const userId = req.session.userId;

    if (!userId) throw new HttpException('Not authenticated', 401);

    const res = await this.commentsService.editComment(
      +id,
      updateCommentDto,
      userId,
    );

    if (!res) throw new HttpException('Not authorized', 403);

    return res;
  }

  @Delete('/deleteComment/:id')
  @ApiCreatedResponse({ type: Boolean })
  async remove(@Param('id') id: string, @Req() req: Request): Promise<boolean> {
    const userId = req.session.userId;

    if (!userId) throw new HttpException('Not authenticated', 401);

    const res = await this.commentsService.deleteComment(+id, userId);

    if (!res) throw new HttpException('Not authorized', 403);

    return res;
  }
}
