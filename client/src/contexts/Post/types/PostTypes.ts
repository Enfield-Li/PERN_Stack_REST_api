import {
  CREATE_POST,
  DELETE_POST,
  FETCH_PAGINATED_POSTS,
  CURRENT_POST,
  CLEAR_CACHE,
  VOTE_POST,
  LIKE_POST,
  LAUGHE_POST,
  CONFUSE_POST,
  POSTS_IN_SEARCH,
} from "../../constant";

export type PostState = {
  paginatedPosts: PaginatedPost;
  currentPost: PostAndInteractions | null;
  postsInSearch: Post[];
};

export const postInitialState: PostState = {
  paginatedPosts: { hasMore: false, postAndInteractions: [] },
  currentPost: null,
  postsInSearch: [],
};

export type PaginatedPost = {
  postAndInteractions: PostAndInteractions[];
  hasMore: boolean;
};

export type PostAndInteractions = {
  post: Post;
  interactions: Interactions | null;
};

export type Post = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string | null;
  userId: number;
  viewCount: number;
  votePoints: number;
  likePoints: number;
  confusedPoints: number;
  laughPoints: number;
  user: {
    id: number;
    username: string;
  };
};

export type Interactions = {
  voteStatus: boolean | null;
  likeStatus: boolean | null;
  laughStatus: boolean | null;
  confusedStatus: boolean | null;
  createdAt: Date;
  userId: number;
  postId: number;
};

export type CreatePostType = {
  title: string;
  content: string;
};

export type SortPostWithTop = "half-year" | "one-year" | "all-time";

export type PostSorting = "new" | "hot" | "best" | "top";

export type VotingTypes = "vote" | "like" | "laugh" | "confused";

export type FindReply = { parentCommentId: number };

export type PostActionType =
  | AddPost
  | SetPost
  | DeletePost
  | FetchPaginatedPosts
  | ClearCache
  | VotePost
  | LikePost
  | ConfusePost
  | SearchPosts
  | LaughPost;

type AddPost = {
  type: typeof CREATE_POST;
  payload: PostAndInteractions;
};

type FetchPaginatedPosts = {
  type: typeof FETCH_PAGINATED_POSTS;
  payload: PaginatedPost;
};

type SetPost = {
  type: typeof CURRENT_POST;
  payload: PostAndInteractions;
};

type DeletePost = {
  type: typeof DELETE_POST;
  payload: number;
};

type ClearCache = {
  type: typeof CLEAR_CACHE;
};

type VotePost = {
  type: typeof VOTE_POST;
  payload: { id: number; value: boolean };
};

type LikePost = {
  type: typeof LIKE_POST;
  payload: number;
};

type LaughPost = {
  type: typeof LAUGHE_POST;
  payload: number;
};

type ConfusePost = {
  type: typeof CONFUSE_POST;
  payload: number;
};

type SearchPosts = {
  type: typeof POSTS_IN_SEARCH;
  payload: Post[];
};
