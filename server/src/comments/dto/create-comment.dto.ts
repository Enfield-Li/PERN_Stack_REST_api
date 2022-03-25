import { ApiProperty } from '@nestjs/swagger';
import { comments } from '@prisma/client';

export class CreateCommentOrReplyDto {
  @ApiProperty()
  comment_text: string;
  @ApiProperty({ nullable: true })
  parentCommentId?: number;
  @ApiProperty({ nullable: true })
  replyToUserId?: number;
}

export class CommentRO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  comment_text: string;
  @ApiProperty()
  replyAmount: number;
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

export class ReplyRO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  comment_text: string;
  @ApiProperty()
  replyAmount: number;
  @ApiProperty({ nullable: true })
  replyToUserId: number | null;
  @ApiProperty({ nullable: true })
  parentCommentId: number | null;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  postId: number;
  @ApiProperty()
  replyToUser: { username: string };
  @ApiProperty()
  user: { username: string };
}

export class FindReplyDto {
  @ApiProperty()
  parentCommentId: number;
  @ApiProperty()
  replyToUserId: number;
}

export type FetchRelyWithReplyToUserId = (comments & { username: string } & {
  replyToUsername: string;
})[];
