import {
  CLEAR_CACHE,
  CREATE_POST,
  DELETE_POST,
  CURRENT_POST,
  FETCH_PAGINATED_POSTS,
  VOTE_POST,
  CONFUSE_POST,
  LAUGHE_POST,
  LIKE_POST,
} from "../../constant";
import axios from "axios";
import {
  CreatePostType,
  PaginatedPost,
  PostAndInteractions,
  PostActionType,
  PostState,
} from "../types/PostTypes";
import PostContext from "../PostContext";
import { useContext } from "react";

export const usePost = (): [PostState, React.Dispatch<PostActionType>] => {
  const { state, dispatch } = useContext(PostContext);
  return [state, dispatch];
};

export async function interactWithPost(
  dispatch: React.Dispatch<PostActionType>,
  id: number,
  value: boolean,
  field: "vote" | "like" | "laugh" | "confused"
) {
  await axios.get<boolean>(
    `http://localhost:3119/post/interact/${id}?value=${value}&field=${field}`,
    { withCredentials: true }
  );

  if (field === "vote") {
    dispatch({
      type: VOTE_POST,
      payload: { id, value },
    });
  }

  if (field === "like") {
    dispatch({
      type: LIKE_POST,
      payload: id,
    });
  }

  if (field === "laugh") {
    dispatch({
      type: LAUGHE_POST,
      payload: id,
    });
  }

  if (field === "confused") {
    dispatch({
      type: CONFUSE_POST,
      payload: id,
    });
  }
}

export function setCurrentPost(
  dispatch: React.Dispatch<PostActionType>,
  currentPost: PostAndInteractions
) {
  console.log("set current post...");
  dispatch({
    type: CURRENT_POST,
    payload: currentPost,
  });
}

export const fetchPaginatedPosts = async (
  dispatch: React.Dispatch<PostActionType>,
  cursor?: Date
) => {
  console.log("fetchPaginatedPosts...");
  if (cursor) {
    const res = await axios.get<PaginatedPost>(
      `http://localhost:3119/post/paginated-posts?cursor=${cursor}`,
      { withCredentials: true }
    );

    dispatch({
      type: FETCH_PAGINATED_POSTS,
      payload: res.data,
    });
  } else {
    const res = await axios.get<PaginatedPost>(
      "http://localhost:3119/post/paginated-posts",
      { withCredentials: true }
    );

    dispatch({
      type: FETCH_PAGINATED_POSTS,
      payload: res.data,
    });
  }
};

export const clearCache = (dispatch: React.Dispatch<PostActionType>) => {
  console.log("clear cache...");
  dispatch({
    type: CLEAR_CACHE,
  });
};

export const fetchSinglePost = async (
  dispatch: React.Dispatch<PostActionType>,
  id: number
) => {
  console.log("fetchSinglePost...");
  const res = await axios.get<PostAndInteractions>(
    `http://localhost:3119/post/single-post/${id}`,
    {
      withCredentials: true,
    }
  );

  dispatch({
    type: CURRENT_POST,
    payload: res.data,
  });
};

export async function createPost(
  dispatch: React.Dispatch<PostActionType>,
  post: CreatePostType
) {
  console.log("create post...");

  try {
    const res = await axios.post<PostAndInteractions>(
      "http://localhost:3119/post/create-post",
      post,
      { withCredentials: true }
    );
    console.log(res.data);

    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });

    // return created post data
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function deletePost(
  dispatch: React.Dispatch<PostActionType>,
  id: number
) {
  console.log("delete post...");
  await axios.delete(`http://localhost:3119/post/delete/${id}`, {
    withCredentials: true,
  });

  dispatch({
    type: DELETE_POST,
    payload: id,
  });
}
