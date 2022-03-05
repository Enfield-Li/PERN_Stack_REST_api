import { createContext } from "react";
import { UserState, UserActionType } from "./types/UserTypes";
import { userInitialState } from "./types/UserTypes";

const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserActionType>;
}>({ state: userInitialState, dispatch: () => {} });

export default UserContext;
