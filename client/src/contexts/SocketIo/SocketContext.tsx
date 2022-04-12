import { createContext } from "react";
import {
  SocketActionType, SocketInitialStateType, SocketInitialType
} from "./types/socketTypes";

interface SocketCtxType {
  socket: SocketInitialType;
  setSocket: React.Dispatch<React.SetStateAction<SocketInitialType>>;
  state: SocketInitialStateType;
  dispatch: React.Dispatch<SocketActionType>;
  uncheckedAmount: number;
  setUncheckedAmount: React.Dispatch<React.SetStateAction<number>>;
}

const SocketContext = createContext<SocketCtxType>({} as SocketCtxType);

export default SocketContext;
