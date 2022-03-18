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
    this.removeUser(socket.id);
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('MsgToServer')
  handleMessage(
    @MessageBody() data: { msg: string },
    @Req() socket: Socket,
  ): WsResponse<{ msg: string }> {
    // console.log('id: ', socket.id);
    // console.log(data);

    // this.server.emit('receiveMessage', { msg: data });

    // only send to the client who send message
    return { event: 'MsgToClient', data: { msg: 'hello world from server' } };
  }

  @SubscribeMessage('login')
  login(@MessageBody() userId: number, @Req() socket: Socket) {
    if (userId) {
      this.addNewUser(userId, socket.id);
    }
  }

  private addNewUser(userId: number, socketId: string) {
    const userExist = this.onlineUsers.some((user) => user.userId === userId);

    if (!userExist) this.onlineUsers.push({ userId, socketId });
  }

  private getUser(userId: number) {
    return this.onlineUsers.find((user) => user.userId === userId);
  }

  private removeUser(socketId: string) {
    this.onlineUsers = this.onlineUsers.filter(
      (user) => user.socketId !== socketId,
    );
  }
}
