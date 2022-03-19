import React, { useState } from "react";
import SocketContext from "./SocketContext";
import { SocketInitialType, Interactives } from "./types/socketTypes";

interface ProviderType {}

const SocketProvider: React.FC<ProviderType> = ({ children }) => {
  const [socket, setSocket] = useState<SocketInitialType>(null);
  const [interactives, setInteractives] = useState<Interactives>([]);

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
