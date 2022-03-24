import axios from "axios";
import { useContext } from "react";
import { CREATE_COMMENT, FETCH_COMMENTS, FETCH_REPLIES } from "../../constant";
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

// export const fetchComments = async (
//   postId: string,
//   dispatch: React.Dispatch<CommentActionType>
// ) => {
//   const res = await axios.get<Comments>(
//     `http://localhost:3119/comments/commentsForPost/${postId}`,
//     { withCredentials: true }
//   );

//   dispatch({
//     type: FETCH_COMMENTS,
//   });
// };

export const fetchComments = async (
  postId: number,
  dispatch: React.Dispatch<CommentActionType>
) => {
  const res = await axios.get<Comments>(
    `http://localhost:3119/comments/fetchComments/${postId}`,
    { withCredentials: true }
  );

  dispatch({ type: FETCH_COMMENTS, payload: res.data });
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
  // Create comment
  if (!commentOrReply.parentCommentId && !commentOrReply.replyToUserId) {
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
  const res = await axios.post<Reply>(
    `http://localhost:3119/comments/createCommentOrReply/${postId}`,
    commentOrReply,
    { withCredentials: true }
  );
  

  console.log("create reply: ", res.data);
};
