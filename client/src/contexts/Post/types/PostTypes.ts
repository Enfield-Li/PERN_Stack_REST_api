import {
  CREATE_POST,
  DELETE_POST,
  FETCH_PAGINATED_POSTS,
  EDIT_CURRENT_POST,
} from "../../constant";

export type PostState = {
  paginatedPosts: PaginatedPost;
  currentPost: PostAndInteractions | null;
};

export const postInitialState: PostState = {
  paginatedPosts: { hasMore: null, postAndInteractions: [] },
  currentPost: null,
};

export type PaginatedPost = {
  postAndInteractions: PostAndInteractions[];
  hasMore: boolean | null;
};

export type PostAndInteractions = {
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
    username: string;
    interactions?: interactions;
  };
};

type interactions = {
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
  | FetchPaginatedPosts;

export type AddPost = {
  type: typeof CREATE_POST;
  payload: PostAndInteractions;
};

export type FetchPaginatedPosts = {
  type: typeof FETCH_PAGINATED_POSTS;
  payload: PaginatedPost;
};

export type SetPost = {
  type: typeof EDIT_CURRENT_POST;
  payload: PostAndInteractions;
};

export type DeletePost = {
  type: typeof DELETE_POST;
  payload: number;
};
