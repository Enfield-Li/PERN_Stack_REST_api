import React, { useReducer, useState } from "react";
import SocketContext from "./SocketContext";
import SocketReducer from "./SocketReducer";
import {
  SocketInitialType,
  ReceiveNotification,
  Interactives,
  socketInitialState,
} from "./types/socketTypes";

interface ProviderType {}

const SocketProvider: React.FC<ProviderType> = ({ children }) => {
  const [state, dispatch] = useReducer(SocketReducer, socketInitialState);

  const [socket, setSocket] = useState<SocketInitialType>(null);
  const [notifications, setNotifications] = useState<ReceiveNotification[]>([]);
  const [interactives, setInteractives] = useState<Interactives>([]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
        state,
        dispatch,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
