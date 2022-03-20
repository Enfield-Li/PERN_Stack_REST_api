import axios from "axios";
import {
  ReceiveNotification,
  SendNotification,
  SocketInitialType
} from "../types/socketTypes";

export const sendNotification = (
  socket: SocketInitialType,
  data: SendNotification
) => {
  socket?.emit("SendNotification", data);
};

export const receiveNotification = (
  socket: SocketInitialType,
  notifications: ReceiveNotification[],
  setNotifications: React.Dispatch<React.SetStateAction<ReceiveNotification[]>>
) => {
  socket?.on("ReceiveNotification", (data) => {
    console.log("ReceiveNotification: ", data);
    setNotifications((prev) => [data, ...prev]);
    console.log("notifications: ", notifications);
  });
};

export async function fetchInteractives(getAll: boolean = false) {
  const res = await axios.get(
    `http://localhost:3119/user/interactives?getAll=${getAll}`,
    { withCredentials: true }
  );
}
