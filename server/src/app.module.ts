import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './config/prisma.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentsModule } from './comments/comments.module';
import { SocketGateway } from './socket/socket.gateway';
import { InteractionsModule } from './interactions/interactions.module';

@Module({
  imports: [UserModule, PostModule, CommentsModule, InteractionsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, SocketGateway],
})
export class AppModule {}
