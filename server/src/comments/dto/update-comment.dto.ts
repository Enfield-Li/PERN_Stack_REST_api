import { PartialType } from '@nestjs/swagger';
import { CreateCommentOrReplyDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentOrReplyDto) {}
