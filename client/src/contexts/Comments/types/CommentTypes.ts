import {
  CREATE_COMMENT,
  CREATE_REPLY,
  DELETE_COMMENTS_OR_REPLY,
  EDIT_CURRENT_COMMENT_OR_REPLY,
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
  isReply: boolean;
  currentReplies: Reply[];
  commentInteractions?: commentInteractions;
};

type commentInteractions = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  voteStatus: boolean | null;
  upvoteAmount: number;
  downvoteAmount: number;
  commentId: number;
  userId: number;
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
  isReply: boolean;
  commentInteractions?: commentInteractions[];
};

export type RepliesParentCommentId = { parentCommentId: number };

export type CreateCommentOrReplyType = {
  isReply: boolean;
  comment_text: string;
  parentCommentId?: number;
  replyToUserId?: number;
  replyToUsername?: string;
};

export type FindRepliesCondition = {
  parentCommentId: number;
};

type CurrentComment = {
  comment_text: string;
  currentCommentOrReplyId: number;
  parentCommentId?: number;
};

type DeleteCommentOrReply = {
  currentCommentOrReplyId: number;
  parentCommentId?: number;
};

export type CommentActionType =
  | FetchComments
  | DeleteComments
  | CreateComment
  | CreateReply
  | FetchReplies
  | EditCurrentComment;

type FetchComments = {
  type: typeof FETCH_COMMENTS;
  payload: Comments;
};

type DeleteComments = {
  type: typeof DELETE_COMMENTS_OR_REPLY;
  payload: DeleteCommentOrReply;
};

type CreateComment = {
  type: typeof CREATE_COMMENT;
  payload: Comment;
};

type FetchReplies = {
  type: typeof FETCH_REPLIES;
  payload: RepliesForCommentId;
};

type CreateReply = {
  type: typeof CREATE_REPLY;
  payload: { reply: Reply; parentCommentId: number };
};

type EditCurrentComment = {
  type: typeof EDIT_CURRENT_COMMENT_OR_REPLY;
  payload: CurrentComment;
};
