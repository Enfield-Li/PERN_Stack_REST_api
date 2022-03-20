import { createContext } from "react";
import { SocketInitialType, ReceiveNotification } from "./types/socketTypes";

const SocketContext = createContext<{
  socket: SocketInitialType;
  setSocket: React.Dispatch<React.SetStateAction<SocketInitialType>>;
  notifications: ReceiveNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<ReceiveNotification[]>>;
}>({
  socket: null,
  setSocket: () => {},
  notifications: [],
  setNotifications: () => {},
});

export default SocketContext;
