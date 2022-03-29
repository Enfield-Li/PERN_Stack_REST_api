import {
  CREATE_COMMENT,
  CREATE_REPLY,
  DELETE_COMMENTS_OR_REPLY,
  EDIT_CURRENT_COMMENT_OR_REPLY,
  FETCH_COMMENTS,
  FETCH_REPLIES,
  VOTE_COMMENT,
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
  parentCommentId: number | null;
  userId: number;
  postId: number;
  user: { username: string };
  commentInteractions?: commentInteractions;
  replies: Replies;
  currentReplies: Replies;
};

export type Replies = Reply[];

export type Reply = Comment & {
  parentComment: {
    username: string;
    userId: number;
  };
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

export type RepliesForCommentId = {
  replies: Replies;
  parentCommentId: number;
};

export type RepliesParentCommentId = { parentCommentId: number };

export type CreateCommentOrReplyType = {
  comment_text: string;
  parentCommentId?: number;
  replyToUserId?: number;
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
  | VoteComment
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

type VoteComment = {
  type: typeof VOTE_COMMENT;
  payload: { commentId: number; voteValue: boolean };
};
