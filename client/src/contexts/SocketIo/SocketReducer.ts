import { SET_INTERACTIVES, SET_NOTIFICATIONS } from "../constant";
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

    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}
