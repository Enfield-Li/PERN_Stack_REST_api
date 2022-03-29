import React from "react";
import {
  useComment,
  voteComment,
} from "../../../../contexts/Comments/actions/commentAction";
import {
  Comment,
  Reply,
} from "../../../../contexts/Comments/types/CommentTypes";
import CreateComment from "../../create-edit/CreateComment";

interface CommentAndInteractionsProps {
  postId: number;
  isReply: boolean;
  replyToUserId: number;
  setReplyInputState: React.Dispatch<React.SetStateAction<boolean>>;
  replyInputState: boolean;
  parentCommentId: number;
  commentOrReply: Comment | Reply;
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
  commentOrReply,
}) => {
  const { commentDispatch } = useComment();

  // Decide thumbs background color
  const voteStatus = commentOrReply.commentInteractions?.voteStatus;
  const upvoteBG = voteStatus === true ? "text-info" : "";
  const downvoteBG = voteStatus === false ? "text-info" : "";

  const voteCommentClick = (voteValue: boolean) => {
    voteComment(
      {
        commentId: commentOrReply.id,
        voteValue,
        isComment: !isReply,
        parentCommentId,
      },
      commentDispatch
    );
  };

  return (
    <div>
      {/* Thumbs up */}
      <span className={`${upvoteBG}`}>
        <i
          className={`bi bi-hand-thumbs-up me-1`}
          role="button"
          onClick={() => voteCommentClick(true)}
        ></i>
        {commentOrReply.upvoteAmount}
      </span>

      {/* Thumbs down */}
      <span className={`mx-3 ${downvoteBG}`}>
        <i
          className={`bi bi-hand-thumbs-down me-1`}
          role="button"
          onClick={() => voteCommentClick(false)}
        ></i>
        {commentOrReply.downvoteAmount}
      </span>

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
