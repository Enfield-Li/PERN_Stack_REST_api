import axios from "axios";
import { Comments, CreateCommentOrReplyType } from "../types/CommentTypes";

export const fetchComments = async (postId: string) => {
  const res = await axios.get<Comments>(
    `http://localhost:3119/comments/commentsForPost/${postId}`,
    { withCredentials: true }
  );

  return res.data;
};

export const createCommentOrReply = async (
  postId: string,
  commentOrReply: CreateCommentOrReplyType
) => {
  const res = await axios.post<Comments>(
    `http://localhost:3119/comments/createCommentOrReply/${postId}`,
    commentOrReply,
    { withCredentials: true }
  );

  return res.data;
};
