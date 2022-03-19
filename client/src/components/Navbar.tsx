import React from "react";
import { Link } from "react-router-dom";
import {
  clearCache,
  fetchPaginatedPosts,
  usePost,
} from "../contexts/Post/actions/PostAction";
import { useUser } from "../contexts/User/actions/UserAction";
import Notifications from "./nested-Components/Notifications";
import UserInfo from "./nested-Components/UserInfo";

interface navbarProps {}

const Navbar: React.FC<navbarProps> = ({}) => {
  const [_, postDispatch] = usePost();
  const [{ user }, userDispatch] = useUser();

  return (
    <div className="nav justify-content-between container align-items-center py-1">
      <div
        role="button"
        className="nav-link active text-dark h2"
        aria-current="page"
      >
        {/* Home */}
        <Link
          to="/"
          style={{ color: "black", textDecoration: "none" }}
          onClick={async () => {
            clearCache(postDispatch);
            fetchPaginatedPosts(postDispatch);
          }}
        >
          <i className="bi bi-reddit text-danger fs-1"></i>
          <span className="text-danger"> Reddit</span>
        </Link>
      </div>

      <div className="d-flex align-items-center">
        {/* CreatePost */}
        <Link to={user ? "/create-post" : "/login"} style={{ color: "black" }}>
          <i className="bi bi-plus-square fs-3 mx-3"></i>
        </Link>

        <Notifications />

        <UserInfo />
      </div>
    </div>
  );
};

export default Navbar;
