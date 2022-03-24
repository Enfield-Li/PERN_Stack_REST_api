import React from "react";
import { useNavigate } from "react-router-dom";
import { Comment, Reply } from "../../contexts/Comments/types/CommentTypes";
import { useUser } from "../../contexts/User/actions/UserAction";
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
  const { userState } = useUser();
  const userId = userState.user?.id;
  const navigate = useNavigate();

  return (
    <div className="d-flex mb-3 fs-5">
      {/* Person icon */}
      <div>
        <i className="bi bi-person fs-1 me-2"></i>
      </div>

      {/* Comment info */}
      <div className="mt-1">
        <div>
          {comment.user.username} {comment.userId}
          <span className="text-muted fs-6">
            {" "}
            · {calculateTime(comment.createdAt)}
          </span>
        </div>

        {/* Comments */}
        <div>
          {userId !== comment.replyToUserId &&
            !isComment &&
            userId === comment.userId &&
            comment.replyToUserId !== null && (
              <span
                className="text-primary"
                onClick={() =>
                  navigate(`/user-profile/${comment.replyToUserId}`)
                }
                role="button"
              >
                @{comment.user.username}{" "}
              </span>
            )}
          {comment.comment_text}
        </div>

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
