import { useContext } from "react";
import GlobalContext from "../GlobalContext";
import {
  ActionType,
  CreatePostType,
  GlobalState,
  Post,
  User,
  UserCredential,
  UserRegister,
} from "../types/GlobalType";
import {
  ADD_POST,
  DELETE_POST,
  LOGIN_USER,
  LOGOUT_USER,
  SET_CURRENT_POST,
} from "../types/constant";
import axios from "axios";

export const useGlobal = (): [GlobalState, React.Dispatch<ActionType>] => {
  const { state, dispatch } = useContext(GlobalContext);
  return [state, dispatch];
};

export async function registerUser(
  dispatch: React.Dispatch<ActionType>,
  userCredential: UserRegister
) {
  const res = await axios.post<User>(
    "http://localhost:3017/user/register",
    userCredential
  );

  dispatch({
    type: LOGIN_USER,
    payload: res.data,
  });
}

export async function loginUser(
  dispatch: React.Dispatch<ActionType>,
  userCredential: UserCredential
) {
  try {
    const res = await axios.put<User>(
      "http://localhost:3017/user/login",
      userCredential,
      { withCredentials: true } // !!! important !!!
    );

    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function me(dispatch: React.Dispatch<ActionType>) {
  const res = await axios.get<User>("http://localhost:3017/user/me", {
    withCredentials: true,
  });

  dispatch({
    type: LOGIN_USER,
    payload: res.data,
  });
}

export async function logout(dispatch: React.Dispatch<ActionType>) {
  dispatch({
    type: LOGOUT_USER,
  });
  await axios.get("http://localhost:3017/user/logout", {
    withCredentials: true,
  });
}

export function setCurrentPost(
  dispatch: React.Dispatch<ActionType>,
  currentPost: Post
) {
  dispatch({
    type: SET_CURRENT_POST,
    payload: currentPost,
  });
}

export const fetchAllPosts = async () => {
  console.log("fetchPosts...");
  const res = await axios.get<Post[]>("http://localhost:3017/post");
  return res.data;
};

export const fetchSinglePost = async (
  dispatch: React.Dispatch<ActionType>,
  id: number
) => {
  const res = await axios.get<Post>(`http://localhost:3017/post/${id}`);
  console.log("fetchPost...");

  dispatch({
    type: SET_CURRENT_POST,
    payload: res.data,
  });
};

export async function createPost(
  dispatch: React.Dispatch<ActionType>,
  post: CreatePostType
) {
  try {
    const res = await axios.post<Post>("http://localhost:3017/post", post);

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
  dispatch: React.Dispatch<ActionType>,
  id: number
) {
  await axios.delete(`http://localhost:3017/post/${id}`);

  console.log("onDelete...");

  dispatch({
    type: DELETE_POST,
    payload: id,
  });
}

// const setCurrentText = useCallback(
//   (currentField) => {
//     console.log("setCurrentText");
//     dispatch({
//       type: "UPDATE_TEXT",
//       payload: currentField,
//     });
//   },
//   [state.current.text]
// );

// const setCurrentText = useMemo(
//   (currentField) => {
//     console.log("setCurrentText");
//     dispatch({
//       type: "UPDATE_TEXT",
//       payload: currentField,
//     });
//   },
//   [state.current.text]
// );
