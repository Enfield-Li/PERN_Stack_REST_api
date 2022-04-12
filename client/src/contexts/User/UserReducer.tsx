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
import { voteManipulation } from "../../utils/voteManipulation";
import { interactionManipulation } from "../../utils/interactionManipulation";

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

        if (userProfile) {
          userProfile.userPaginatedPost.postAndInteractions.forEach(
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
            }
          );
        }
      });
    }

    case LIKE_CURRENT_POST: {
      return produce(state, (draftState) => {
        const userProfile = draftState.userProfile;

        if (userProfile) {
          userProfile.userPaginatedPost.postAndInteractions.forEach(
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
            }
          );
        }
      });
    }

    case LAUGH_CURRENT_POST: {
      return produce(state, (draftState) => {
        const userProfile = draftState.userProfile;

        if (userProfile) {
          userProfile.userPaginatedPost.postAndInteractions.forEach(
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
            }
          );
        }
      });
    }

    case CONFUSE_CURRENT_POST: {
      return produce(state, (draftState) => {
        const userProfile = draftState.userProfile;

        if (userProfile) {
          userProfile.userPaginatedPost.postAndInteractions.forEach(
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
            }
          );
        }
      });
    }

    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}
