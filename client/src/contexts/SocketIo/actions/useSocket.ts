import { useContext } from "react";
import SocketContext from "../SocketContext";

export const useSocket = () => {
  const { socket, setSocket, interactives, setInteractives } =
    useContext(SocketContext);

  return { socket, setSocket, interactives, setInteractives };
};
