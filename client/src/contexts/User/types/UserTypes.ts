import { LOGIN_USER, LOGOUT_USER } from "../../constant";
import {
  AddPost,
  SetPost,
  DeletePost,
  FetchPaginatedPosts,
} from "../../Post/types/PostTypes";

export type UserState = {
  user: User | null;
};

export const userInitialState: UserState = {
  user: null,
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

export type UserActionType = LoginUser | LogoutUser;

type LoginUser = {
  type: typeof LOGIN_USER;
  payload: User;
};

type LogoutUser = {
  type: typeof LOGOUT_USER;
};
