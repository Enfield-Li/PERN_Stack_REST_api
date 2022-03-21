import React, { useReducer, useState } from "react";
import SocketContext from "./SocketContext";
import SocketReducer from "./SocketReducer";
import {
  SocketInitialType,
  socketInitialState,
} from "./types/socketTypes";

interface ProviderType {}

const SocketProvider: React.FC<ProviderType> = ({ children }) => {
  const [state, dispatch] = useReducer(SocketReducer, socketInitialState);

  const [socket, setSocket] = useState<SocketInitialType>(null);
  const [uncheckedAmount, setUncheckedAmount] = useState(0);

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
        state,
        dispatch,
        uncheckedAmount,
        setUncheckedAmount,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
