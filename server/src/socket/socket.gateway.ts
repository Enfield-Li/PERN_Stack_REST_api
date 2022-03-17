import { Logger, Req } from '@nestjs/common';
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
  private logger: Logger = new Logger('SocketGateway');

  afterInit(server: Server) {
    this.logger.log('Initialzed!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('MsgToServer')
  handleMessage(
    @MessageBody() data: any,
    @Req() socket: Socket,
  ): WsResponse<String> {
    console.log('id: ', socket.id);
    // console.log(data);

    // this.server.emit('receiveMessage', { 'msg from server': data });

    // only send to the client who send message
    return { event: 'MsgToClient', data: 'hello world' };
  }
}
