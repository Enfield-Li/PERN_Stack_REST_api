import {
  CLEAR_CACHE,
  CONFUSE_CURRENT_POST,
  LAUGH_CURRENT_POST,
  LIKE_CURRENT_POST,
  LOGIN_USER,
  LOGOUT_USER,
  USER_PROFILE,
  VOTE_CURRENT_POST,
} from "../constant";
import { UserActionType, UserState } from "./types/UserTypes";
import produce from "immer";
import {
  processVoteStatusAndPoints,
  voteManipulation,
} from "../../utils/voteManipulation";
import {
  interactionManipulation,
  prcessPostStatusAndPoints,
} from "../../utils/interactionManipulation";

export default function UserReducer(state: UserState, action: UserActionType) {
  switch (action.type) {
    case CLEAR_CACHE: {
      return {
        ...state,
        userProfile: null,
      };
    }

    case LOGIN_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case LOGOUT_USER: {
      return {
        ...state,
        user: null,
      };
    }

    case USER_PROFILE: {
      return produce(state, (draftState) => {
        const userProfile = draftState.userProfile;
        const { user, userPaginatedPost } = action.payload;

        if (userProfile) {
          userProfile.user = user;
          userProfile.userPaginatedPost.hasMore = userPaginatedPost.hasMore;

          userProfile.userPaginatedPost.postAndInteractions.push(
            ...userPaginatedPost.postAndInteractions
          );
        } else {
          draftState.userProfile = action.payload;
        }
      });
    }

    case VOTE_CURRENT_POST: {
      return produce(state, (draftState) => {
        const userProfile = draftState.userProfile;
        const voteValue = action.payload.value;

        if (userProfile) {
          userProfile.userPaginatedPost.postAndInteractions.forEach(
            (postAndInteraction) => {
              if (postAndInteraction.post.id === action.payload.id) {
                processVoteStatusAndPoints(postAndInteraction, voteValue);
              }
            }
          );
        }
      });
    }

    case LIKE_CURRENT_POST: {
      return produce(state, (draftState) => {
        const userProfile = draftState.userProfile;
        const id = action.payload;

        if (userProfile) {
          userProfile.userPaginatedPost.postAndInteractions.forEach(
            (postAndInteraction) => {
              if (postAndInteraction.post.id === id) {
                prcessPostStatusAndPoints(postAndInteraction, "like");
              }
            }
          );
        }
      });
    }

    case LAUGH_CURRENT_POST: {
      return produce(state, (draftState) => {
        const userProfile = draftState.userProfile;
        const id = action.payload;

        if (userProfile) {
          userProfile.userPaginatedPost.postAndInteractions.forEach(
            (postAndInteraction) => {
              if (postAndInteraction.post.id === id) {
                prcessPostStatusAndPoints(postAndInteraction, "laugh");
              }
            }
          );
        }
      });
    }

    case CONFUSE_CURRENT_POST: {
      return produce(state, (draftState) => {
        const userProfile = draftState.userProfile;
        const id = action.payload;

        if (userProfile) {
          userProfile.userPaginatedPost.postAndInteractions.forEach(
            (postAndInteraction) => {
              if (postAndInteraction.post.id === id) {
                prcessPostStatusAndPoints(postAndInteraction, "confused");
              }
            }
          );
        }
      });
    }

    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}
