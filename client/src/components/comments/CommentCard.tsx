import React from "react";
import { Comment, Reply } from "../../contexts/Comments/types/CommentTypes";
import { calculateTime } from "../../utils/calculaTime";
import CommentInteractions from "./create-edit/CommentInteractions";

interface CommentCardProps {
  postId: number;
  comment: Comment | Reply;
  parentCommentId: number;
  isComment?: boolean;
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  postId,
  isComment,
  parentCommentId,
}) => {
  return (
    <div className="d-flex mb-3 fs-5">
      {/* Person icon */}
      <div>
        <i className="bi bi-person fs-1 me-2"></i>
      </div>

      {/* Comment info */}
      <div className="mt-1">
        <div>
          {comment.user.username} {comment.id}
          <span className="text-muted fs-6">
            {" "}
            · {calculateTime(comment.createdAt)}
          </span>
        </div>

        {/* Comments */}
        <div>{comment.comment_text}</div>

        <CommentInteractions
          postId={postId}
          replyAmount={comment.replyAmount}
          findReplies={{
            parentCommentId,
            replyToUserId: comment.userId,
          }}
          isComment={isComment}
        />
      </div>
    </div>
  );
};

export default CommentCard;
