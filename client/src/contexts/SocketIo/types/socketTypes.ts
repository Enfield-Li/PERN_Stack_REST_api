import { Socket } from "socket.io-client";
import {
  CLEAR_NOTIFICATIONS,
  SET_ALL_NOTIFICATION_READ,
  SET_INTERACTIVES,
  SET_NOTIFICATIONS,
  SET_NOTIFICATION_READ,
} from "../../constant";
import { VotingTypes } from "../../Post/types/PostTypes";

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

export type Interactives = {
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
}[];

export type HelloWorld = {
  msg: string;
};

export type PostsForChecked = {
  userId: number;
  postId: number;
};

export type SendNotification = {
  postId: number;
  reciverId: number;
  value: boolean;
  senderId: number;
  senderName: string;
  type: VotingTypes;
};

export type ReceiveNotification = {
  postId: number;
  title: string;
  senderId: number;
  senderName: string;
  type: VotingTypes;
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
