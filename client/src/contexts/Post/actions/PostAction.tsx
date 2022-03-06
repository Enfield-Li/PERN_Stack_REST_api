import {
  CREATE_POST,
  DELETE_POST,
  EDIT_CURRENT_POST,
  FETCH_PAGINATED_POSTS,
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

export function setCurrentPost(
  dispatch: React.Dispatch<PostActionType>,
  currentPost: PostAndInteractions
) {
  dispatch({
    type: EDIT_CURRENT_POST,
    payload: currentPost,
  });
}

export const fetchPaginatedPosts = async (
  cursor?: Date,
  dispatch?: React.Dispatch<PostActionType>
) => {
  console.log("fetchPosts...");
  if (cursor && dispatch) {
    const res = await axios.get<PaginatedPost>(
      `http://localhost:3119/post/paginated-posts?cursor=${cursor}`
    );

    dispatch({
      type: FETCH_PAGINATED_POSTS,
      payload: res.data,
    });
  }

  const res = await axios.get<PaginatedPost>(
    "http://localhost:3119/post/paginated-posts"
  );

  return res.data;
};

export const fetchSinglePost = async (
  dispatch: React.Dispatch<PostActionType>,
  id: number
) => {
  console.log("post ID: ", id);
  const res = await axios.get<PostAndInteractions>(
    `http://localhost:3119/post/single-post/${id}`
  );
  console.log("fetchPost...");

  dispatch({
    type: EDIT_CURRENT_POST,
    payload: res.data,
  });
};

export async function createPost(
  dispatch: React.Dispatch<PostActionType>,
  post: CreatePostType
) {
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
  await axios.delete(`http://localhost:3119/post/delete/${id}`);

  console.log("onDelete...");

  dispatch({
    type: DELETE_POST,
    payload: id,
  });
}
