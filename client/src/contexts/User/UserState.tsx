import GlobalReducer from "./UserReducer";
import { useReducer } from "react";
import { initialState } from "./types/UserTypes";
import UserContext from "./UserContext";

interface ProviderType {
  children: React.ReactNode;
}

export default function UserProvider({ children }: ProviderType) {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
