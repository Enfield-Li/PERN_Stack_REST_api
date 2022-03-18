import { createContext } from "react";
import { Interactions, SocketInitialType } from "./SocketState";

const SocketContext = createContext<{
  socket: SocketInitialType;
  setSocket: React.Dispatch<SocketInitialType>;
  interactives: Interactions;
  setInteractives: React.Dispatch<Interactions>;
}>({
  socket: null,
  setSocket: () => {},
  interactives: [],
  setInteractives: () => {},
});

export default SocketContext;
