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
  switch (action.type) {
    case CLEAR_CACHE: {
      return produce(state, (draftState) => {
        draftState.paginatedPosts.postAndInteractions = [];
        // draftState.currentPost = null;
      });
    }

    case FETCH_PAGINATED_POSTS: {
      return produce(state, (draftState) => {
        const { hasMore, postAndInteractions } = action.payload;
        const paginatedPosts = draftState.paginatedPosts;

        paginatedPosts.hasMore = hasMore;
        paginatedPosts.postAndInteractions.push(...postAndInteractions);
      });
    }

    case CREATE_POST: {
      return produce(state, (draftState) => {
        draftState.currentPost = action.payload;
      });
    }

    case DELETE_POST: {
      return produce(state, (draftState) => {
        const paginatedPosts = draftState.paginatedPosts;

        paginatedPosts.postAndInteractions =
          paginatedPosts.postAndInteractions.filter(
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
        const currentPost = draftState.currentPost;
        const paginatedPosts = draftState.paginatedPosts;

        if (currentPost) {
          const voteValue = action.payload.value;
          const voteStatus = currentPost.interactions.voteStatus;
          const votePoints = currentPost.post.votePoints;

          const { newVoteStatus, newVotePoints } = voteManipulation(
            voteValue,
            voteStatus,
            votePoints
          );

          currentPost.interactions.voteStatus = newVoteStatus;
          currentPost.post.votePoints = newVotePoints;
          return;
        }

        paginatedPosts.postAndInteractions =
          paginatedPosts.postAndInteractions.filter((postAndInteraction) => {
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
          });
      });
    }

    case LIKE_POST: {
      return produce(state, (draftState) => {
        const currentPost = draftState.currentPost;
        const paginatedPosts = draftState.paginatedPosts;

        if (currentPost) {
          const likeStatus = currentPost.interactions.likeStatus;
          const likePoints = currentPost.post.likePoints;

          const { newStatus, newPoints } = interactionManipulation(
            likeStatus,
            likePoints
          );

          currentPost.interactions.likeStatus = newStatus;
          currentPost.post.likePoints = newPoints;
          return;
        }

        paginatedPosts.postAndInteractions =
          paginatedPosts.postAndInteractions.filter((postAndInteraction) => {
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
          });
      });
    }

    case LAUGHE_POST: {
      return produce(state, (draftState) => {
        const currentPost = draftState.currentPost;
        const paginatedPosts = draftState.paginatedPosts;

        if (currentPost) {
          const laughStatus = currentPost.interactions.laughStatus;
          const laughPoints = currentPost.post.laughPoints;

          const { newStatus, newPoints } = interactionManipulation(
            laughStatus,
            laughPoints
          );

          currentPost.interactions.laughStatus = newStatus;
          currentPost.post.laughPoints = newPoints;
          return;
        }

        paginatedPosts.postAndInteractions =
          paginatedPosts.postAndInteractions.filter((postAndInteraction) => {
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
          });
      });
    }

    case CONFUSE_POST: {
      return produce(state, (draftState) => {
        const currentPost = draftState.currentPost;
        const paginatedPosts = draftState.paginatedPosts;

        if (currentPost) {
          const confusedStatus = currentPost.interactions.confusedStatus;
          const confusedPoints = currentPost.post.confusedPoints;

          const { newStatus, newPoints } = interactionManipulation(
            confusedStatus,
            confusedPoints
          );

          currentPost.interactions.confusedStatus = newStatus;
          currentPost.post.confusedPoints = newPoints;
          return;
        }

        paginatedPosts.postAndInteractions =
          paginatedPosts.postAndInteractions.filter((postAndInteraction) => {
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
          });
      });
    }

    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}
