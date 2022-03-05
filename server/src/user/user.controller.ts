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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, UserRO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
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

  @Put('/login')
  @ApiCreatedResponse({ type: UserRO })
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Req() req: Request,
  ): Promise<UserRO> {
    console.log(loginUserDto);
    return this.userService.loginUser(loginUserDto, req);
  }

  @Get('/me')
  @ApiCreatedResponse({ type: UserRO })
  findOne(@Req() req: Request) {
    if (!req.session.userId) throw new HttpException('Invalid credential', 401);

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
