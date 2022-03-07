import {
  CREATE_POST,
  DELETE_POST,
  FETCH_PAGINATED_POSTS,
  EDIT_CURRENT_POST,
  CLEAR_CACHE,
} from "../constant";
import { PostActionType, PostState } from "./types/PostTypes";
import produce from "immer";

export default function PostReducer(state: PostState, action: PostActionType) {
  console.log("post reducer called");
  switch (action.type) {
    case CLEAR_CACHE: {
      console.log("CLEAR_CACHE reducer here");
      return produce(state, (draftState) => {
        draftState.paginatedPosts.postAndInteractions = [];
      });
    }

    case FETCH_PAGINATED_POSTS: {
      console.log("FETCH_PAGINATED_POSTS reducer here");

      return produce(state, (draftState) => {
        draftState.paginatedPosts.hasMore = action.payload.hasMore;
        draftState.paginatedPosts.postAndInteractions.push(
          ...action.payload.postAndInteractions
        );
      });
    }

    case CREATE_POST: {
      console.log("CREATE_POST reducer here");
      return produce(state, (draftState) => {
        draftState.paginatedPosts.postAndInteractions.push(action.payload);
      });
    }

    case DELETE_POST: {
      console.log("DELETE_POST reducer here");
      return produce(state, (draftState) => {
        draftState.paginatedPosts.postAndInteractions.filter((post) => {
          return post.id !== action.payload;
        });
      });
      // return {
      //   ...state,
      //   paginatedPosts: {
      //     ...state.paginatedPosts,
      //     posts: state.paginatedPosts.postAndInteractions.filter(
      //       (post) => post.id !== action.payload
      //     ),
      //   },
      // };
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
