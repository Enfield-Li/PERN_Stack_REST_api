import { ApiProperty } from '@nestjs/swagger';
import { commentInteractions, comments } from '@prisma/client';

export class CreateCommentOrReplyDto {
  @ApiProperty()
  comment_text: string;
  @ApiProperty()
  isReply: boolean;
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
  isReply: boolean;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  postId: number;
  @ApiProperty()
  user: { username: string };
  @ApiProperty()
  commentInteractions?: commentInteractions;
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
  @ApiProperty()
  isReply: boolean;
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
}

export type rawReply = (comments & { username: string } & {
  replyToUsername: string;
})[];

export type rawComment = (comments & {
  user: {
    username: string;
  };
  commentInteractions: commentInteractions[];
})[];
