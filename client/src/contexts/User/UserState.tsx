import GlobalReducer from "./UserReducer";
import { useReducer } from "react";
import { initialState } from "./types/UserTypes";
import GlobalContext from "./UserContext";

interface ProviderType {
  children: React.ReactNode;
}

export default function GlobalProvider({ children }: ProviderType) {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
