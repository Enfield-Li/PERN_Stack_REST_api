import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  interactWithPost,
  usePost,
} from "../../contexts/Post/actions/PostAction";
import { PostAndInteractions } from "../../contexts/Post/types/PostTypes";
import { useUser } from "../../contexts/User/actions/UserAction";

interface VoteSectionProps {
  postAndInteractions: PostAndInteractions;
}

const VoteSection: React.FC<VoteSectionProps> = ({ postAndInteractions }) => {
  const [_, postDispatch] = usePost();
  const [userState] = useUser();
  const navigate = useNavigate();

  return (
    <div className="me-3 mt-2">
      <button
        className={`bi bi-caret-up btn ${
          postAndInteractions.interactions?.voteStatus === true ? "bg-info" : ""
        }`}
        onClick={async () => {
          if (!userState.user) {
            navigate("/login");
            return;
          }

          await interactWithPost(
            postDispatch,
            postAndInteractions.post.id,
            true,
            "vote"
          );
          return;
        }}
      />
      <div className="text-center">{postAndInteractions.post.votePoints}</div>
      <button
        className={`bi bi-caret-down btn  ${
          postAndInteractions.interactions?.voteStatus === false
            ? "bg-danger"
            : ""
        }`}
        onClick={async () => {
          if (!userState.user) {
            navigate("/login");
            return;
          }

          await interactWithPost(
            postDispatch,
            postAndInteractions.post.id,
            false,
            "vote"
          );
          return;
        }}
      />
    </div>
  );
};

export default VoteSection;
