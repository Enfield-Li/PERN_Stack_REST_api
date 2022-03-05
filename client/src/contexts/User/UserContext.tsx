import { createContext } from "react";
import { GlobalState, ActionType } from "./types/UserTypes";
import { initialState } from "./types/UserTypes";

const GlobalContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => {} });

export default GlobalContext;
