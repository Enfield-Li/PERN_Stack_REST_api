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
  ResUser,
  UserProfileRO,
  UserRO,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { COOKIE_NAME } from 'src/config/constants';

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
  ): Promise<UserProfileRO> {
    const userId = req.session.userId;

    return this.userService.fetchProfile(+id, userId, +take, cursor);
  }

  @ApiCreatedResponse({ type: ResUser })
  @Get('/userInfo/:id')
  async fetchUserInfo(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<ResUser | string> {
    const userId = req.session.userId;

    const user = await this.userService.fetchUserInfo(+id, userId);
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
  findOne(@Req() req: Request): Promise<UserRO> {
    const userId = req.session.userId;

    if (!userId) throw new HttpException('Nope', 401);

    return this.userService.me(userId);
  }

  @Patch('/update-user/:id')
  @ApiCreatedResponse({ type: UserRO })
  update(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserRO> {
    const userId = req.session.userId;

    if (!userId) throw new HttpException('Invalid credential', 401);

    return this.userService.updateUser(userId, updateUserDto);
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
  remove(@Req() req: Request): Promise<boolean> {
    const userId = req.session.userId;

    if (!userId) throw new HttpException('Invalid credential', 401);

    return this.userService.deleteUser(userId);
  }
}
