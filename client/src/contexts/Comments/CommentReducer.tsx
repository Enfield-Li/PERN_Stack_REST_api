import { FETCH_COMMENTS } from "../constant";
import { CommentActionType, CommentState } from "./types/CommentTypes";

export default function CommentReducer(
  state: CommentState,
  action: CommentActionType
) {
  switch (action.type) {
    case FETCH_COMMENTS: {
      return state;
    }

    default: {
      return state;
    }
  }
}
