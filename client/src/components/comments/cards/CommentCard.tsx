import React, { useState } from "react";
import {
  fetchReplies,
  useComment,
} from "../../../contexts/Comments/actions/commentAction";
import { Comment } from "../../../contexts/Comments/types/CommentTypes";
import CommentAndInteractions from "./details/CommentAndInteractions";
import PersonIcon from "./details/PersonIcon";
import RepliesSection from "./details/RepliesSection";
import UserCommentInfo from "./details/UserCommentInfo";

interface CommentCardProps {
  postId: number;
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, postId }) => {
  const [replyInputState, setReplyInputState] = useState(false);
  const [repliseState, setRepliesState] = useState(false);
  const { commentDispatch } = useComment();
  const [isHover, setIsHover] = useState(false);

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
    <div
      className="d-flex justify-content-between my-2"
      onMouseOver={(e) => setIsHover(true)}
      onMouseLeave={(e) => setIsHover(false)}
    >
      <div className="d-flex mb-3 fs-5 w-100">
        {/* Person icon */}
        <PersonIcon userId={comment.userId} />

        {/* Comment info */}
        <div className="mt-1 w-100">
          <div>
            <UserCommentInfo
              userId={comment.userId}
              createdAt={comment.createdAt}
              username={comment.user.username}
            />

            {/* Comment body */}
            <div>{comment.comment_text}</div>

            {/* Comment and interacitons */}
            <CommentAndInteractions
              postId={postId}
              replyToUserId={comment.userId}
              parentCommentId={comment.id}
              isReply={false}
              setReplyInputState={setReplyInputState}
              replyInputState={replyInputState}
            />

            {/* Show replies */}
            {comment.replyAmount ? (
              <div
                role="button"
                onClick={() => fetchReplyBtn()}
                className="text-primary my-1 w-25"
              >
                {arrows}
                {viewOrHideReply}
              </div>
            ) : null}
          </div>

          {/* Relies section */}
          <RepliesSection
            setIsHover={setIsHover}
            comment={comment}
            repliseState={repliseState}
            postId={postId}
          />
        </div>
      </div>

      {/* Options */}
      {isHover && <div role="button" className="bi bi-three-dots fs-5"></div>}
    </div>
  );
};

export default CommentCard;
