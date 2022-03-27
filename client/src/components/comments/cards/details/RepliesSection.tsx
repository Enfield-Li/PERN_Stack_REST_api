import React from "react";
import { Comment } from "../../../../contexts/Comments/types/CommentTypes";
import ReplyCard from "../ReplyCard";

interface RepliesSectionProps {
  setIsHover: (value: React.SetStateAction<boolean>) => void;
  repliseState: boolean;
  comment: Comment;
  postId: number;
}

const RepliesSection: React.FC<RepliesSectionProps> = ({
  setIsHover,
  repliseState,
  comment,
  postId,
}) => {
  return (
    <div
      onMouseOver={(e) => {
        e.stopPropagation();
        setIsHover(false);
      }}
    >
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
  );
};

export default RepliesSection;
