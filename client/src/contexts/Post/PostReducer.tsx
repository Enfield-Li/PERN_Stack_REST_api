import {
  CREATE_POST,
  DELETE_POST,
  FETCH_PAGINATED_POSTS,
  CURRENT_POST,
  CLEAR_CACHE,
  VOTE_POST,
  CONFUSE_POST,
  LAUGHE_POST,
  LIKE_POST,
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
        draftState.currentPost = null;
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
      return produce(state, (draftState) => {
        draftState.paginatedPosts.postAndInteractions =
          draftState.paginatedPosts.postAndInteractions.filter(
            (post) => post.id !== action.payload
          );
      });
    }

    case CURRENT_POST: {
      return {
        ...state,
        currentPost: action.payload,
      };
    }

    case VOTE_POST: {
      return produce(state, (draftState) => {
        draftState.paginatedPosts.postAndInteractions =
          draftState.paginatedPosts.postAndInteractions.filter((post) => {
            if (post.id === action.payload.id) {
              const voteValue = action.payload.value;
              const voteStatus = post.user.interactions?.voteStatus;

              if (voteStatus !== voteValue && voteStatus === null) {
                post.user.interactions!.voteStatus = voteValue;
                post.votePoints = post.votePoints + (voteValue ? 1 : -1);
              } else if (voteStatus === voteValue && voteStatus !== null) {
                post.user.interactions!.voteStatus = null;
                post.votePoints = post.votePoints + (voteValue ? -1 : 1);
              } else {
                post.user.interactions!.voteStatus = voteValue;
                post.votePoints = post.votePoints + (voteValue ? 2 : -2);
              }
            }

            return post;
          });
      });
    }

    case LIKE_POST: {
      return produce(state, (draftState) => {
        draftState.paginatedPosts.postAndInteractions =
          draftState.paginatedPosts.postAndInteractions.filter((post) => {
            const likeStatus = post.user.interactions?.likeStatus;

            if (post.id === action.payload) {
              if (likeStatus === null) {
                post.user.interactions!.likeStatus = !likeStatus;
                post.likePoints = post.likePoints + 1;
              } else if (likeStatus !== null) {
                post.user.interactions!.likeStatus = null;
                post.likePoints = post.likePoints - 1;
              }
            }

            return post;
          });
      });
    }

    case LAUGHE_POST: {
      return produce(state, (draftState) => {
        draftState.paginatedPosts.postAndInteractions =
          draftState.paginatedPosts.postAndInteractions.filter((post) => {
            const laughStatus = post.user.interactions?.laughStatus;

            if (post.id === action.payload) {
              if (laughStatus === null) {
                post.user.interactions!.laughStatus = !laughStatus;
                post.laughPoints = post.laughPoints + 1;
              } else if (laughStatus !== null) {
                post.user.interactions!.laughStatus = null;
                post.laughPoints = post.laughPoints - 1;
              }
            }

            return post;
          });
      });
    }

    case CONFUSE_POST: {
      return produce(state, (draftState) => {
        draftState.paginatedPosts.postAndInteractions =
          draftState.paginatedPosts.postAndInteractions.filter((post) => {
            const confusedStatus = post.user.interactions?.confusedStatus;

            if (post.id === action.payload) {
              if (confusedStatus === null) {
                post.user.interactions!.confusedStatus = !confusedStatus;
                post.confusedPoints = post.confusedPoints + 1;
              } else if (confusedStatus !== null) {
                post.user.interactions!.confusedStatus = null;
                post.confusedPoints = post.confusedPoints - 1;
              }
            }

            return post;
          });
      });
    }

    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}
