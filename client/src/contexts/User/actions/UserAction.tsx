import { useContext } from "react";
import UserContext from "../UserContext";
import {
  UserActionType,
  UserState,
  User,
  UserCredential,
  UserRegister,
  UserRO,
} from "../types/UserTypes";
import { LOGIN_USER, LOGOUT_USER } from "../../constant";
import axios from "axios";

export const useUser = (): [UserState, React.Dispatch<UserActionType>] => {
  const { state, dispatch } = useContext(UserContext);
  return [state, dispatch];
};

export async function registerUser(
  dispatch: React.Dispatch<UserActionType>,
  userCredential: UserRegister
) {
  const res = await axios.post<UserRO>(
    "http://localhost:3119/user/register",
    userCredential
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
  try {
    const res = await axios.put<UserRO>(
      "http://localhost:3119/user/login",
      userCredential,
      { withCredentials: true } // !!! important !!!
    );

    dispatch({
      type: LOGIN_USER,
      payload: res.data.user,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function me(dispatch: React.Dispatch<UserActionType>) {
  const res = await axios.get<UserRO>("http://localhost:3119/user/me", {
    withCredentials: true,
  });
  console.log("res.data.user: ", res.data.user);

  dispatch({
    type: LOGIN_USER,
    payload: res.data.user,
  });
}

export async function logout(dispatch: React.Dispatch<UserActionType>) {
  dispatch({
    type: LOGOUT_USER,
  });
  await axios.get("http://localhost:3119/user/logout", {
    withCredentials: true,
  });
}
