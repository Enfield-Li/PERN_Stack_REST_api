import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpException,
  Res,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  LoginUserDto,
  userProfileRO as UserProfileRO,
  UserRO,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { COOKIE_NAME } from 'src/config/constants';
import { Socket } from 'socket.io';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiCreatedResponse({ type: UserRO })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: Request,
  ): Promise<UserRO> {
    return this.userService.createUser(createUserDto, req);
  }

  @ApiQuery({
    name: 'take',
    required: false,
  })
  @ApiQuery({
    name: 'cursor',
    required: false,
    type: Date,
  })
  @Get('/profile/:id')
  @ApiCreatedResponse({ type: UserProfileRO })
  async getProfile(
    @Param('id') id: string,
    @Req() req: Request,
    @Query('take') take: string = '5',
    @Query('cursor') cursor?: Date,
  ) {
    return this.userService.fetchProfile(
      +id,
      req.session.userId,
      +take,
      cursor,
    );
  }

  @Get('/userInfo/:id')
  async fetchUserInfo(@Param('id') id: string, @Req() req: Request) {
    const user = await this.userService.fetchUserInfo(+id, req.session.userId);
    if (!user) {
      return 'User Not Found';
    }

    return user;
  }

  @Put('/login')
  @ApiCreatedResponse({ type: UserRO })
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Req() req: Request,
  ): Promise<UserRO> {
    return this.userService.loginUser(loginUserDto, req);
  }

  @Get('/me')
  @ApiCreatedResponse({ type: UserRO })
  findOne(@Req() req: Request) {
    if (!req.session.userId) return;

    return this.userService.me(req.session.userId);
  }

  @Patch('/update-user/:id')
  @ApiCreatedResponse({ type: UserRO })
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    if (!req.session.userId) throw new HttpException('Invalid credential', 401);

    return this.userService.updateUser(req.session.userId, updateUserDto);
  }

  @Get('/logout')
  @ApiOkResponse({ type: Boolean })
  logout(@Req() req: Request, @Res() res: Response) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.error(err);
          resolve(false);
          return;
        }
        resolve(true);
      }),
    );
  }

  @Delete('/delete-user/:id')
  @ApiResponse({ type: Boolean })
  remove(@Req() req: Request) {
    if (!req.session.userId) throw new HttpException('Invalid credential', 401);

    return this.userService.deleteUser(req.session.userId);
  }
}
