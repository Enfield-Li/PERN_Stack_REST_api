import {
  CONFUSE_CURRENT_POST,
  CONFUSE_POST,
  LAUGHE_CURRENT_POST,
  LAUGHE_POST,
  LIKE_CURRENT_POST,
  LIKE_POST,
  LOGIN_USER,
  LOGOUT_USER,
  USER_PROFILE,
  VOTE_CURRENT_POST,
  VOTE_POST,
} from "../../constant";
import { PaginatedPost, PostAndInteractions } from "../../Post/types/PostTypes";

export type UserState = {
  user: User | null;
  userProfile: UserProfileRO | null;
};

export const userInitialState: UserState = {
  user: null,
  userProfile: null,
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

export type UserActionType =
  | LoginUser
  | LogoutUser
  | GetUserProfile
  | VotePost
  | LikePost
  | ConfusePost
  | LaughPost;

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

export type VotePost = {
  type: typeof VOTE_CURRENT_POST;
  payload: { id: number; value: boolean };
};

export type LikePost = {
  type: typeof LIKE_CURRENT_POST;
  payload: number;
};

export type LaughPost = {
  type: typeof LAUGHE_CURRENT_POST;
  payload: number;
};

export type ConfusePost = {
  type: typeof CONFUSE_CURRENT_POST;
  payload: number;
};
