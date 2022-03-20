import axios from "axios";
import {
  Interactives,
  ReceiveNotification,
  SendNotification,
  SocketInitialType,
} from "../types/socketTypes";

export const sendNotification = (
  socket: SocketInitialType,
  data: SendNotification
) => {
  socket?.emit("SendNotification", data);
};

export const receiveNotification = (
  socket: SocketInitialType,
  setNotifications: React.Dispatch<React.SetStateAction<ReceiveNotification[]>>
) => {
  socket?.on("ReceiveNotification", (data) => {
    setNotifications((prev) => [data, ...prev]);
  });
};

export async function fetchInteractives(
  setInteractives: React.Dispatch<React.SetStateAction<Interactives>>,
  getAll: boolean = false
) {
  const res = await axios.get<Interactives>(
    `http://localhost:3119/user/interactives?getAll=${getAll}`,
    { withCredentials: true }
  );
  setInteractives(res.data);
}
