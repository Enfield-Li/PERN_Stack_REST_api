import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentOrReplyDto {
  @ApiProperty()
  comment_text: string;
  @ApiProperty({ nullable: true })
  parentCommentId?: number;
  @ApiProperty({ nullable: true })
  replyToUserId?: number;
}

export class CommentOrReplyRO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  comment_text: string;
  @ApiProperty({ nullable: true })
  replyToUserId: number | null;
  @ApiProperty({ nullable: true })
  parentCommentId: number | null;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  postId: number;
  @ApiProperty()
  user: { username: string };
}

export class FindReplyDto {
  @ApiProperty()
  parentCommentId: number;
}
