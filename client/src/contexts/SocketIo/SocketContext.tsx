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
  uncheckedAmount: number;
  setUncheckedAmount: React.Dispatch<React.SetStateAction<number>>;
}>({
  socket: null,
  setSocket: () => {},
  state: socketInitialState,
  dispatch: () => {},
  uncheckedAmount: 0,
  setUncheckedAmount: () => {},
});

export default SocketContext;
