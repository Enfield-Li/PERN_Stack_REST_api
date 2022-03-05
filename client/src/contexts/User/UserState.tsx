import UserReducer from "./UserReducer";
import { useReducer } from "react";
import { userInitialState } from "./types/UserTypes";
import UserContext from "./UserContext";

interface ProviderType {
  children: React.ReactNode;
}

export default function UserProvider({ children }: ProviderType) {
  const [state, dispatch] = useReducer(UserReducer, userInitialState);

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
