import { SocketInitialType } from "../SocketState";
import { SendNotification } from "../types/socketTypes";

export const sendNotification = (
  socket: SocketInitialType,
  data: SendNotification
) => {
  socket?.emit("SendNotification", data);
};
