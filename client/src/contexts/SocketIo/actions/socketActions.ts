import axios from "axios";
import { Interactions, SocketInitialType } from "../SocketState";
import { SendNotification } from "../types/socketTypes";

export const sendNotification = (
  socket: SocketInitialType,
  data: SendNotification
) => {
  socket?.emit("SendNotification", data);
};

export async function fetchInteractives(getAll: boolean = false) {
  const res = await axios.get(
    `http://localhost:3119/user/interactives?getAll=${getAll}`,
    { withCredentials: true }
  );

  console.log("interactives: ", res.data);
}
