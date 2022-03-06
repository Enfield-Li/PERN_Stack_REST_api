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

export class PostAndInteractions {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string | null;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  viewCount: number;
  @ApiProperty()
  votePoints: number;
  @ApiProperty()
  likePoints: number;
  @ApiProperty()
  confusedPoints: number;
  @ApiProperty()
  laughPoints: number;
  @ApiProperty()
  user: {
    username: string;
    interactions?: interactions;
  };
}
export class PaginatedPost {
  @ApiProperty()
  postAndInteractions: PostAndInteractions[];
  @ApiProperty()
  hasMore: Boolean;
}
