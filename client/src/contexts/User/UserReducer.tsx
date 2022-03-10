import { LOGIN_USER, LOGOUT_USER, USER_PROFILE } from "../constant";
import { UserActionType, UserState } from "./types/UserTypes";
import produce from "immer";

export default function UserReducer(state: UserState, action: UserActionType) {
  console.log("UserReducer reducer called");
  switch (action.type) {
    case LOGIN_USER: {
      console.log("LOGIN_USER");
      return {
        user: action.payload,
      };
    }

    case LOGOUT_USER: {
      console.log("LOGOUT_USER");
      return {
        user: null,
      };
    }

    case USER_PROFILE: {
      console.log("USER_PROFILE");
      return state
    }

    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}
