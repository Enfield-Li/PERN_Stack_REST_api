import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import {
  CreateUserDto,
  LoginUserDto,
  ResUserError,
  ResUser,
  UserRO,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import argon2 from 'argon2';
import { Request } from 'express';

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
      console.log('createdUser: ', user);

      req.session.userId = user.id;
      return { user: this.buildUserRO(user) };
    } catch {
      return { errors: this.buildErrorRo('usernameOrEmail') };
    }
  }

  async loginUser(loginUserDto: LoginUserDto, req: Request): Promise<UserRO> {
    const { usernameOrEmail, password } = loginUserDto;
    const user = await this.findUser(usernameOrEmail);
    if (!user) return { errors: this.buildErrorRo('UsernameOrEmail') };

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

  private buildUserRO(user: user) {
    const { username, createdAt, email } = user;

    return { createdAt, username, email };
  }

  private buildErrorRo(field: string): ResUserError {
    return { field: field, message: `Invalid ${field}` };
  }
}
