import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchReplies,
  useComment,
} from "../../contexts/Comments/actions/commentAction";
import { Comment } from "../../contexts/Comments/types/CommentTypes";
import { calculateTime } from "../../utils/calculaTime";
import CreateComment from "./create-edit/CreateComment";
import ReplyCard from "./ReplyCard";

interface CommentCardProps {
  postId: number;
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, postId }) => {
  const navigate = useNavigate();
  const [replyInputState, setReplyInputState] = useState(false);
  const [repliseState, setRepliesState] = useState(false);
  const { commentDispatch } = useComment();

  // arrows
  const arrows = repliseState ? (
    <i className="bi bi-caret-down-fill"></i>
  ) : (
    <i className="bi bi-caret-up-fill"></i>
  );
  const viewOrHideReply = repliseState
    ? ` Hide ${comment.replyAmount} replies`
    : ` View ${comment.replyAmount} replies`;

  const fetchReplyBtn = (replyToUserId: number) => {
    // Fetch data only in close and doesn't fetch it before
    if (!repliseState && !comment.replies) {
      fetchReplies(
        postId,
        {
          parentCommentId: comment.id,
          replyToUserId,
        },
        commentDispatch
      );
    }
    setRepliesState(!repliseState);
  };

  return (
    <div className="d-flex mb-3 fs-5">
      {/* Person icon */}
      <div>
        <i className="bi bi-person fs-1 me-2"></i>
      </div>

      {/* Comment info */}
      <div className="mt-1">
        <div>
          {comment.user.username}
          <span className="text-muted fs-6">
            {" "}
            · {calculateTime(comment.createdAt)}
          </span>
        </div>

        {/* Comments */}
        <div>
          {comment.replyToUser?.username && (
            <span
              className="text-primary"
              onClick={() => navigate(`/user-profile/${comment.replyToUserId}`)}
              role="button"
            >
              @{comment.replyToUser?.username}{" "}
            </span>
          )}
          {comment.comment_text}
        </div>

        <div>
          {/* Thumbs */}
          <i className="bi bi-hand-thumbs-up" role="button"></i>
          <i className="bi bi-hand-thumbs-down mx-3" role="button"></i>

          {/* Reply button */}
          <span
            className="text-muted"
            role="button"
            onClick={() => setReplyInputState(!replyInputState)}
          >
            Reply
          </span>
          {replyInputState && <CreateComment postId={postId} />}
        </div>

        {/* Replies */}
        {comment.replyAmount ? (
          <div>
            <div
              role="button"
              onClick={() => fetchReplyBtn(comment.userId)}
              className="text-primary"
            >
              {arrows}
              {viewOrHideReply}
            </div>
          </div>
        ) : null}

        {repliseState &&
          comment.replies &&
          comment.replies.map((reply) => (
            <div key={reply.id}>
              <ReplyCard
                reply={reply}
                postId={postId}
                replyToUserId={reply.userId}
                parentComment={comment}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentCard;
