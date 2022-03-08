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
        draftState.currentPost = action.payload;
      });
    }

    case DELETE_POST: {
      return produce(state, (draftState) => {
        draftState.paginatedPosts.postAndInteractions =
          draftState.paginatedPosts.postAndInteractions.filter(
            (postAndInteraction) =>
              postAndInteraction.post.id !== action.payload
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
          draftState.paginatedPosts.postAndInteractions.filter(
            (postAndInteraction) => {
              if (postAndInteraction.post.id === action.payload.id) {
                const voteValue = action.payload.value;
                const voteStatus = postAndInteraction.interactions?.voteStatus;

                if (voteStatus !== voteValue && voteStatus === null) {
                  postAndInteraction.interactions.voteStatus = voteValue;
                  postAndInteraction.post.votePoints =
                    postAndInteraction.post.votePoints + (voteValue ? 1 : -1);
                } else if (voteStatus === voteValue && voteStatus !== null) {
                  postAndInteraction.interactions.voteStatus = null;
                  postAndInteraction.post.votePoints =
                    postAndInteraction.post.votePoints + (voteValue ? -1 : 1);
                } else {
                  postAndInteraction.interactions.voteStatus = voteValue;
                  postAndInteraction.post.votePoints =
                    postAndInteraction.post.votePoints + (voteValue ? 2 : -2);
                }
              }

              return postAndInteraction;
            }
          );
      });
    }

    case LIKE_POST: {
      return produce(state, (draftState) => {
        draftState.paginatedPosts.postAndInteractions =
          draftState.paginatedPosts.postAndInteractions.filter(
            (postAndInteraction) => {
              const likeStatus = postAndInteraction.interactions.likeStatus;

              if (postAndInteraction.post.id === action.payload) {
                if (likeStatus === null) {
                  postAndInteraction.interactions.likeStatus = !likeStatus;
                  postAndInteraction.post.likePoints =
                    postAndInteraction.post.likePoints + 1;
                } else if (likeStatus !== null) {
                  postAndInteraction.interactions.likeStatus = null;
                  postAndInteraction.post.likePoints =
                    postAndInteraction.post.likePoints - 1;
                }
              }

              return postAndInteraction.interactions;
            }
          );
      });
    }

    case LAUGHE_POST: {
      return produce(state, (draftState) => {
        draftState.paginatedPosts.postAndInteractions =
          draftState.paginatedPosts.postAndInteractions.filter(
            (postAndInteraction) => {
              const laughStatus = postAndInteraction.interactions.laughStatus;

              if (postAndInteraction.post.id === action.payload) {
                if (laughStatus === null) {
                  postAndInteraction.interactions.laughStatus = !laughStatus;
                  postAndInteraction.post.laughPoints =
                    postAndInteraction.post.laughPoints + 1;
                } else if (laughStatus !== null) {
                  postAndInteraction.interactions.laughStatus = null;
                  postAndInteraction.post.laughPoints =
                    postAndInteraction.post.laughPoints - 1;
                }
              }

              return postAndInteraction.interactions;
            }
          );
      });
    }

    case CONFUSE_POST: {
      return produce(state, (draftState) => {
        draftState.paginatedPosts.postAndInteractions =
          draftState.paginatedPosts.postAndInteractions.filter(
            (postAndInteraction) => {
              const confusedStatus =
                postAndInteraction.interactions.confusedStatus;

              if (postAndInteraction.post.id === action.payload) {
                if (confusedStatus === null) {
                  postAndInteraction.interactions.confusedStatus =
                    !confusedStatus;
                  postAndInteraction.post.confusedPoints =
                    postAndInteraction.post.confusedPoints + 1;
                } else if (confusedStatus !== null) {
                  postAndInteraction.interactions.confusedStatus = null;
                  postAndInteraction.post.confusedPoints =
                    postAndInteraction.post.confusedPoints - 1;
                }
              }

              return postAndInteraction.interactions;
            }
          );
      });
    }

    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}
