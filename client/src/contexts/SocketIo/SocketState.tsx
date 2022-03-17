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

const SocketProvider: React.FC<ProviderType> = ({ children }) => {
  const [socket, setSocket] = useState<SocketInitialType>(null);

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
