import React from "react";
import { useLocation } from "react-router-dom";
import { PostAndInteractions } from "../../contexts/Post/types/PostTypes";

interface VoteSectionProps {
  post: PostAndInteractions;
}

const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  const location = useLocation();

  let path = "";
  if (location.pathname.includes("post")) {
    path = `post/${post.id}`;
  }

  return (
    <div className="me-3">
      <button
        className={`bi bi-caret-up btn ${
          post.user.interactions?.voteStatus === true ? "bg-info" : ""
        }`}
        onClick={async () => {
        }}
      />
      <div className="text-center">{post.votePoints}</div>
      <button
        className={`bi bi-caret-down btn  ${
          post.user.interactions?.voteStatus === false ? "bg-danger" : ""
        }`}
        onClick={async () => {
          // if (data?.me === null) {
          //   // router.replace(`/login?next=${path}`);
          //   router.push("/login");
          //   return;
        }}
      />
    </div>
  );
};

export default VoteSection;
