import axios from "axios";
import { SET_INTERACTIVES, SET_NOTIFICATIONS } from "../../constant";
import {
  Interactives,
  ReceiveNotification,
  SendNotification,
  SocketActionType,
  SocketInitialType,
} from "../types/socketTypes";

import { useContext } from "react";
import SocketContext from "../SocketContext";

export const useSocket = () => {
  const { socket, setSocket, state, dispatch } = useContext(SocketContext);

  return { socket, setSocket, socketState: state, socketDispatch: dispatch };
};

export const sendNotification = (
  socket: SocketInitialType,
  data: SendNotification
) => {
  socket?.emit("SendNotification", data);
};

export const receiveNotification = (
  socket: SocketInitialType,
  dispatch: React.Dispatch<SocketActionType>
) => {
  socket?.on("ReceiveNotification", (data) => {
    dispatch({
      type: SET_NOTIFICATIONS,
      payload: data,
    });
  });
};

export async function fetchInteractives(
  dispatch: React.Dispatch<SocketActionType>,
  getAll: boolean = false
) {
  const res = await axios.get<Interactives>(
    `http://localhost:3119/user/interactives?getAll=${getAll}`,
    { withCredentials: true }
  );

  dispatch({
    type: SET_INTERACTIVES,
    payload: res.data,
  });
}
