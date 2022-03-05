import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDto {
  @MinLength(10)
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  content?: string;
}

export class PostRO {
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  createdAt: Date;
}

export class CursorAndTake {
  @ApiProperty({ nullable: true, default: 10 })
  take?: number = 10;
  @ApiProperty({ nullable: true })
  cursor?: number;
}
