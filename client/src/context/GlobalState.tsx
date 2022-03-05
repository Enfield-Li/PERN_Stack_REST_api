import GlobalContext from "./GlobalContext";
import GlobalReducer from "./GlobalReducer";
import { useReducer } from "react";
import { initialState } from "./types/GlobalType";

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
