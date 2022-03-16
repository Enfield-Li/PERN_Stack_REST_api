import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';

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
  server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log(message);
    this.server.emit('message', message);
  }
}
