import { Injectable, Logger, Req, Session } from '@nestjs/common';

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  WsResponse,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/config/prisma.service';
import {
  ClientToServerEvents,
  HelloWorld,
  SendNotification,
  ServerToClientEvents,
} from './socketType';

const options = {
  cors: {
    origin: 'http://localhost:3118',
    credentials: true,
    // methods: ['GET', 'POST'],
  },
};

@WebSocketGateway(options)
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly prismaService: PrismaService) {}

  onlineUsers: { userId: number; socketId: string }[] = [];

  private logger: Logger = new Logger('SocketGateway');

  afterInit(server: Server) {
    this.logger.log('Initialzed!');
  }

  handleConnection(socket: Socket, ...args: any[]) {
    this.logger.log(`socket disconnected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`socket disconnected: ${socket.id}`);
    // this.removeUser(socket.id);
  }

  @WebSocketServer()
  socketServer: Server<ClientToServerEvents, ServerToClientEvents>;

  @SubscribeMessage('MsgToServer')
  handleMessage(
    @MessageBody() data: HelloWorld,
    @Req() socket: Socket,
  ): WsResponse<HelloWorld> {
    // only send to the client who send message
    return { event: 'MsgToClient', data: { msg: 'hello world from server' } };
  }

  @SubscribeMessage('Login')
  login(@MessageBody() userId: number, @Req() socket: Socket) {
    if (userId) {
      this.addNewUser(userId, socket.id);
    }
    // console.log('onlineUser: ', this.onlineUsers);
  }

  @SubscribeMessage('SendNotification')
  async sendNotification(
    @MessageBody() data: SendNotification,
  ): Promise<WsResponse<Boolean>> {
    const { postId, senderId, senderName, reciverId, value } = data;

    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      select: { title: true },
    });

    const reciver = this.getUser(reciverId);
    // console.log('onlineUser: ', this.onlineUsers);

    if (reciver) {
      const res = this.socketServer
        // .to(reciver.socketId)
        .emit('ReceiveNotification', {
          postId: postId,
          title: post.title,
          senderId: senderId,
          senderName: senderName,
        });

      if (!res) return { event: 'SendNotification', data: false };
    }

    return { event: 'SendNotification', data: true };
  }

  private addNewUser(userId: number, socketId: string) {
    const userExist = this.onlineUsers.some((user) => user.userId === userId);

    if (!userExist) this.onlineUsers.push({ userId, socketId });
  }

  getUser(userId: number) {
    if (this.onlineUsers) {
      return this.onlineUsers.find((user) => user.userId === userId);
    }
  }

  private removeUser(socketId: string) {
    this.onlineUsers = this.onlineUsers.filter(
      (user) => user.socketId !== socketId,
    );
  }
}
