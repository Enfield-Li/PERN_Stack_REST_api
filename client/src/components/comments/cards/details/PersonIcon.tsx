import React from "react";
import { useNavigate } from "react-router-dom";

interface PersonIconProps {
  userId: number;
}

const PersonIcon: React.FC<PersonIconProps> = ({ userId }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/user-profile/${userId}`)} role="button">
      <i className="bi bi-person fs-1 me-2"></i>
    </div>
  );
};

export default PersonIcon;
