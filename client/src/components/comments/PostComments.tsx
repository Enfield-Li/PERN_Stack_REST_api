import React from "react";
import { useComment } from "../../contexts/Comments/actions/commentAction";
import CommentCard from "./cards/CommentCard";

interface PostCommentsProps {
  postId: number;
}

const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
  const { commentState, commentDispatch } = useComment();
  const comments = commentState.comments;

  return (
    <>
      {comments &&
        comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} postId={postId} />
        ))}
    </>
  );
};

export default PostComments;
