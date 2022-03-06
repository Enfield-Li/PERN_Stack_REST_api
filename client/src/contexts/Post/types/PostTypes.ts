import {
  CREATE_POST,
  DELETE_POST,
  FETCH_PAGINATED_POSTS,
  EDIT_CURRENT_POST,
} from "../../constant";

export type PostState = {
  paginatedPosts: PaginatedPost;
  currentPost: Post | null;
};

export const postInitialState: PostState = {
  paginatedPosts: { hasMore: null, posts: [] },
  currentPost: null,
};

export type PaginatedPost = {
  posts: Post[];
  hasMore: boolean | null;
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
};

export type CreatePostType = {
  title: string;
  content: string;
};

export type PostActionType =
  | AddPost
  | SetPost
  | DeletePost
  | FetchPaginatedPosts;

export type AddPost = {
  type: typeof CREATE_POST;
  payload: Post;
};
export type FetchPaginatedPosts = {
  type: typeof FETCH_PAGINATED_POSTS;
  payload: PaginatedPost;
};
export type SetPost = {
  type: typeof EDIT_CURRENT_POST;
  payload: Post;
};
export type DeletePost = {
  type: typeof DELETE_POST;
  payload: number;
};
