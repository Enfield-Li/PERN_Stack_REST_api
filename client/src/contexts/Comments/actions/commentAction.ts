import axios from "axios";
import { useContext } from "react";
import {
  CREATE_COMMENT,
  CREATE_REPLY,
  DELETE_COMMENTS_OR_REPLY,
  EDIT_CURRENT_COMMENT_OR_REPLY,
  FETCH_COMMENTS,
  FETCH_REPLIES,
} from "../../constant";
import CommentContext from "../CommentContext";
import {
  Comment,
  CommentActionType,
  Comments,
  CreateCommentOrReplyType,
  FindRepliesCondition,
  Replies,
  Reply,
} from "../types/CommentTypes";

export const useComment = () => {
  const { state, dispatch } = useContext(CommentContext);

  return { commentState: state, commentDispatch: dispatch };
};

export const fetchComments = async (
  postId: number,
  dispatch: React.Dispatch<CommentActionType>
) => {
  const res = await axios.get<Comments>(
    `http://localhost:3119/comments/fetchComments/${postId}`,
    { withCredentials: true }
  );

  // Initiate replies
  const data = res.data;
  for (let i = 0; i < data.length; i++) {
    let comment = data[i];
    if (!comment.replies) comment.replies = [];
    comment.currentReplies = [];
  }

  dispatch({ type: FETCH_COMMENTS, payload: data });
};

export const fetchReplies = async (
  postId: number,
  findReplies: FindRepliesCondition,
  dispatch: React.Dispatch<CommentActionType>
) => {
  const res = await axios.put<Replies>(
    `http://localhost:3119/comments/fetchReplies/${postId}`,
    findReplies,
    { withCredentials: true }
  );

  dispatch({
    type: FETCH_REPLIES,
    payload: {
      parentCommentId: findReplies.parentCommentId,
      replies: res.data,
    },
  });
};

export const createCommentOrReply = async (
  postId: number,
  commentOrReply: CreateCommentOrReplyType,
  dispatch: React.Dispatch<CommentActionType>
) => {
  const { parentCommentId, replyToUserId, replyToUsername } = commentOrReply;

  // Create comment
  if (!parentCommentId && !replyToUserId) {
    const res = await axios.post<Comment>(
      `http://localhost:3119/comments/createCommentOrReply/${postId}`,
      commentOrReply,
      { withCredentials: true }
    );

    dispatch({
      type: CREATE_COMMENT,
      payload: res.data,
    });
  }

  // Create reply
  else if (parentCommentId && replyToUserId) {
    const res = await axios.post<Reply>(
      `http://localhost:3119/comments/createCommentOrReply/${postId}`,
      commentOrReply,
      { withCredentials: true }
    );

    if (replyToUsername) res.data.replyToUser = { username: replyToUsername };

    dispatch({
      type: CREATE_REPLY,
      payload: {
        reply: res.data,
        parentCommentId,
      },
    });
  }
};

export const editCommentOrReply = async (
  currentCommentOrReplyId: number,
  comment_text: string,
  dispatch: React.Dispatch<CommentActionType>,
  parentCommentId?: number
) => {
  await axios.patch(
    `http://localhost:3119/comments/updateComment/${currentCommentOrReplyId}`,
    { comment_text },
    { withCredentials: true }
  );

  dispatch({
    type: EDIT_CURRENT_COMMENT_OR_REPLY,
    payload: { comment_text, currentCommentOrReplyId, parentCommentId },
  });
};

export const voteComment = async (commentId: number, voteValue: boolean) => {
  const res = await axios.get(
    `http://localhost:3119/interactions/interact/comment/${commentId}?voteValue=${voteValue}`,
    { withCredentials: true }
  );

  console.log(res);
};

export const deleteCommentOrReply = async (
  currentCommentOrReplyId: number,
  dispatch: React.Dispatch<CommentActionType>,
  parentCommentId?: number
) => {
  // await axios.delete(
  //   `http://localhost:3119/comments/deleteComment/${currentCommentOrReplyId}`,
  //   { withCredentials: true }
  // );

  dispatch({
    type: DELETE_COMMENTS_OR_REPLY,
    payload: { currentCommentOrReplyId, parentCommentId },
  });
};
