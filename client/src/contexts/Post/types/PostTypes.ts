import {
  ADD_POST,
  DELETE_POST,
  FETCH_ALL_POSTS, SET_CURRENT_POST
} from "../../constant";
import { Post } from "../../User/types/UserTypes";

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
