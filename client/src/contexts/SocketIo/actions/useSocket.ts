import { useContext } from "react";
import SocketContext from "../SocketContext";

export const useSocket = () => {
  const { socket, setSocket, notifications, setNotifications } =
    useContext(SocketContext);

  return {
    socket,
    setSocket,
    notifications,
    setNotifications,
  };
};
