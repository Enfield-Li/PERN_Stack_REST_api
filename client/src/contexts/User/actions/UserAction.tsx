import axios, { AxiosResponse } from "axios";
import { useContext } from "react";
import { interactionNullCheckAndPopulateData } from "../../../utils/populateWithMockData";
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
import {
  UserActionType,
  UserCredential,
  UserProfileRO,
  UserRegister,
  UserRO,
  UserState,
} from "../types/UserTypes";
import UserContext from "../UserContext";

export const useUser = (): [UserState, React.Dispatch<UserActionType>] => {
  const { state, dispatch } = useContext(UserContext);
  return [state, dispatch];
};

export async function registerUser(
  dispatch: React.Dispatch<UserActionType>,
  userCredential: UserRegister
) {
  console.log("register User...");
  const res = await axios.post<UserRO>(
    "http://localhost:3119/user/register",
    userCredential,
    { withCredentials: true }
  );

  dispatch({
    type: LOGIN_USER,
    payload: res.data.user,
  });
}

export async function loginUser(
  dispatch: React.Dispatch<UserActionType>,
  userCredential: UserCredential
) {
  console.log("login User...");

  const res = await axios.put<UserRO>(
    "http://localhost:3119/user/login",
    userCredential,
    { withCredentials: true }
  );

  if (res.data.user) {
    dispatch({
      type: LOGIN_USER,
      payload: res.data.user,
    });
  } else if (res.data.errors) {
    return res.data.errors;
  }
}

export async function me(dispatch: React.Dispatch<UserActionType>) {
  console.log("me...");
  const res = await axios.get<UserRO>("http://localhost:3119/user/me", {
    withCredentials: true,
  });

  dispatch({
    type: LOGIN_USER,
    payload: res.data.user,
  });
}

export async function getUserProfile(
  dispatch: React.Dispatch<UserActionType>,
  id: number,
  cursor?: Date
) {
  console.log("getUserProfile...");

  let res: AxiosResponse<UserProfileRO, any> | null = null;

  if (cursor) {
    res = await axios.get<UserProfileRO>(
      `http://localhost:3119/user/profile/${id}?cursor=${cursor}`,
      { withCredentials: true }
    );
  } else {
    res = await axios.get<UserProfileRO>(
      `http://localhost:3119/user/profile/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: CLEAR_CACHE,
    });
  }

  interactionNullCheckAndPopulateData(
    res.data.userPaginatedPost.postAndInteractions
  );

  dispatch({
    type: USER_PROFILE,
    payload: res.data,
  });
}

export async function interactWithPostFromUserProfile(
  dispatch: React.Dispatch<UserActionType>,
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
      type: VOTE_CURRENT_POST,
      payload: { id, value },
    });
  }

  if (field === "like") {
    dispatch({
      type: LIKE_CURRENT_POST,
      payload: id,
    });
  }

  if (field === "laugh") {
    dispatch({
      type: LAUGH_CURRENT_POST,
      payload: id,
    });
  }

  if (field === "confused") {
    dispatch({
      type: CONFUSE_CURRENT_POST,
      payload: id,
    });
  }
}

export async function logout(dispatch: React.Dispatch<UserActionType>) {
  console.log("logout...");
  dispatch({
    type: LOGOUT_USER,
  });
  await axios.get("http://localhost:3119/user/logout", {
    withCredentials: true,
  });
}
