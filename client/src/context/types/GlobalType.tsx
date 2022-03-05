import {
  ADD_POST,
  DELETE_POST,
  FETCH_ALL_POSTS,
  LOGIN_USER,
  LOGOUT_USER,
  SET_CURRENT_POST,
} from "./constant";

export type GlobalState = {
  user: User | null;
  posts: Post[];
  currentPost: Post | null;
};

export const initialState: GlobalState = {
  user: null,
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

export type UserCredential = {
  usernameOrEmail: string;
  password: string;
};

export type UserRegister = {
  username: string;
  password: string;
  email: string;
};

export type User = {
  username: string;
  password: string;
  email: string;
  createdAt: string;
};

// history
export type ActionType =
  | AddPost
  | SetPost
  | DeleteTask
  | FetchAllPosts
  | LoginUser
  | LogoutUser;

type AddPost = {
  type: typeof ADD_POST;
  payload: Post;
};

type FetchAllPosts = {
  type: typeof FETCH_ALL_POSTS;
  payload: Post[];
};

type SetPost = {
  type: typeof SET_CURRENT_POST;
  payload: Post;
};

type DeleteTask = {
  type: typeof DELETE_POST;
  payload: number;
};

type LoginUser = {
  type: typeof LOGIN_USER;
  payload: User;
};

type LogoutUser = {
  type: typeof LOGOUT_USER;
};
