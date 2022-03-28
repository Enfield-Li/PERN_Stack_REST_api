import { Logger, Req } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/config/prisma.service';
import {
  ClientToServerEvents,
  HelloWorld,
  SendChat,
  SendNotification,
  ServerToClientEvents,
} from './socketType.t';

const options = {
  cors: {
    origin: 'http://localhost:3118',
    // credentials: true,
    // methods: ['GET', 'POST'],
  },
};

@WebSocketGateway(options)
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly prismaService: PrismaService) {}

  @WebSocketServer()
  socketServer: Server<ClientToServerEvents, ServerToClientEvents>;

  onlineUsers: { userId: number; socketId: string }[] = [];

  private logger: Logger = new Logger('SocketGateway');

  afterInit(server: Server) {
    this.logger.log('Initialzed!');
  }

  handleConnection(socket: Socket, ...args: any[]) {
    this.logger.log(`Socket Connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket Disconnected: ${socket.id}`);
    this.removeUser(socket.id);
  }

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

  @SubscribeMessage('sendChat')
  chatting(@MessageBody() data: SendChat) {
    const { chat, reciverId, senderId, senderName } = data;

    const reciver = this.getUser(reciverId);

    if (reciver)
      this.socketServer
        .to(reciver.socketId)
        .emit('receiveChat', { chat, senderId, senderName });
  }

  @SubscribeMessage('SendNotification')
  async sendNotification(
    @MessageBody() data: SendNotification,
  ): Promise<WsResponse<Boolean>> {
    const { postId, senderId, senderName, reciverId, value, type } = data;

    // Won't send notification back to oneself
    if (reciverId === senderId) return;

    const interactions = await this.prismaService.interactions.findUnique({
      where: {
        userId_postId: {
          postId,
          userId: senderId,
        },
      },
    });

    if (!interactions) {
    } else if (interactions) {
      let activityStatus: boolean | null = null;

      if (type === 'vote') activityStatus = interactions.voteStatus;
      if (type === 'laugh') activityStatus = interactions.laughStatus;
      if (type === 'like') activityStatus = interactions.likeStatus;

      // Negative value or cancel action from sender does not inform reciver
      if (!value || activityStatus === true || type === 'confused')
        // return { event: 'SendNotification', data: false };
        return;
    }

    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      select: { title: true },
    });

    const reciver = this.getUser(reciverId);

    if (reciver) {
      const res = this.socketServer
        .to(reciver.socketId)
        .emit('ReceiveNotification', {
          postId: postId,
          title: post.title,
          senderId: senderId,
          senderName: senderName,
          type,
        });

      // if (!res) return { event: 'SendNotification', data: false };
    }

    // return { event: 'SendNotification', data: true };
    return;
  }

  private addNewUser(userId: number, socketId: string) {
    const userExist = this.onlineUsers.some((user) => user.userId === userId);

    if (!userExist) this.onlineUsers.push({ userId, socketId });
  }

  private getUser(userId: number) {
    const findone = this.onlineUsers.find((user) => user.userId === userId);
    return findone;
  }

  private removeUser(socketId: string) {
    this.onlineUsers = this.onlineUsers.filter(
      (user) => user.socketId !== socketId,
    );
  }
}
