import React from "react";
import { useLocation } from "react-router-dom";
import { Post } from "../../contexts/Post/types/PostTypes";

interface VoteSectionProps {
  post: Post;
}

const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  const location = useLocation();

  let path = "";
  if (location.pathname.includes("post")) {
    path = `post/${post.postId}`;
  }

  return (
    <div className="me-3">
      <button
        className={`bi bi-caret-up btn`}
        disabled={!post}
        onClick={async () => {
          console.log(post);
        }}
      />
      <div className="text-center">11</div>
      <button
        className={`bi bi-caret-down btn`}
        disabled={!post}
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
