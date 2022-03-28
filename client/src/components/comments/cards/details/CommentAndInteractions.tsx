import React from "react";
import CreateComment, {
  CreateCommentProps,
} from "../../create-edit/CreateComment";

interface CommentAndInteractionsProps {
  postId: number;
  isReply: boolean;
  replyToUserId: number;
  setReplyInputState: React.Dispatch<React.SetStateAction<boolean>>;
  parentCommentId?: number;
  replyInputState: boolean;
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
