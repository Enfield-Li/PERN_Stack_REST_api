export interface ServerToClientEvents {
  MsgToClient: (data: HelloWorld) => void;
  ReceiveNotification: (data: ReceiveNotification) => void;
  receiveChat: (data: ReciveChat) => void;
}

export interface ClientToServerEvents {
  MsgToServer: (data: HelloWorld) => void;
  Login: (userId: number | undefined) => void;
  SendNotification: (data: SendNotification) => void;
  sendChat: (data: SendChat) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

export type HelloWorld = {
  msg: string;
};

export type NotificationType =
  | 'vote'
  | 'like'
  | 'laugh'
  | 'confused'
  | 'comment';

export type SendNotification = {
  postId: number;
  reciverId: number;
  value: boolean;
  senderId: number;
  senderName: string;
  type: NotificationType;
};

export type ReceiveNotification = {
  postId: number;
  title: string;
  senderId: number;
  senderName: string;
  type: NotificationType;
};

export type SendChat = {
  senderId: number;
  reciverId: number;
  senderName: string;
  chat: string;
};

export type ReciveChat = {
  senderId: number;
  senderName: string;
  chat: string;
};
