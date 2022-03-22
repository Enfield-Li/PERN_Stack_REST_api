import {
  CLEAR_NOTIFICATIONS,
  SET_ALL_NOTIFICATION_READ,
  SET_INTERACTIVES,
  SET_NOTIFICATIONS,
  SET_NOTIFICATION_READ,
} from "../constant";
import { SocketActionType, SocketInitialStateType } from "./types/socketTypes";
import produce from "immer";

export default function SocketReducer(
  state: SocketInitialStateType,
  action: SocketActionType
) {
  switch (action.type) {
    case SET_INTERACTIVES: {
      return {
        ...state,
        interactives: action.payload,
      };
    }

    case SET_NOTIFICATIONS: {
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    }

    case CLEAR_NOTIFICATIONS: {
      return {
        ...state,
        notifications: [],
      };
    }

    case SET_NOTIFICATION_READ: {
      return produce(state, (draftState) => {
        draftState.interactives = draftState.interactives.filter(
          (interactive) => {
            if (
              interactive.postId === action.payload.postId &&
              interactive.userId === action.payload.userId
            ) {
              interactive.read = true;
            }

            return interactive;
          }
        );
      });
    }

    case SET_ALL_NOTIFICATION_READ: {
      return produce(state, (draftState) => {
        draftState.interactives = draftState.interactives.map((interactive) => {
          interactive.read = true;

          return interactive;
        });
      });
    }

    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}
