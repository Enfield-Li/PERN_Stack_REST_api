import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchReplies,
  useComment,
} from "../../../contexts/Comments/actions/commentAction";
import { Comment } from "../../../contexts/Comments/types/CommentTypes";
import { calculateTime } from "../../../utils/calculaTime";
import CreateComment from "../create-edit/CreateComment";
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

  const fetchReplyBtn = () => {
    // Fetch data only in close and doesn't fetch it before
    if (!repliseState && !comment.replies.length) {
      fetchReplies(
        postId,
        {
          parentCommentId: comment.id,
        },
        commentDispatch
      );
    }
    setRepliesState(!repliseState);
  };

  return (
    <div className="d-flex mb-3 fs-5">
      {/* Person icon */}
      <div
        onClick={() => navigate(`/user-profile/${comment.userId}`)}
        role="button"
      >
        <i className="bi bi-person fs-1 me-3"></i>
      </div>

      {/* Comment info */}
      <div className="mt-1 w-100">
        <div
          onClick={() => navigate(`/user-profile/${comment.userId}`)}
          role="button"
          className="w-25"
        >
          {comment.user.username}
          <span className="text-muted fs-6">
            {" "}
            · {calculateTime(comment.createdAt, true)}
          </span>
        </div>

        {/* Comments */}
        <div>{comment.comment_text}</div>

        {/* repeat */}
        <div>
          {/* Thumbs */}
          <i className="bi bi-hand-thumbs-up" role="button"></i>
          <i className="bi bi-hand-thumbs-down mx-3" role="button"></i>

          {/* Reply button */}
          <span
            className="text-muted my-1"
            role="button"
            onClick={() => setReplyInputState(true)}
          >
            Reply
          </span>

          {replyInputState && (
            <CreateComment
              postId={postId}
              parentCommentId={comment.id}
              replyToUserId={comment.userId}
              isReply={false}
              setReplyInputState={setReplyInputState}
            />
          )}
        </div>

        {/* Show replies */}
        {comment.replyAmount ? (
          <div>
            <div
              role="button"
              onClick={() => fetchReplyBtn()}
              className="text-primary my-1 w-25"
            >
              {arrows}
              {viewOrHideReply}
            </div>
          </div>
        ) : null}

        {/* Online reply */}
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

        {/*  Local reply / user current generated reply */}
        {!repliseState &&
          comment.currentReplies &&
          comment.currentReplies.map((reply, index) => (
            <div key={index}>
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
