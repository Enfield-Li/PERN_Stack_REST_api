import { CREATE_COMMENT, FETCH_COMMENTS } from "../constant";
import { CommentActionType, CommentState } from "./types/CommentTypes";
import produce from "immer";

export default function commentReducer(
  state: CommentState,
  action: CommentActionType
) {
  switch (action.type) {
    case FETCH_COMMENTS: {
      return { ...state, comments: action.payload };
    }

    case CREATE_COMMENT: {
      return { ...state, comments: [action.payload, ...state.comments] };
    }

    default: {
      return state;
    }
  }
}
