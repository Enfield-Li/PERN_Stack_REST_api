import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Comment, Reply } from "../../../contexts/Comments/types/CommentTypes";
import { calculateTime } from "../../../utils/calculaTime";
import CreateComment from "../create-edit/CreateComment";

interface ReplyCardProps {
  reply: Reply;
  postId: number;
  replyToUserId: number;
  parentComment: Comment;
}

const ReplyCard: React.FC<ReplyCardProps> = ({
  reply,
  postId,
  replyToUserId,
  parentComment,
}) => {
  const navigate = useNavigate();
  const [replyInputState, setReplyInputState] = useState(false);

  return (
    <div className="d-flex mb-3 fs-5">
      {/* Person icon */}
      <div
        onClick={() => navigate(`/user-profile/${reply.userId}`)}
        role="button"
      >
        <i className="bi bi-person fs-1 me-2"></i>
      </div>

      {/* Comment info */}
      <div className="mt-1 w-100">
        <div
          onClick={() => navigate(`/user-profile/${reply.userId}`)}
          role="button"
          className="w-25"
        >
          {reply.user.username}
          <span className="text-muted fs-6">
            {" "}
            · {calculateTime(reply.createdAt, true)}
          </span>
        </div>

        {/* Comments */}
        <div>
          {reply.isReply && (
            <span
              className="text-primary"
              onClick={() => navigate(`/user-profile/${reply.replyToUserId}`)}
              role="button"
            >
              @{reply.replyToUser?.username}{" "}
            </span>
          )}
          {reply.comment_text}
        </div>

        {/* repeat */}
        <div>
          {/* Thumbs */}
          <i className="bi bi-hand-thumbs-up" role="button"></i>
          <i className="bi bi-hand-thumbs-down mx-3" role="button"></i>

          {/* Reply button */}
          <span
            className="text-muted"
            role="button"
            onClick={() => setReplyInputState(true)}
          >
            Reply
          </span>

          {replyInputState && (
            <CreateComment
              postId={postId}
              replyToUserId={replyToUserId}
              parentCommentId={parentComment.id}
              isReply={true}
              setReplyInputState={setReplyInputState}
              replyToUsername={reply.user.username}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReplyCard;
