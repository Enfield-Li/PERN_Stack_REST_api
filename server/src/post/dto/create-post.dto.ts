import { ApiProperty } from '@nestjs/swagger';
import { post, user } from '@prisma/client';
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

export class PostRO {
  // @ApiProperty()
  // user: { username: user['username'] };
  @ApiProperty()
  post: post;
}

export class PaginatedPost {
  posts: post[];
  hasMore: Boolean;
}
