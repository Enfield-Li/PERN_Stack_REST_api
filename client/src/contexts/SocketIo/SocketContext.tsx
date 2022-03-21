import { createContext } from "react";
import {
  SocketInitialType,
  SocketActionType,
  socketInitialState,
  SocketInitialStateType,
} from "./types/socketTypes";

const SocketContext = createContext<{
  socket: SocketInitialType;
  setSocket: React.Dispatch<React.SetStateAction<SocketInitialType>>;
  state: SocketInitialStateType;
  dispatch: React.Dispatch<SocketActionType>;
}>({
  socket: null,
  setSocket: () => {},
  state: socketInitialState,
  dispatch: () => {},
});

export default SocketContext;
