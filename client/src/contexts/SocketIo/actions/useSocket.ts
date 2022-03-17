import { useContext } from "react";
import SocketContext from "../SocketContext";

export const useSocket = () => {
  const { socket, setSocket } = useContext(SocketContext);

  return { socket, setSocket };
};
