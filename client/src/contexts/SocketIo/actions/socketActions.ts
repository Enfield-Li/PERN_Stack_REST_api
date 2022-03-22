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
  PostsForChecked as InteractionIds,
  ReceiveNotification,
  SendNotification,
  SocketActionType,
  SocketInitialType,
} from "../types/socketTypes";

import { useContext } from "react";
import SocketContext from "../SocketContext";

export const useSocket = () => {
  const {
    socket,
    setSocket,
    state,
    dispatch,
    uncheckedAmount,
    setUncheckedAmount,
  } = useContext(SocketContext);

  return {
    socket,
    setSocket,
    socketState: state,
    socketDispatch: dispatch,
    uncheckedAmount,
    setUncheckedAmount,
  };
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
  setToastNotifications: React.Dispatch<
    React.SetStateAction<ReceiveNotification[]>
  >,
  setUncheckedAmount: React.Dispatch<React.SetStateAction<number>>
) => {
  socket?.on("ReceiveNotification", (data) => {
    setToastNotifications((prev) => [data, ...prev]);

    setUncheckedAmount((prev) => prev + 1);

    socketDispatch({
      type: SET_NOTIFICATIONS,
      payload: data,
    });
  });
};

export async function fetchInteractives(
  dispatch: React.Dispatch<SocketActionType>,
  setUncheckedAmount?: React.Dispatch<React.SetStateAction<number>>,
  getAll: boolean = false
) {
  const res = await axios.get<Interactives>(
    `http://localhost:3119/interactions/interactives?getAll=${getAll}`,
    { withCredentials: true }
  );

  // Set unchecked message amount
  if (setUncheckedAmount) {
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].checked === false) {
        setUncheckedAmount((prev) => prev + 1);
      }
    }
  }

  dispatch({
    type: SET_INTERACTIVES,
    payload: res.data,
  });
}

export async function setNotificationChecked(interactionIds: InteractionIds[]) {
  const res = await axios.patch<InteractionIds[]>(
    "http://localhost:3119/interactions/setNotificationChecked",
    interactionIds,
    { withCredentials: true }
  );
}

export async function setServerInteractionRead(interactionIds: InteractionIds) {
  const res = await axios.patch<InteractionIds>(
    "http://localhost:3119/interactions/setInteractionRead",
    interactionIds,
    { withCredentials: true }
  );
}

export function clearNotifications(dispatch: React.Dispatch<SocketActionType>) {
  dispatch({ type: CLEAR_NOTIFICATIONS });
}

export function setClientInteractionRead(
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
