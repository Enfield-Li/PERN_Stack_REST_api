import { createContext } from "react";
import {
  SocketInitialType,
  ReceiveNotification,
  Interactives,
} from "./types/socketTypes";

const SocketContext = createContext<{
  socket: SocketInitialType;
  setSocket: React.Dispatch<React.SetStateAction<SocketInitialType>>;
  notifications: ReceiveNotification[];
  setNotifications: React.Dispatch<
    React.SetStateAction<ReceiveNotification[]>
  >;
  interactives: Interactives;
  setInteractives: React.Dispatch<React.SetStateAction<Interactives>>;
}>({
  socket: null,
  setSocket: () => {},
  notifications: [],
  setNotifications: () => {},
  interactives: [],
  setInteractives: () => {},
});

export default SocketContext;
