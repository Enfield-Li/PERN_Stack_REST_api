import { Module } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { InteractionsController } from './interactions.controller';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  controllers: [InteractionsController],
  providers: [InteractionsService, PrismaService]
})
export class InteractionsModule {}
