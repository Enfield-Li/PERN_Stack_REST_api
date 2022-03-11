import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import {
  CreateUserDto,
  LoginUserDto,
  ResUserError,
  ResUser,
  UserRO,
  userProfileRO,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { PostAndInteraction } from 'src/post/dto/create-post.dto';
// import argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(
    userCreateInput: CreateUserDto,
    req: Request,
  ): Promise<UserRO> {
    let { email, username, password } = userCreateInput;
    // password = await argon2.hash(password);

    try {
      const user = await this.prismaService.user.create({
        data: { email, username, password },
      });

      req.session.userId = user.id;
      return { user: this.buildUserRO(user) };
    } catch {
      return { errors: this.buildErrorRo('usernameOrEmail') };
    }
  }

  async loginUser(loginUserDto: LoginUserDto, req: Request): Promise<UserRO> {
    const { usernameOrEmail, password } = loginUserDto;
    const user = await this.findUser(usernameOrEmail);
    console.log('user: ', user);
    if (!user) return { errors: this.buildErrorRo('usernameOrEmail') };

    const passwordIsValid = user.password === password;
    if (!passwordIsValid) return { errors: this.buildErrorRo('password') };

    req.session.userId = user.id;
    return { user: this.buildUserRO(user) };
  }

  private async findUser(usernameOrEmail: string): Promise<user> {
    const user = usernameOrEmail.includes('@')
      ? await this.prismaService.user.findUnique({
          where: { email: usernameOrEmail },
        })
      : await this.prismaService.user.findUnique({
          where: { username: usernameOrEmail },
        });

    return user;
  }

  // async findUserAndPostAmount(): Promise<ResUser> {

  // }

  async me(id: number): Promise<UserRO> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    return { user: this.buildUserRO(user) };
  }

  async fetchProfile(
    userId: number,
    meId: number,
    take: number,
    cursor?: Date,
  ): Promise<userProfileRO> {
    const takeLimit = Math.min(25, take);
    const takeLimitPlusOne = takeLimit + 1;

    const userProfile = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        post: {
          include: { interactions: { where: { userId: meId } } },
          take: takeLimitPlusOne,
          orderBy: { createdAt: 'desc' },
          skip: cursor ? 1 : undefined,
          cursor: cursor ? { createdAt: cursor } : undefined,
        },
      },
    });

    const hasMore = userProfile.post.length === takeLimitPlusOne;

    const postAndInteractions: PostAndInteraction[] = [];

    for (let i = 0; i < userProfile.post.length - 1; i++) {
      userProfile.post[i].content.slice(0, 50);

      postAndInteractions[i] = {
        post: userProfile.post[i],
        interactions: userProfile.post[i].interactions[0],
      };
      delete userProfile.post[i].interactions;
    }
    delete userProfile.post;

    return {
      user: this.buildUserRO(userProfile, meId),
      userPaginatedPost: { hasMore, postAndInteractions },
    };
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserRO> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    const { username, email, password } = updateUserDto;

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;

    const returnedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        username,
        email,
        password,
      },
    });

    return { user: this.buildUserRO(returnedUser) };
  }

  async deleteUser(id: number) {
    await this.prismaService.user.delete({ where: { id } });

    return true;
  }

  private buildUserRO(user: user, meId?: number) {
    let { username, createdAt, email, id, postAmounts } = user;

    if (meId) email = meId === user.id ? email : null;

    return { createdAt, username, email, id, postAmounts };
  }

  private buildErrorRo(field: string): ResUserError {
    return { field: field, message: `Invalid ${field}` };
  }
}
