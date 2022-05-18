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
import { processVoteStatusAndPoints } from "../../utils/voteManipulation";
import { prcessPostStatusAndPoints } from "../../utils/interactionManipulation";

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
        const voteValue = action.payload.value;

        if (currentPost?.interactions) {
          processVoteStatusAndPoints(currentPost, voteValue);
          return;
        }

        paginatedPosts.postAndInteractions.forEach((postAndInteraction) => {
          if (postAndInteraction.post.id === action.payload.id) {
            processVoteStatusAndPoints(postAndInteraction, voteValue);
          }
        });
      });
    }

    case LIKE_POST: {
      return produce(state, (draftState) => {
        const id = action.payload;

        if (draftState.currentPost) {
          prcessPostStatusAndPoints(draftState.currentPost, "like");
        }

        draftState.paginatedPosts.postAndInteractions.forEach(
          (postAndInteraction) => {
            if (postAndInteraction.post.id === id)
              prcessPostStatusAndPoints(postAndInteraction, "like");
          }
        );
      });
    }

    case LAUGHE_POST: {
      return produce(state, (draftState) => {
        const id = action.payload;

        if (draftState.currentPost) {
          prcessPostStatusAndPoints(draftState.currentPost, "laugh");
        }

        draftState.paginatedPosts.postAndInteractions.forEach(
          (postAndInteraction) => {
            if (postAndInteraction.post.id === id)
              prcessPostStatusAndPoints(postAndInteraction, "laugh");
          }
        );
      });
    }

    case CONFUSE_POST: {
      return produce(state, (draftState) => {
        const id = action.payload;

        if (draftState.currentPost) {
          prcessPostStatusAndPoints(draftState.currentPost, "confused");
        }

        draftState.paginatedPosts.postAndInteractions.forEach(
          (postAndInteraction) => {
            if (postAndInteraction.post.id === id)
              prcessPostStatusAndPoints(postAndInteraction, "confused");
          }
        );
      });
    }

    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}
