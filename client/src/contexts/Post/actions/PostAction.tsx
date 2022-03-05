import { ADD_POST, DELETE_POST, SET_CURRENT_POST } from "../../constant";
import axios from "axios";
import {
  CreatePostType,
  Post,
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
  currentPost: Post
) {
  dispatch({
    type: SET_CURRENT_POST,
    payload: currentPost,
  });
}

export const fetchAllPosts = async () => {
  console.log("fetchPosts...");
  const res = await axios.get<Post[]>(
    "http://localhost:3119/post/paginated-posts"
  );
  return res.data;
};

export const fetchSinglePost = async (
  dispatch: React.Dispatch<PostActionType>,
  id: number
) => {
  const res = await axios.get<Post>(`http://localhost:3119/post/${id}`);
  console.log("fetchPost...");

  dispatch({
    type: SET_CURRENT_POST,
    payload: res.data,
  });
};

export async function createPost(
  dispatch: React.Dispatch<PostActionType>,
  post: CreatePostType
) {
  try {
    const res = await axios.post<Post>(
      "http://localhost:3119/post/create-post",
      post
    );

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
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
