import { createContext } from "react";
import { SocketInitialType, Interactives } from "./types/socketTypes";

const SocketContext = createContext<{
  socket: SocketInitialType;
  setSocket: React.Dispatch<SocketInitialType>;
  interactives: Interactives;
  setInteractives: React.Dispatch<Interactives>;
}>({
  socket: null,
  setSocket: () => {},
  interactives: [],
  setInteractives: () => {},
});

export default SocketContext;
