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
          <div key={comment.id}>
            <CommentCard comment={comment} postId={postId} />
          </div>
        ))}
    </>
  );
};

export default PostComments;
