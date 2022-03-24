import React, { useState } from "react";
import { useComment } from "../../contexts/Comments/actions/commentAction";
import { calculateTime } from "../../utils/calculaTime";
import CommentCard from "./CommentCard";
import CommentInteractions from "./create-edit/CommentInteractions";

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
          // <div key={comment.id} className="d-flex mb-3 fs-5">
          //   {/* Person icon */}
          //   <div>
          //     <i className="bi bi-person fs-1 me-2"></i>
          //   </div>

          //   {/* Comment info */}
          //   <div className="mt-1">
          //     <div>
          //       {comment.user.username}
          //       <span className="text-muted fs-6">
          //         {" "}
          //         · {calculateTime(comment.createdAt)}
          //       </span>
          //     </div>

          //     {/* Comments */}
          //     <div>{comment.comment_text}</div>

          //     <CommentInteractions
          //       postId={postId}
          //       replyAmount={comment.replyAmount}
          //       findReplies={{
          //         parentCommentId: comment.id,
          //         replyToUserId: comment.userId,
          //       }}
          //     />
          //   </div>
          // </div>
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
