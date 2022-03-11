import {
  CLEAR_CACHE,
  CONFUSE_CURRENT_POST,
  LAUGH_CURRENT_POST,
  LIKE_CURRENT_POST,
  LOGIN_USER,
  LOGOUT_USER,
  USER_PROFILE,
  VOTE_CURRENT_POST,
} from "../../constant";
import { Interactions } from "../../Post/types/PostTypes";

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
  postAmounts: number;
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
  userPaginatedPost: UserPaginatedPost;
};

export type UserPaginatedPost = {
  postAndInteractions: UserPostAndInteractions[];
  hasMore: boolean;
};

export type UserPostAndInteractions = {
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
    user: null;
  };
  interactions: Interactions;
};

export type UserActionType =
  | LoginUser
  | LogoutUser
  | GetUserProfile
  | VotePost
  | LikePost
  | ConfusePost
  | LaughPost
  | ClearUserCache;

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
  type: typeof LAUGH_CURRENT_POST;
  payload: number;
};

export type ConfusePost = {
  type: typeof CONFUSE_CURRENT_POST;
  payload: number;
};

export type ClearUserCache = {
  type: typeof CLEAR_CACHE;
};
