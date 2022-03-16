import { Req } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Request } from 'express';
import { Server } from 'http';

const options = {
  cors: {
    origin: ['http://localhost:3118', 'http://localhost:3119'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
};

@WebSocketGateway(options)
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string, @Req() req): void {
    console.log('req: ', req.id);
    this.server.emit('message', message);
  }
}
