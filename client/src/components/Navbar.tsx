import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  clearCache,
  fetchPaginatedPosts,
  usePost,
} from "../contexts/Post/actions/PostAction";
import { logout, useUser } from "../contexts/User/actions/UserAction";

interface navbarProps {}

const Navbar: React.FC<navbarProps> = ({}) => {
  const [, postDispatch] = usePost();
  const [{ user }, userDispatch] = useUser();
  console.log("user: ", user);

  let userProfile = user ? (
    <div className="dropdown">
      <div
        className="dropdown-toggle border px-3 py-1 my-2 d-flex justify-content-center align-items-center"
        role="button"
        id="dropdownMenuButton1"
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
      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuButton1"
        style={{ width: 242 }}
      >
        <li>
          <div className="ms-3">MY STUFF</div>
          <div className="dropdown-item">
            <div role="button" className="text-dark">
              <i className="bi bi-person-circle fs-5 me-2"></i> Profile
            </div>
          </div>
          <div
            className="dropdown-item"
            role="button"
            onClick={async () => {
              await logout(userDispatch);
            }}
          >
            <i className="bi bi-box-arrow-right fs-5 me-2"></i> Logout
          </div>
        </li>
      </ul>
    </div>
  ) : (
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
  );

  return (
    <div className="nav justify-content-between container align-items-center">
      <div
        role="button"
        className="nav-link active text-dark h2"
        aria-current="page"
        onClick={async () => {
          clearCache(postDispatch);
          await fetchPaginatedPosts(postDispatch);
        }}
      >
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          Home
        </Link>
      </div>

      <div className="d-flex align-items-center">
        <Link to="/create-post" style={{ color: "black" }}>
          <i className="bi bi-plus-square fs-3 mx-3" role="button"></i>
        </Link>
        <div>{userProfile}</div>
      </div>
    </div>
  );
};

export default Navbar;
