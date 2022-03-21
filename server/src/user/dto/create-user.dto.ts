import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import {
  PaginatedPost,
  PostAndInteraction,
} from 'src/post/dto/create-post.dto';

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

  @ApiProperty()
  postAmounts: number;
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
  @ApiProperty()
  user: ResUser;

  @ApiProperty()
  userPaginatedPost: PaginatedPost;
}

export class interactions {
  @ApiProperty()
  voteStatus: boolean | null;
  @ApiProperty()
  likeStatus: boolean | null;
  @ApiProperty()
  laughStatus: boolean | null;
  @ApiProperty()
  confusedStatus: boolean | null;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  postId: number;
  @ApiProperty()
  read: boolean;
  @ApiProperty()
  checked: boolean;
}

export class PostForChecked {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  postId: number;
}
