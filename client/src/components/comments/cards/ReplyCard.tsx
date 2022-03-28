import React, { useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import { useNavigate } from "react-router-dom";
import {
  deleteCommentOrReply,
  useComment,
} from "../../../contexts/Comments/actions/commentAction";
import { Comment, Reply } from "../../../contexts/Comments/types/CommentTypes";
import { useUser } from "../../../contexts/User/actions/UserAction";
import CommentAndInteractions from "./details/CommentAndInteractions";
import EditCommentOrReply from "./details/EditCommentOrReply";
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
  const { commentDispatch } = useComment();
  const { userState } = useUser();
  const { user } = userState;
  const navigate = useNavigate();
  const [replyInputState, setReplyInputState] = useState(false);
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

  return (
    <div
      className="d-flex justify-content-between my-2"
      onMouseOver={(e) => {
        setIsMouseHover(true);
      }}
      onMouseLeave={() => setIsMouseHover(false)}
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

          {editComment ? (
            // Edit current reply
            <EditCommentOrReply
              setEditComment={setEditComment}
              parentCommentId={parentComment.id}
              currentCommentOrReplyId={reply.id}
              comment={editComment}
            />
          ) : (
            // Comment and interacitons
            <>
              {/* Comment body */}
              <div>
                {reply.isReply && (
                  <span
                    className="text-primary"
                    onClick={() =>
                      navigate(`/user-profile/${reply.replyToUserId}`)
                    }
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
            </>
          )}
        </div>
      </div>

      {/* Show option with user's own comment */}
      {user?.id === reply.userId && (
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
                    onClick={() => setEditComment(reply.comment_text)}
                  >
                    📝
                  </span>

                  {/* delete */}
                  <span
                    role="button"
                    className="text-decoration-none mx-2"
                    onClick={() =>
                      deleteCommentOrReply(
                        reply.id,
                        commentDispatch,
                        parentComment.id
                      )
                    }
                  >
                    🗑️
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReplyCard;
