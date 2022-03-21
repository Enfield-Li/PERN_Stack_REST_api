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
} from "../../constant";

export type PostState = {
  paginatedPosts: PaginatedPost;
  currentPost: PostAndInteractions | null;
};

export const postInitialState: PostState = {
  paginatedPosts: { hasMore: false, postAndInteractions: [] },
  currentPost: null,
};

export type TopPostSort = "half-year" | "one-year" | "all-time";

export type PostSorting = "new" | "hot" | "best" | "top";

export type VotingTypes = "vote" | "like" | "laugh" | "confused";

export type PostAndInteractions = {
  post: {
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
  interactions: Interactions;
};

export type PaginatedPost = {
  postAndInteractions: PostAndInteractions[];
  hasMore: boolean;
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

export type PostActionType =
  | AddPost
  | SetPost
  | DeletePost
  | FetchPaginatedPosts
  | ClearCache
  | VotePost
  | LikePost
  | ConfusePost
  | LaughPost;

export type AddPost = {
  type: typeof CREATE_POST;
  payload: PostAndInteractions;
};

export type FetchPaginatedPosts = {
  type: typeof FETCH_PAGINATED_POSTS;
  payload: PaginatedPost;
};

export type SetPost = {
  type: typeof CURRENT_POST;
  payload: PostAndInteractions;
};

export type DeletePost = {
  type: typeof DELETE_POST;
  payload: number;
};

export type ClearCache = {
  type: typeof CLEAR_CACHE;
};

export type VotePost = {
  type: typeof VOTE_POST;
  payload: { id: number; value: boolean };
};

export type LikePost = {
  type: typeof LIKE_POST;
  payload: number;
};

export type LaughPost = {
  type: typeof LAUGHE_POST;
  payload: number;
};

export type ConfusePost = {
  type: typeof CONFUSE_POST;
  payload: number;
};
