import React, { useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import {
  deleteCommentOrReply,
  fetchReplies,
  useComment,
} from "../../../contexts/Comments/actions/commentAction";
import { Comment } from "../../../contexts/Comments/types/CommentTypes";
import CommentAndInteractions from "./details/CommentAndInteractions";
import EditCommentOrReply from "./details/EditCommentOrReply";
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
  const [isMouseHover, setIsMouseHover] = useState(false);

  const [editComment, setEditComment] = useState<string | null>(null);

  const [controlledVisible, setControlledVisible] = useState(false);
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    trigger: "click",
    closeOnOutsideClick: true,
    visible: controlledVisible,
    onVisibleChange: setControlledVisible,
    interactive: true,
  });

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

  // JSX
  const arrows = repliseState ? (
    <i className="bi bi-caret-down-fill"></i>
  ) : (
    <i className="bi bi-caret-up-fill"></i>
  );
  const viewOrHideReply = repliseState
    ? ` Hide ${comment.replyAmount} replies`
    : ` View ${comment.replyAmount} replies`;

  return (
    <div
      className="d-flex justify-content-between my-2"
      onMouseOver={(e) => setIsMouseHover(true)}
      onMouseLeave={(e) => setIsMouseHover(false)}
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

            {editComment ? (
              // Edit current comment
              <EditCommentOrReply
                setEditComment={setEditComment}
                currentCommentOrReplyId={comment.id}
                comment={editComment}
              />
            ) : (
              <>
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
              </>
            )}

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
            setIsHover={setIsMouseHover}
            comment={comment}
            repliseState={repliseState}
            postId={postId}
          />
        </div>
      </div>

      <div>
        {/* Controlls */}
        {isMouseHover && (
          <div
            role="button"
            className="bi bi-three-dots fs-5"
            ref={setTriggerRef}
          ></div>
        )}

        {/* Popups */}
        {visible && (
          <div
            ref={setTooltipRef}
            {...getTooltipProps({
              className: "tooltip-container card bg-info",
            })}
          >
            <div className="card-body">
              <div {...getArrowProps({ className: "tooltip-arrow" })} />

              <span className="d-flex align-items-center">
                {/* edit */}
                <span
                  role="button"
                  className="text-decoration-none mx-2"
                  onClick={() => setEditComment(comment.comment_text)}
                >
                  📝
                </span>

                {/* delete */}
                <span
                  role="button"
                  className="text-decoration-none mx-2"
                  onClick={() =>
                    deleteCommentOrReply(comment.id, commentDispatch)
                  }
                >
                  🗑️
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
