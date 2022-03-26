import {
  CREATE_COMMENT,
  CREATE_REPLY,
  FETCH_COMMENTS,
  FETCH_REPLIES,
} from "../constant";
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

    case FETCH_REPLIES: {
      return produce(state, (draftState) => {
        const { parentCommentId, replies } = action.payload;

        draftState.comments.filter((comment) => {
          if (comment.id === parentCommentId) {
            comment.replies = replies;
          }
        });
      });
    }

    case CREATE_REPLY: {
      const { parentCommentId, reply } = action.payload;

      return produce(state, (draftState) => {
        draftState.comments.filter((comment) => {
          if (comment.id === parentCommentId)
            comment.replies = [...comment.replies, reply];
        });
      });
    }

    default: {
      return state;
    }
  }
}
