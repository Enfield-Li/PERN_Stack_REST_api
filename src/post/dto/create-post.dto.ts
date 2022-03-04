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
  title: string;
  contents: string;
  createdAt: Date;
}
