import { createContext } from "react";
import { SocketInitialType } from "./SocketState";

const SocketContext = createContext<{
  socket: SocketInitialType;
  setSocket: React.Dispatch<SocketInitialType>;
}>({ socket: null, setSocket: () => {} });

export default SocketContext;
