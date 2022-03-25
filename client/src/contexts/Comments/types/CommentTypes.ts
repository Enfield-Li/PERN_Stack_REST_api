import {
  CREATE_COMMENT,
  DELETE_COMMENTS,
  FETCH_COMMENTS,
  FETCH_REPLIES,
} from "../../constant";

export const commentInitialState: CommentState = {
  comments: [],
};

export type CommentState = {
  comments: Comments;
};

export type Comments = Comment[];

export type Comment = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  comment_text: string;
  replyAmount: number;
  replyToUserId: number | null;
  parentCommentId: number | null;
  userId: number;
  postId: number;
  user: { username: string };
  replies: Reply[];
  replyToUser?: { username: string };
};

export type Replies = Reply[];
export type RepliesForCommentId = {
  replies: Replies;
  parentCommentId: number;
};

export type Reply = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  comment_text: string;
  replyAmount: number;
  replyToUserId: number | null;
  parentCommentId: number | null;
  userId: number;
  postId: number;
  user: { username: string };
  replyToUser: { username: string };
};

export type RepliesParentCommentId = { parentCommentId: number };

export type CreateCommentOrReplyType = {
  comment_text: string;
  parentCommentId?: number;
  replyToUserId?: number;
};

export type FindRepliesCondition = {
  parentCommentId: number;
  replyToUserId: number;
};

export type CommentActionType =
  | FetchComments
  | DeleteComments
  | CreateComment
  | FetchReplies;

type FetchComments = {
  type: typeof FETCH_COMMENTS;
  payload: Comments;
};

type DeleteComments = {
  type: typeof DELETE_COMMENTS;
  payload: number;
};

type CreateComment = {
  type: typeof CREATE_COMMENT;
  payload: Comment;
};

type FetchReplies = {
  type: typeof FETCH_REPLIES;
  payload: RepliesForCommentId;
};
