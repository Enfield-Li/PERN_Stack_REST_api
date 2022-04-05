import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/User/actions/UserAction";

interface searchBarProps {}

const CreatePostArea: React.FC<searchBarProps> = ({}) => {
  const { userState } = useUser();
  const navigate = useNavigate();

  const { user } = userState;

  return (
    <div className="card my-3">
      <div className="card-body d-flex align-items-center">
        {/* userProfile */}
        {user ? (
          <div
            role="button"
            className="fs-5 ms-2"
            onClick={() => {
              navigate(`user-profile/${user.id}`);
            }}
          >
            <i className="bi bi-person-circle fs-2"></i>
          </div>
        ) : null}

        {/* createPost */}
        <input
          role="button"
          className=" form-control nput-group-text mx-3"
          placeholder="Create post"
          onClick={() => {
            if (!user) {
              navigate("/login");
              return;
            }

            navigate("/create-post");
          }}
        ></input>

        {/* picture */}
        <i
          className="bi bi-image fs-3 me-2"
          onClick={() => {
            if (!user) {
              navigate("/login");
              return;
            }

            navigate("/create-post");
          }}
          role="button"
        ></i>

        {/* url */}
        <i
          className="bi bi-link-45deg fs-2"
          onClick={() => {
            if (!user) {
              navigate("/login");
              return;
            }

            navigate("/create-post");
          }}
          role="button"
        ></i>
      </div>
    </div>
  );
};

export default CreatePostArea;
