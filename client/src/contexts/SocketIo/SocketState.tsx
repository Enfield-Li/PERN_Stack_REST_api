import React, { useState } from "react";
import { Socket } from "socket.io-client";
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "./types/socketTypes";
import SocketContext from "./SocketContext";

interface ProviderType {}

export type SocketInitialType = Socket<
  ServerToClientEvents,
  ClientToServerEvents
> | null;

export type Interactions = {
  voteStatus: boolean | null;
  likeStatus: boolean | null;
  laughStatus: boolean | null;
  confusedStatus: boolean | null;
  createdAt: Date;
  userId: number;
  postId: number;
}[];

const SocketProvider: React.FC<ProviderType> = ({ children }) => {
  const [socket, setSocket] = useState<SocketInitialType>(null);
  const [interactives, setInteractives] = useState<Interactions>([]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
        interactives,
        setInteractives,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
