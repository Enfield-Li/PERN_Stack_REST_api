import moment from "moment";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../contexts/User/types/UserTypes";

interface ProfileCardProps {
  user: User | undefined;
  isMe?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, isMe }) => {
  const navigate = useNavigate();

  if (!user) return <div>User does not exist..</div>;
  const cackeDate = moment(user.createdAt).format("YYYY/MM/DD");

  return (
    <div className="card mt-2" style={{ width: 300 }}>
      <div className="card-body">
        {/* Username and email */}
        <div className="d-flex flex-column align-items-center">
          <div
            className="card-title fs-3"
            role="button"
            onClick={() => navigate(`/user-profile/${user.id}`)}
          >
            {user.username}
          </div>
          <div>{user.email && user.email}</div>
        </div>

        <div className="card-text my-2">
          <div className="row">
            {/* Posts amount */}
            <div className="col-5 ms-1">
              <div>📘 Amount:</div>
              <div>{user.postAmounts} posts </div>
            </div>

            {/* Cacke day */}
            <div className="col-6">
              <div>🎂 Cake day:</div>
              <div>{cackeDate}</div>
            </div>
          </div>
        </div>

        {/* Create post button */}
        {isMe && (
          <Link to="/create-post">
            <div role="button" className="btn btn-primary col-12 mt-1">
              Crete post
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
export default ProfileCard;
