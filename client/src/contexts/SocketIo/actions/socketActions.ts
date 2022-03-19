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

  socket?.on("SendNotification", (data) => {
    console.log("SendNotification", data);
  });
};

export const receiveNotification = (socket: SocketInitialType) => {
  socket?.on("ReceiveNotification", (data) => {
    console.log("SendNotification", data);
  });
};

export async function fetchInteractives(getAll: boolean = false) {
  const res = await axios.get(
    `http://localhost:3119/user/interactives?getAll=${getAll}`,
    { withCredentials: true }
  );

  console.log("interactives: ", res.data);
}
