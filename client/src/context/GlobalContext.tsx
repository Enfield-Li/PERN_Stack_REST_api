import { createContext } from "react";
import { GlobalState, ActionType } from "./types/GlobalType";
import { initialState } from "./types/GlobalType";

const GlobalContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => {} });

export default GlobalContext;
