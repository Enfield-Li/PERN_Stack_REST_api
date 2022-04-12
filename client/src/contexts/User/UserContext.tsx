import { createContext } from "react";
import { UserActionType, UserState } from "./types/UserTypes";

interface UserCtxType {
  state: UserState;
  dispatch: React.Dispatch<UserActionType>;
}

const UserContext = createContext<UserCtxType>({} as UserCtxType);

export default UserContext;
