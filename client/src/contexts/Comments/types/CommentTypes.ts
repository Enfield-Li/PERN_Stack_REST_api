import { DELETE_COMMENTS, FETCH_COMMENTS } from "../../constant";

export const commentInitialState: CommentState = {
  comments: null,
};

export type CommentState = {
  comments: Comments | null;
};

export type Comments = Comment[];

export type Comment = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  comment_text: string;
  replyToUserId: number | null;
  parentCommentId: number | null;
  userId: number;
  postId: number;
  user: { username: string };
};

export type CreateCommentOrReplyType = {
  comment_text: string;
  parentCommentId?: number;
  replyToUserId?: number;
};

export type CommentActionType = FetchComments | DeleteComments;

type FetchComments = {
  type: typeof FETCH_COMMENTS;
  payload: Comments;
};

type DeleteComments = {
  type: typeof DELETE_COMMENTS;
  payload: number;
};
