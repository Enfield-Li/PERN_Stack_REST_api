import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Comment, Reply } from "../../../contexts/Comments/types/CommentTypes";
import CommentAndInteractions from "./details/CommentAndInteractions";
import PersonIcon from "./details/PersonIcon";
import UserCommentInfo from "./details/UserCommentInfo";

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
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="d-flex justify-content-between my-2"
      onMouseOver={(e) => {
        setIsHover(true);
      }}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="d-flex mb-3 fs-5 w-100">
        {/* Person icon */}
        <PersonIcon userId={reply.userId} />

        {/* Comment info */}
        <div className="mt-1 w-100">
          <UserCommentInfo
            userId={reply.userId}
            createdAt={reply.createdAt}
            username={reply.user.username}
          />

          {/* Comment body */}
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

          {/* Comment and interacitons */}
          <CommentAndInteractions
            postId={postId}
            replyToUserId={replyToUserId}
            parentCommentId={parentComment.id}
            isReply={true}
            setReplyInputState={setReplyInputState}
            replyToUsername={reply.user.username}
            replyInputState={replyInputState}
          />
        </div>
      </div>

      {/* Options */}
      {isHover && <div role="button" className="bi bi-three-dots fs-5"></div>}
    </div>
  );
};

export default ReplyCard;
