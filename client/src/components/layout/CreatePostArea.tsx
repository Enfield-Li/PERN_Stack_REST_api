import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/User/actions/UserAction";

interface searchBarProps {}

const CreatePostArea: React.FC<searchBarProps> = ({}) => {
  const [{ user: userState }] = useUser();
  const navigate = useNavigate();

  return (
    <Link to={userState ? "/create-post" : "/login"} style={{ color: "black" }}>
      <div className="card my-3" role="button">
        <div className="card-body d-flex align-items-center">
          {/* userProfile */}
          {userState ? (
            <Link
              to={`user-profile/${userState.id}`}
              style={{ color: "black" }}
            >
              <div role="button" className="fs-5 ms-2">
                <i className="bi bi-person-circle fs-2"></i>
              </div>
            </Link>
          ) : null}

          {/* createPost */}
          <input
            role="button"
            className=" form-control nput-group-text mx-3"
            placeholder="Create post"
          ></input>

          {/* picture */}
          <i className="bi bi-image fs-3 mx-3" role="button"></i>

          {/* url */}
          <i className="bi bi-link-45deg fs-2" role="button"></i>
        </div>
      </div>
    </Link>
  );
};

export default CreatePostArea;
