import React from "react";
import { useComment } from "../../contexts/Comments/actions/commentAction";
import CommentCard from "./CommentCard";

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
            <CommentCard
              comment={comment}
              postId={postId}
              isComment={true}
              parentCommentId={comment.id} 
            />
          </div>
        ))}
    </>
  );
};

export default PostComments;
