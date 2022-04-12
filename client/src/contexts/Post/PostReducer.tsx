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
  POSTS_IN_SEARCH,
} from "../constant";
import { PostActionType, PostState } from "./types/PostTypes";
import produce from "immer";
import { voteManipulation } from "../../utils/voteManipulation";
import { interactionManipulation } from "../../utils/interactionManipulation";

export default function PostReducer(state: PostState, action: PostActionType) {
  switch (action.type) {
    case CLEAR_CACHE: {
      return produce(state, (draftState) => {
        draftState.paginatedPosts = { hasMore: false, postAndInteractions: [] };

        if (draftState.currentPost) draftState.currentPost.interactions = null;
      });
    }

    case POSTS_IN_SEARCH: {
      return produce(state, (draftState) => {
        draftState.postsInSearch = action.payload;
      });
    }

    case FETCH_PAGINATED_POSTS: {
      console.log("fetch posts");
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

        paginatedPosts.postAndInteractions.forEach(
          (postAndInteraction) => postAndInteraction.post.id !== action.payload
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

        if (currentPost && currentPost.interactions) {
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

        paginatedPosts.postAndInteractions.forEach((postAndInteraction) => {
          if (
            postAndInteraction.post.id === action.payload.id &&
            postAndInteraction.interactions
          ) {
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
        });
      });
    }

    case LIKE_POST: {
      return produce(state, (draftState) => {
        const currentPost = draftState.currentPost;
        const paginatedPosts = draftState.paginatedPosts;

        if (currentPost && currentPost.interactions) {
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

        paginatedPosts.postAndInteractions.forEach((postAndInteraction) => {
          if (
            postAndInteraction.post.id === action.payload &&
            postAndInteraction.interactions
          ) {
            const likeStatus = postAndInteraction.interactions.likeStatus;
            const likePoints = postAndInteraction.post.likePoints;

            const { newStatus, newPoints } = interactionManipulation(
              likeStatus,
              likePoints
            );

            postAndInteraction.interactions.likeStatus = newStatus;
            postAndInteraction.post.likePoints = newPoints;
          }
        });
      });
    }

    case LAUGHE_POST: {
      return produce(state, (draftState) => {
        const currentPost = draftState.currentPost;
        const paginatedPosts = draftState.paginatedPosts;

        if (currentPost && currentPost.interactions) {
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

        paginatedPosts.postAndInteractions.forEach((postAndInteraction) => {
          if (
            postAndInteraction.post.id === action.payload &&
            postAndInteraction.interactions
          ) {
            const laughStatus = postAndInteraction.interactions.laughStatus;
            const laughPoints = postAndInteraction.post.laughPoints;

            const { newStatus, newPoints } = interactionManipulation(
              laughStatus,
              laughPoints
            );

            postAndInteraction.interactions.laughStatus = newStatus;
            postAndInteraction.post.laughPoints = newPoints;
          }
        });
      });
    }

    case CONFUSE_POST: {
      return produce(state, (draftState) => {
        const currentPost = draftState.currentPost;
        const paginatedPosts = draftState.paginatedPosts;

        if (currentPost && currentPost.interactions) {
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

        paginatedPosts.postAndInteractions.forEach((postAndInteraction) => {
          if (
            postAndInteraction.post.id === action.payload &&
            postAndInteraction.interactions
          ) {
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
        });
      });
    }

    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}
