import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/User/actions/UserAction";

interface searchBarProps {}

const CreatePostArea: React.FC<searchBarProps> = ({}) => {
  const [{ user }] = useUser();
  const navigate = useNavigate();

  return (
    <div
      className="card my-3"
      role="button"
      onClick={() => {
        navigate("/create-post");
      }}
    >
      <div className="card-body d-flex align-items-center">
        {user ? (
          <div role="button" className="fs-5 ms-2">
            <i className="bi bi-person-circle fs-2"></i>
          </div>
        ) : null}
        <input
          role="button"
          className=" form-control nput-group-text mx-3"
          placeholder="Create post"
        ></input>
        <i className="bi bi-image fs-3 mx-3" role="button"></i>
        <i className="bi bi-link-45deg fs-2" role="button"></i>
      </div>
    </div>
  );
};

export default CreatePostArea;
