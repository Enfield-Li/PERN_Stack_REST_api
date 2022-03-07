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
  console.log("reducer called");
  switch (action.type) {
    case CLEAR_CACHE: {
      console.log("clear cache");
      return produce(state, (draftState) => {
        draftState.paginatedPosts.postAndInteractions = [];
      });
    }

    case FETCH_PAGINATED_POSTS: {
      return produce(state, (draftState) => {
        draftState.paginatedPosts.hasMore = action.payload.hasMore;
        draftState.paginatedPosts.postAndInteractions.push(
          ...action.payload.postAndInteractions
        );
      });
    }

    case CREATE_POST: {
      return produce(state, (draftState) => {
        draftState.paginatedPosts.postAndInteractions.push(action.payload);
      });
      // console.log("action.payload in reducer: ", action.payload);

      // return {
      //   ...state,
      //   paginatedPosts: {
      //     ...state.paginatedPosts,
      //     postAndInteractions: [
      //       action.payload,
      //       ...state.paginatedPosts.postAndInteractions,
      //     ],
      //   },
      // };
    }

    case DELETE_POST: {
      return {
        ...state,
        paginatedPosts: {
          ...state.paginatedPosts,
          posts: state.paginatedPosts.postAndInteractions.filter(
            (post) => post.id !== action.payload
          ),
        },
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
