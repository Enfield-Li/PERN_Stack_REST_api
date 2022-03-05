import { createContext } from "react";
import { UserState, UserActionType } from "./types/UserTypes";
import { initialState } from "./types/UserTypes";

const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserActionType>;
}>({ state: initialState, dispatch: () => {} });

export default UserContext;
