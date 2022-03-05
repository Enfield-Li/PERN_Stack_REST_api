import {
  CREATE_POST,
  DELETE_POST,
  FETCH_PAGINATED_POSTS,
  EDIT_CURRENT_POST,
} from "../constant";
import { PostActionType, PostState } from "./types/PostTypes";

export default function PostReducer(state: PostState, action: PostActionType) {
  console.log("reducer called");
  switch (action.type) {
    case FETCH_PAGINATED_POSTS: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case CREATE_POST: {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    }
    case EDIT_CURRENT_POST: {
      return {
        ...state,
        currentPost: action.payload,
      };
    }

    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}
