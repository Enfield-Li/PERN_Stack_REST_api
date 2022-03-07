import { LOGIN_USER, LOGOUT_USER } from "../constant";
import { UserActionType, UserState } from "./types/UserTypes";

export default function UserReducer(state: UserState, action: UserActionType) {
  console.log("UserReducer reducer called");
  switch (action.type) {
    case LOGIN_USER: {
      console.log("login reducer");
      return {
        user: action.payload,
      };
    }
    case LOGOUT_USER: {
      console.log("logout reducer");
      return {
        user: null,
      };
    }
    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}
