import { Req } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

const options = {
  cors: {
    origin: 'http://localhost:3118',
    // methods: ['GET', 'POST'],
    // credentials: true,
  },
};

@WebSocketGateway(options)
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: any, @Req() client: any): void {
    console.log('id: ', client.id);
    // console.log(data);

    this.server.emit('receiveMessage', { 'msg from server': data });
  }
}
