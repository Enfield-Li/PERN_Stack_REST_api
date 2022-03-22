import { ApiProperty } from '@nestjs/swagger';

export class CreateInteractionDto {}

export class InteractionIds {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  postId: number;
}

export type VoteFields = 'vote' | 'like' | 'laugh' | 'confused';