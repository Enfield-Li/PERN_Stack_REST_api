import { Socket } from "socket.io-client";

// on
export interface ServerToClientEvents {
  MsgToClient: (data: HelloWorld) => void;
  ReceiveNotification: (data: ReceiveNotification) => void;
  receiveChat: (data: ReciveChat) => void;
}

// emit
export interface ClientToServerEvents {
  MsgToServer: (data: HelloWorld) => void;
  Login: (userId: number | undefined) => void;
  SendNotification: (data: SendNotification) => void;
  sendChat: (data: SendChat) => void;
}

export type SocketInitialType = Socket<
  ServerToClientEvents,
  ClientToServerEvents
> | null;

export type Interactives = {
  voteStatus: boolean | null;
  likeStatus: boolean | null;
  laughStatus: boolean | null;
  confusedStatus: boolean | null;
  createdAt: Date;
  userId: number;
  postId: number;
  read: boolean;
  checked: boolean;
}[];

export type HelloWorld = {
  msg: string;
};

export type SendNotification = {
  postId: number;
  reciverId: number;
  value: boolean;
  senderId: number;
  senderName: string;
  type: "vote" | "like" | "laugh" | "confused";
};

export type ReceiveNotification = {
  postId: number;
  title: string;
  senderId: number;
  senderName: string;
  type: "vote" | "like" | "laugh" | "confused";
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
