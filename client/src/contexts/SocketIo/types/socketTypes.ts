import { Socket } from "socket.io-client";
import {
  CLEAR_NOTIFICATIONS,
  SET_ALL_NOTIFICATION_READ,
  SET_INTERACTIVES,
  SET_NOTIFICATIONS,
  SET_NOTIFICATION_READ,
} from "../../constant";

export interface ServerToClientEvents {
  MsgToClient: (data: HelloWorld) => void;
  ReceiveNotification: (data: ReceiveNotification) => void;
  receiveChat: (data: ReciveChat) => void;
}

export interface ClientToServerEvents {
  MsgToServer: (data: HelloWorld) => void;
  Login: (userId?: number) => void;
  Logout: (userId?: number) => void;
  SendNotification: (data: SendNotification) => void;
  SendChat: (data: SendChat) => void;
}

export type SocketInitialType = Socket<
  ServerToClientEvents,
  ClientToServerEvents
> | null;

export type SocketInitialStateType = {
  interactives: Interactives;
  notifications: ReceiveNotification[];
};

export const socketInitialState: SocketInitialStateType = {
  interactives: [],
  notifications: [],
};

export type Interactives = Interactive[];

export type Interactive = {
  voteStatus: boolean | null;
  likeStatus: boolean | null;
  laughStatus: boolean | null;
  confusedStatus: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  postId: number;
  read: boolean;
  checked: boolean;
  user: { username: string };
  post: { title: string };
};

export type HelloWorld = {
  msg: string;
};

export type PostsForChecked = {
  userId: number;
  postId: number;
};

export type NotificationType =
  | "vote"
  | "like"
  | "laugh"
  | "confused"
  | "comment";

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

export type SocketActionType =
  | SetNotifications
  | SetInteractives
  | ClearNotifications
  | SetNotificationRead
  | SetAllNotificationRead;

export type SetNotifications = {
  type: typeof SET_INTERACTIVES;
  payload: Interactives;
};

export type SetInteractives = {
  type: typeof SET_NOTIFICATIONS;
  payload: ReceiveNotification;
};

export type ClearNotifications = {
  type: typeof CLEAR_NOTIFICATIONS;
};

export type SetNotificationRead = {
  type: typeof SET_NOTIFICATION_READ;
  payload: PostsForChecked;
};

export type SetAllNotificationRead = {
  type: typeof SET_ALL_NOTIFICATION_READ;
};
