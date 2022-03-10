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
import { voteManipulation } from "../../utils/voteManipulation";
import { interactionManipulation } from "../../utils/interactionManipulation";

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
        if (draftState.currentPost) {
          const voteValue = action.payload.value;
          const voteStatus = draftState.currentPost.interactions.voteStatus;
          const votePoints = draftState.currentPost.post.votePoints;

          const { newVoteStatus, newVotePoints } = voteManipulation(
            voteValue,
            voteStatus,
            votePoints
          );

          draftState.currentPost.interactions.voteStatus = newVoteStatus;
          draftState.currentPost.post.votePoints = newVotePoints;
          return;
        }

        draftState.paginatedPosts.postAndInteractions =
          draftState.paginatedPosts.postAndInteractions.filter(
            (postAndInteraction) => {
              if (postAndInteraction.post.id === action.payload.id) {
                const voteValue = action.payload.value;
                const voteStatus = postAndInteraction.interactions.voteStatus;
                const votePoints = postAndInteraction.post.votePoints;

                const { newVoteStatus, newVotePoints } = voteManipulation(
                  voteValue,
                  voteStatus,
                  votePoints
                );

                postAndInteraction.interactions.voteStatus = newVoteStatus;
                postAndInteraction.post.votePoints = newVotePoints;
              }

              return postAndInteraction;
            }
          );
      });
    }

    case LIKE_POST: {
      return produce(state, (draftState) => {
        if (draftState.currentPost) {
          const likeStatus = draftState.currentPost.interactions.likeStatus;
          const likePoints = draftState.currentPost.post.likePoints;

          const { newStatus, newPoints } = interactionManipulation(
            likeStatus,
            likePoints
          );

          draftState.currentPost.interactions.likeStatus = newStatus;
          draftState.currentPost.post.likePoints = newPoints;
          return;
        }

        draftState.paginatedPosts.postAndInteractions =
          draftState.paginatedPosts.postAndInteractions.filter(
            (postAndInteraction) => {
              if (postAndInteraction.post.id === action.payload) {
                const likeStatus = postAndInteraction.interactions.likeStatus;
                const likePoints = postAndInteraction.post.likePoints;

                const { newStatus, newPoints } = interactionManipulation(
                  likeStatus,
                  likePoints
                );

                postAndInteraction.interactions.likeStatus = newStatus;
                postAndInteraction.post.likePoints = newPoints;
              }

              return postAndInteraction.interactions;
            }
          );
      });
    }

    case LAUGHE_POST: {
      return produce(state, (draftState) => {
        if (draftState.currentPost) {
          const laughStatus = draftState.currentPost.interactions.laughStatus;
          const laughPoints = draftState.currentPost.post.laughPoints;

          const { newStatus, newPoints } = interactionManipulation(
            laughStatus,
            laughPoints
          );

          draftState.currentPost.interactions.laughStatus = newStatus;
          draftState.currentPost.post.laughPoints = newPoints;
          return;
        }

        draftState.paginatedPosts.postAndInteractions =
          draftState.paginatedPosts.postAndInteractions.filter(
            (postAndInteraction) => {
              if (postAndInteraction.post.id === action.payload) {
                const laughStatus = postAndInteraction.interactions.laughStatus;
                const laughPoints = postAndInteraction.post.laughPoints;

                const { newStatus, newPoints } = interactionManipulation(
                  laughStatus,
                  laughPoints
                );

                postAndInteraction.interactions.laughStatus = newStatus;
                postAndInteraction.post.laughPoints = newPoints;
              }

              return postAndInteraction.interactions;
            }
          );
      });
    }

    case CONFUSE_POST: {
      return produce(state, (draftState) => {
        if (draftState.currentPost) {
          const confusedStatus =
            draftState.currentPost.interactions.confusedStatus;
          const confusedPoints = draftState.currentPost.post.confusedPoints;

          const { newStatus, newPoints } = interactionManipulation(
            confusedStatus,
            confusedPoints
          );

          draftState.currentPost.interactions.confusedStatus = newStatus;
          draftState.currentPost.post.confusedPoints = newPoints;
          return;
        }

        draftState.paginatedPosts.postAndInteractions =
          draftState.paginatedPosts.postAndInteractions.filter(
            (postAndInteraction) => {
              if (postAndInteraction.post.id === action.payload) {
                const confusedStatus =
                  postAndInteraction.interactions.confusedStatus;
                const confusedPoints = postAndInteraction.post.confusedPoints;

                const { newStatus, newPoints } = interactionManipulation(
                  confusedStatus,
                  confusedPoints
                );

                postAndInteraction.interactions.confusedStatus = newStatus;
                postAndInteraction.post.confusedPoints = newPoints;
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
