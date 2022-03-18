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
import { SocketGateway } from 'src/socket/socket.gateway';
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
      return { user: this.buildResUser(user) };
    } catch {
      return { errors: this.buildErrorRo('usernameOrEmail') };
    }
  }

  async loginUser(loginUserDto: LoginUserDto, req: Request): Promise<UserRO> {
    const { usernameOrEmail, password } = loginUserDto;
    const user = await this.findUser(usernameOrEmail);
    // console.log('user: ', user);

    if (!user) return { errors: this.buildErrorRo('usernameOrEmail') };

    const passwordIsValid = user.password === password;
    if (!passwordIsValid) return { errors: this.buildErrorRo('password') };

    req.session.userId = user.id;
    return { user: this.buildResUser(user) };
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

  async me(id: number): Promise<UserRO> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    return { user: this.buildResUser(user) };
  }

  async fetchUserInfo(id: number, meId: number): Promise<ResUser> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return this.buildResUser(user, meId);
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

    // return all posts if user does not have post left
    const fullLength = hasMore
      ? userProfile.post.length - 1
      : userProfile.post.length;

    for (let i = 0; i < fullLength; i++) {
      userProfile.post[i].content = userProfile.post[i].content.slice(0, 50);

      postAndInteractions[i] = {
        post: userProfile.post[i],
        interactions: userProfile.post[i].interactions[0],
      };
      delete userProfile.post[i].interactions;
    }
    delete userProfile.post;

    return {
      user: this.buildResUser(userProfile, meId),
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

    return { user: this.buildResUser(returnedUser) };
  }

  async deleteUser(id: number) {
    await this.prismaService.user.delete({ where: { id } });

    return true;
  }

  private buildResUser(user: user, meId?: number) {
    let { username, createdAt, email, id, postAmounts } = user;

    // Show email when user check it's own info
    if (meId) email = meId === user.id ? email : null;

    return { createdAt, username, email, id, postAmounts };
  }

  private buildErrorRo(field: string): ResUserError {
    return { field: field, message: `Invalid ${field}` };
  }
}
