import {
  ADD_POST,
  DELETE_POST,
  FETCH_ALL_POSTS,
  SET_CURRENT_POST,
} from "../../constant";

export type PostState = {
  posts: Post[];
  currentPost: Post | null;
};

export const postInitialState: PostState = {
  posts: [],
  currentPost: null,
};

export type Post = {
  title: string;
  content: string;
  createdAt: string;
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
  | FetchPaginatedPosts;

export type AddPost = {
  type: typeof ADD_POST;
  payload: Post;
};
export type FetchPaginatedPosts = {
  type: typeof FETCH_ALL_POSTS;
  payload: Post[];
};
export type SetPost = {
  type: typeof SET_CURRENT_POST;
  payload: Post;
};
export type DeletePost = {
  type: typeof DELETE_POST;
  payload: number;
};
