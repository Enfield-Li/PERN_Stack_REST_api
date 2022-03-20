import { useContext } from "react";
import SocketContext from "../SocketContext";

export const useSocket = () => {
  const {
    socket,
    setSocket,
    notifications,
    setNotifications,
    interactives,
    setInteractives,
  } = useContext(SocketContext);

  return {
    socket,
    setSocket,
    notifications,
    setNotifications,
    interactives,
    setInteractives,
  };
};
