import { ApiProperty } from '@nestjs/swagger';
import { user } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { PostAndInteraction } from 'src/post/dto/create-post.dto';

export class CreateUserDto {
  @MinLength(5)
  @ApiProperty()
  username: string;

  @MinLength(5)
  @ApiProperty()
  password: string;

  @IsEmail()
  @ApiProperty()
  email: string;
}

export class LoginUserDto {
  @MinLength(5)
  @ApiProperty()
  usernameOrEmail: string;

  @MinLength(5)
  @ApiProperty()
  password: string;
}

export class ResUser {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;
}

export class ResUserError {
  @ApiProperty()
  field: string;

  @ApiProperty()
  message: string;
}

export class UserRO {
  @ApiProperty({ nullable: true })
  user?: ResUser;

  @ApiProperty({ nullable: true })
  errors?: ResUserError;
}

export class userProfileRO {
  user: user;
  userPosts: PostAndInteraction[];
}
