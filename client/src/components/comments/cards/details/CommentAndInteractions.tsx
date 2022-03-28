import React from "react";
import { voteComment } from "../../../../contexts/Comments/actions/commentAction";
import CreateComment from "../../create-edit/CreateComment";

interface CommentAndInteractionsProps {
  postId: number;
  isReply: boolean;
  replyToUserId: number;
  setReplyInputState: React.Dispatch<React.SetStateAction<boolean>>;
  replyInputState: boolean;
  parentCommentId: number;
  replyToUsername?: string;
}

const CommentAndInteractions: React.FC<CommentAndInteractionsProps> = ({
  postId,
  parentCommentId,
  replyToUserId,
  isReply,
  setReplyInputState,
  replyInputState,
  replyToUsername,
}) => {
  return (
    <div>
      {/* Thumbs */}
      <i
        className="bi bi-hand-thumbs-up"
        role="button"
        onClick={() => {
          voteComment(parentCommentId, true);
        }}
      ></i>{}
      <i
        className="bi bi-hand-thumbs-down mx-3"
        role="button"
        onClick={() => {
          voteComment(parentCommentId, false);
        }}
      ></i>

      {/* Reply button */}
      <span
        className="text-muted my-1"
        role="button"
        onClick={() => setReplyInputState(true)}
      >
        Reply
      </span>

      {/* Create comment or reply */}
      {replyInputState && (
        <CreateComment
          postId={postId}
          replyToUserId={replyToUserId}
          parentCommentId={parentCommentId}
          isReply={isReply}
          setReplyInputState={setReplyInputState}
          replyToUsername={replyToUsername}
          reciverId={replyToUserId}
        />
      )}
    </div>
  );
};

export default CommentAndInteractions;
