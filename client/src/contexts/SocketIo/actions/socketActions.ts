import axios from "axios";
import {
  CLEAR_NOTIFICATIONS,
  SET_ALL_NOTIFICATION_READ,
  SET_INTERACTIVES,
  SET_NOTIFICATIONS,
  SET_NOTIFICATION_READ,
} from "../../constant";
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
  socketDispatch: React.Dispatch<SocketActionType>,
  setNotifications: React.Dispatch<React.SetStateAction<ReceiveNotification[]>>
) => {
  socket?.on("ReceiveNotification", (data) => {
    setNotifications((prev) => [data, ...prev]);

    socketDispatch({
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

export function clearNotifications(dispatch: React.Dispatch<SocketActionType>) {
  dispatch({ type: CLEAR_NOTIFICATIONS });
}

export function setInteractiveRead(
  postId: number,
  dispatch: React.Dispatch<SocketActionType>
) {
  dispatch({
    type: SET_NOTIFICATION_READ,
    payload: postId,
  });
}

export function setAllInteractivesRead(
  dispatch: React.Dispatch<SocketActionType>
) {
  dispatch({
    type: SET_ALL_NOTIFICATION_READ,
  });
}
