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
  interactions,
  LoginUserDto,
  PostForChecked,
  userProfileRO as UserProfileRO,
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
  ) {
    return this.userService.fetchProfile(
      +id,
      req.session.userId,
      +take,
      cursor,
    );
  }

  @ApiBody({
    type: [PostForChecked],
  })
  @ApiCreatedResponse({ type: Boolean })
  @Patch('/setNotificationChecked')
  async setChecked(@Body() ids: PostForChecked[], @Req() req: Request) {
    if (!req.session.userId) return;

    return this.userService.setNotificationChecked(ids);
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

  @ApiQuery({
    name: 'getAll',
    required: false,
    type: Boolean,
  })
  @Get('/interactives')
  @ApiCreatedResponse({ type: [interactions] })
  async getInteractives(
    @Req() req: Request,
    @Query('getAll') getAll: string = 'false',
  ) {
    if (!req.session.userId) return;

    const getAllIsTrue = getAll === 'true';

    return this.userService.fetchInteractives(req.session.userId, getAllIsTrue);
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
