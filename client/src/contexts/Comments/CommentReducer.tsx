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

        draftState.comments.forEach((comment) => {
          if (comment.id === parentCommentId) {
            comment.replies = replies;
          }
        });
      });
    }

    case CREATE_REPLY: {
      const { parentCommentId, reply } = action.payload;

      return produce(state, (draftState) => {
        draftState.comments.forEach((comment) => {
          if (comment.id === parentCommentId) {
            // When data exist, push the new reply
            if (comment.replies.length)
              comment.replies = [...comment.replies, reply];

            // User current gen reply
            comment.currentReplies.push(reply);
          }
        });
      });
    }

    default: {
      return state;
    }
  }
}
