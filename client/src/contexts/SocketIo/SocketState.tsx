import React, { useState } from "react";
import SocketContext from "./SocketContext";
import { SocketInitialType, ReceiveNotification } from "./types/socketTypes";

interface ProviderType {}

const SocketProvider: React.FC<ProviderType> = ({ children }) => {
  const [socket, setSocket] = useState<SocketInitialType>(null);
  const [notifications, setNotifications] = useState<ReceiveNotification[]>([]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
