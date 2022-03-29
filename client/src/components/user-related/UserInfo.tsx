import React from "react";
import { Link } from "react-router-dom";
import {
  usePost,
  clearPostsCache,
  fetchPaginatedPosts,
} from "../../contexts/Post/actions/PostAction";
import {
  useSocket,
  clearNotifications,
  logoutSocket,
} from "../../contexts/SocketIo/actions/socketActions";
import { useUser, logout } from "../../contexts/User/actions/UserAction";

import Notifications from "../activities/Notifications";

interface UserInfoProps {}

const UserInfo: React.FC<UserInfoProps> = ({}) => {
  const { postDispatch } = usePost();
  const { userState, userDispatch } = useUser();
  const { user } = userState;
  const { socketDispatch, setUncheckedAmount, socket } = useSocket();

  const logoutAndClearCache = () => {
    logoutSocket(socket, user?.id);
    clearPostsCache(postDispatch);
    clearNotifications(socketDispatch);
    setUncheckedAmount(0);
    logout(userDispatch);
    setTimeout(() => {
      // Prevent fetch posts before clearing cache
      fetchPaginatedPosts(postDispatch);
    }, 1);
  };

  return (
    <div>
      {user ? (
        //   User is loged in
        <div className="d-flex justify-content-center align-items-center">
          <Notifications />

          {/* dropDown userInfo */}
          <div className="dropdown">
            <div
              className="dropdown-toggle border px-3 py-1 my-2 d-flex justify-content-center align-items-center"
              role="button"
              id="dropDowns"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle fs-2"></i>
              <div className="ms-3 me-2 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <i className="bi bi-bookmark-star me-1"></i>
                  {user.username}
                </div>
                <div>{user.email}</div>
              </div>
            </div>

            {/* dropDowns */}
            <ul
              className="dropdown-menu"
              aria-labelledby="dropDowns"
              style={{ width: 240 }}
            >
              <li>
                <div className="ms-3">MY STUFF</div>

                {/* Profile */}
                <Link
                  to={`/user-profile/${user.id}`}
                  style={{ color: "black", textDecoration: "none" }}
                  role="button"
                >
                  <div className="dropdown-item">
                    <i className="bi bi-person-circle fs-5 me-2"></i> Profile
                  </div>
                </Link>

                {/* LogOut */}
                <div
                  className="dropdown-item"
                  role="button"
                  onClick={async () => logoutAndClearCache()}
                >
                  <i className="bi bi-box-arrow-right fs-5 me-2"></i> Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        //   user is not loged in
        <div className="d-flex align-items-center">
          <div className="mx-3 fs-5">
            <Link to="/login" style={{ color: "black" }}>
              Login
            </Link>
          </div>

          <div className="mx-3 fs-5">
            <Link to="/register" style={{ color: "black" }}>
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
