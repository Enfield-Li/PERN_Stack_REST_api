import {
  ADD_POST,
  DELETE_POST,
  FETCH_ALL_POSTS,
  LOGIN_USER,
  LOGOUT_USER,
  SET_CURRENT_POST,
} from "../constant";
import { GlobalState, ActionType } from "./types/UserTypes";

export default function GlobalReducer(state: GlobalState, action: ActionType) {
  console.log("reducer called");
  switch (action.type) {
    case FETCH_ALL_POSTS: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case ADD_POST: {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post.postId !== action.payload),
      };
    }
    case SET_CURRENT_POST: {
      return {
        ...state,
        currentPost: action.payload,
      };
    }
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
