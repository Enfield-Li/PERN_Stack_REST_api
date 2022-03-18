// on
export interface ServerToClientEvents {
  MsgToClient: (data: HelloWorld) => void;
  ReceiveNotification: (data: ReceiveNotification) => void;
}

// emit
export interface ClientToServerEvents {
  MsgToServer: (data: HelloWorld) => void;
  Login: (userId: number | undefined) => void;
  SendNotification: (data: SendNotification) => void;
}

export type HelloWorld = {
  msg: string;
};

export type SendNotification = {
  postId: number;
  reciverId: number;
  value: boolean;
  senderId: number;
  senderName: string;
};

export type ReceiveNotification = {
  postId: number;
  title: string;
  senderId: number;
  senderName: string;
};
