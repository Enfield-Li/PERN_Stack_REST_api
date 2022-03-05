import {
  LOGIN_USER,
  LOGOUT_USER,
} from "../../constant";
import { AddPost, SetPost, DeletePost, FetchPaginatedPosts } from "../../Post/types/PostTypes";

export type UserState = {
  user: User | null;
  posts: Post[];
  currentPost: Post | null;
};

export const initialState: UserState = {
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

export type UserRO = {
  user: User;
  errors: ResUserError;
};

export type ResUserError = {
  field: string;
  message: string;
};

// history
export type UserActionType =
  | AddPost
  | SetPost
  | DeletePost
  | FetchPaginatedPosts
  | LoginUser
  | LogoutUser;

type LoginUser = {
  type: typeof LOGIN_USER;
  payload: User;
};

type LogoutUser = {
  type: typeof LOGOUT_USER;
};


