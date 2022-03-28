import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { interactions } from 'src/user/dto/create-user.dto';
import { InteractionIds, VoteFields } from './dto/create-interaction.dto';
import { InteractionsService } from './interactions.service';

@ApiTags('interactions')
@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @ApiBody({
    type: [InteractionIds],
  })
  @ApiCreatedResponse({ type: Boolean })
  @Patch('/setNotificationChecked')
  async setChecked(@Body() ids: InteractionIds[], @Req() req: Request) {
    const userId = req.session.userId;
    if (!userId) throw new HttpException('Not authenticated', 401);

    return this.interactionsService.setNotificationChecked(ids);
  }

  @ApiCreatedResponse({ type: Boolean })
  @Patch('/setInteractionRead')
  async setRead(@Body() ids: InteractionIds, @Req() req: Request) {
    const userId = req.session.userId;
    if (!userId) throw new HttpException('Not authenticated', 401);

    return this.interactionsService.setInteractionRead(ids);
  }

  @ApiBody({
    type: [InteractionIds],
  })
  @ApiCreatedResponse({ type: Boolean })
  @Patch('/setAllInteractionRead')
  async setAllRead(@Body() ids: InteractionIds[], @Req() req: Request) {
    const userId = req.session.userId;
    if (!userId) throw new HttpException('Not authenticated', 401);

    return this.interactionsService.setAllInteractionsRead(ids);
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
    const userId = req.session.userId;
    if (!userId) throw new HttpException('Not authenticated', 401);

    const getAllIsTrue = getAll === 'true';

    return this.interactionsService.fetchInteractives(userId, getAllIsTrue);
  }

  @ApiQuery({
    name: 'value',
    type: Boolean,
  })
  @ApiQuery({
    name: 'field',
    enum: ['vote', 'like', 'laugh', 'confused'],
  })
  @Get('interact/post/:id')
  @ApiOkResponse({ type: Boolean })
  votings(
    @Param('id') id: string,
    @Query('value') value: string,
    @Query('field') field: VoteFields,
    @Req() req: Request,
  ): Promise<Boolean> {
    const userId = req.session.userId;
    if (!userId) throw new HttpException('Not authenticated', 401);

    return this.interactionsService.voteAndInteractWithPost(
      +id,
      userId,
      value === 'true' ? true : value === 'false' ? false : null,
      field,
    );
  }

  @ApiQuery({
    name: 'voteValue',
    type: Boolean,
  })
  @Get('interact/comment/:id')
  async voteComment(
    @Req() req: Request,
    @Param('id') id: string,
    @Query('voteValue') voteValue: string,
  ) {
    const userId = req.session.userId;
    if (!userId) throw new HttpException('Not authenticated', 401);

    return this.interactionsService.voteComment(
      +id,
      userId,
      voteValue === 'true' ? true : voteValue === 'false' ? false : null,
    );
  }
}
