import {
  Body,
  Controller,
  Get,
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
    if (!req.session.userId) return;

    return this.interactionsService.setNotificationChecked(ids);
  }

  @Patch('/setInteractionRead')
  async setRead(@Body() ids: InteractionIds, @Req() req: Request) {
    if (!req.session.userId) return;

    return this.interactionsService.setInteractionRead(ids);
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

    return this.interactionsService.fetchInteractives(
      req.session.userId,
      getAllIsTrue,
    );
  }

  @ApiQuery({
    name: 'value',
    type: Boolean,
  })
  @ApiQuery({
    name: 'field',
    enum: ['vote', 'like', 'laugh', 'confused'],
  })
  @Get('interact/:id')
  @ApiOkResponse({ type: Boolean })
  votings(
    @Param('id') id: string,
    @Query('value') value: string,
    @Query('field') field: VoteFields,
    @Req() req: Request,
  ): Promise<Boolean> {
    return this.interactionsService.voteAndInteractWithPost(
      +id,
      req.session.userId,
      value === 'true' ? true : value === 'false' ? false : null,
      field,
    );
  }
}
