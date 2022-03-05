import {
  ADD_POST,
  DELETE_POST,
  FETCH_ALL_POSTS,
  LOGIN_USER,
  LOGOUT_USER,
  SET_CURRENT_POST,
} from "../constant";
import { UserState, UserActionType } from "./types/UserTypes";

export default function UserReducer(state: UserState, action: UserActionType) {
  console.log("reducer called");
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case LOGOUT_USER: {
      console.log("logout reducer");
      return {
        ...state,
        user: null,
      };
    }
    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}
