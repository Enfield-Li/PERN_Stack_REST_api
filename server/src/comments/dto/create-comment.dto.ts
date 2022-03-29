import { ApiProperty } from '@nestjs/swagger';
import {
  commentInteractions,
  commentReplyToUser,
  comments,
} from '@prisma/client';

export class CreateCommentOrReplyDto {
  @ApiProperty()
  comment_text: string;
  @ApiProperty({ nullable: true })
  parentCommentId?: number;
  @ApiProperty({ nullable: true })
  replyToUserId?: number;
}

export class FindReplyDto {
  @ApiProperty()
  parentCommentId: number;
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
  parentCommentId: number | null;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  postId: number;
  @ApiProperty()
  upvoteAmount: number;
  @ApiProperty()
  downvoteAmount: number;
  @ApiProperty()
  user: { username: string };
  @ApiProperty()
  commentInteractions?: commentInteractions;
}

export class ReplyRO extends CommentRO {
  @ApiProperty()
  parentComment: {
    username: string;
    userId: number;
  };
}

export type CommentDataArr = CommentData[];

export type ReplyDataArr = ReplyData[];

export type CommentData = comments & {
  user: {
    username: string;
  };
  commentInteractions?: commentInteractions[];
};

export type ReplyData = comments & {
  user: {
    username: string;
  };
  parentComment: (commentReplyToUser & {
    user: {
      username: string;
      id: number;
    };
  })[];
  commentInteractions?: commentInteractions[];
};
