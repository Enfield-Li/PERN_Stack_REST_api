import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/config/prisma.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, SocketGateway],
})
export class PostModule {}
