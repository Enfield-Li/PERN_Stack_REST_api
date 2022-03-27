import React from "react";
import { useNavigate } from "react-router-dom";
import { calculateTime } from "../../../../utils/calculaTime";

interface UserCommentProps {
  userId: number;
  username: string;
  createdAt: Date;
}

const UserCommentInfo: React.FC<UserCommentProps> = ({
  username,
  userId,
  createdAt,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/user-profile/${userId}`)}
      role="button"
      className="w-25"
    >
      {username}
      <span className="text-muted fs-6">
        {" "}
        · {calculateTime(createdAt, true)}
      </span>
    </div>
  );
};

export default UserCommentInfo;
