import { LOGIN_USER, LOGOUT_USER, USER_PROFILE } from "../../constant";
import { PaginatedPost, PostAndInteractions } from "../../Post/types/PostTypes";

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
  id: number;
  username: string;
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

export type UserProfileRO = {
  user: User;
  userPaginatedPost: PaginatedPost;
};

export type UserActionType = LoginUser | LogoutUser | GetUserProfile;

type LoginUser = {
  type: typeof LOGIN_USER;
  payload: User;
};

type LogoutUser = {
  type: typeof LOGOUT_USER;
};

type GetUserProfile = {
  type: typeof USER_PROFILE;
  payload: UserProfileRO;
};
