import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  interactWithPost,
  usePost,
} from "../../contexts/Post/actions/PostAction";
import { PostAndInteractions } from "../../contexts/Post/types/PostTypes";
import { useUser } from "../../contexts/User/actions/UserAction";

interface VoteSectionProps {
  post: PostAndInteractions;
}

const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  const location = useLocation();
  const [_, postDispatch] = usePost();
  const [userState] = useUser();
  const navigate = useNavigate();

  let path = "";
  if (location.pathname.includes("post")) {
    path = `post/${post.id}`;
  }

  return (
    <div className="me-3 mt-2">
      <button
        className={`bi bi-caret-up btn ${
          post.user.interactions?.voteStatus === true ? "bg-info" : ""
        }`}
        onClick={async () => {
          if (!userState.user) {
            navigate("/login");
            return;
          }

          await interactWithPost(postDispatch, post.id, true, "vote");
          return;
        }}
      />
      <div className="text-center">{post.votePoints}</div>
      <button
        className={`bi bi-caret-down btn  ${
          post.user.interactions?.voteStatus === false ? "bg-danger" : ""
        }`}
        onClick={async () => {
          if (!userState.user) {
            navigate("/login");
            return;
          }

          await interactWithPost(postDispatch, post.id, false, "vote");
          return;
        }}
      />
    </div>
  );
};

export default VoteSection;
