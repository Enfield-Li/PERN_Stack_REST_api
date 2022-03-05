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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, UserRO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

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

  @Post('/login')
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
    if (!req.session.userId) throw new HttpException('Invalid credential', 401);

    return this.userService.me(req.session.userId);
  }

  @Patch('/update/:id')
  @ApiCreatedResponse({ type: UserRO })
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    if (!req.session.userId) throw new HttpException('Invalid credential', 401);

    return this.userService.updateUser(req.session.userId, updateUserDto);
  }

  @Delete('/delete/:id')
  @ApiResponse({ type: Boolean })
  remove(@Req() req: Request) {
    if (!req.session.userId) throw new HttpException('Invalid credential', 401);

    return this.userService.deleteUser(req.session.userId);
  }
}
