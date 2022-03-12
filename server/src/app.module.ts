import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './config/prisma.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UserModule, PostModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
