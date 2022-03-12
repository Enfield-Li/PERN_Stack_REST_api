import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  interactWithPost,
  usePost,
} from "../../contexts/Post/actions/PostAction";
import { PostAndInteractions } from "../../contexts/Post/types/PostTypes";
import {
  interactWithPostFromUserProfile,
  useUser,
} from "../../contexts/User/actions/UserAction";
import { UserPostAndInteractions } from "../../contexts/User/types/UserTypes";

interface VoteSectionProps {
  postAndInteractions: PostAndInteractions | UserPostAndInteractions;
  isInProfile?: boolean;
}

const VoteSection: React.FC<VoteSectionProps> = ({
  postAndInteractions,
  isInProfile = false,
}) => {
  const [_, postDispatch] = usePost();
  const [{ user }, userDispatch] = useUser();
  const navigate = useNavigate();

  const vote = (bool: boolean) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (isInProfile) {
      interactWithPostFromUserProfile(
        userDispatch,
        postAndInteractions.post.id,
        bool,
        "vote"
      );
      return;
    }

    interactWithPost(postDispatch, postAndInteractions.post.id, bool, "vote");
  };

  return (
    <div className="me-3 mt-2">
      <button
        className={`bi bi-caret-up btn ${
          postAndInteractions.interactions?.voteStatus === true ? "bg-info" : ""
        }`}
        onClick={() => vote(true)}
      />
      <div className="text-center">{postAndInteractions.post.votePoints}</div>
      <button
        className={`bi bi-caret-down btn  ${
          postAndInteractions.interactions?.voteStatus === false
            ? "bg-danger"
            : ""
        }`}
        onClick={() => vote(false)}
      />
    </div>
  );
};

export default VoteSection;
