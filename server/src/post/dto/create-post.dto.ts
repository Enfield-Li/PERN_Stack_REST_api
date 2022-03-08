import { ApiProperty } from '@nestjs/swagger';
import { interactions, post, user } from '@prisma/client';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDto {
  @MinLength(10)
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  content?: string;
}

export class CursorAndTake {
  @ApiProperty({ nullable: true, default: 10 })
  take?: number = 10;
  @ApiProperty({ nullable: true })
  cursor?: number;
}

export class PostAndInteraction {
  @ApiProperty()
  post: post;
  @ApiProperty({ nullable: true })
  interactions: interactions | null;
}
export class PaginatedPost {
  @ApiProperty({ type: [PostAndInteraction] })
  postAndInteractions: PostAndInteraction[];
  @ApiProperty()
  hasMore: Boolean;
}
