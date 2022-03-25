import { Formik } from "formik";
import React, { useState } from "react";
import {
  createCommentOrReply,
  fetchReplies,
  useComment,
} from "../../../contexts/Comments/actions/commentAction";
import { FindRepliesCondition } from "../../../contexts/Comments/types/CommentTypes";
import FormWrapper from "../../forms/FormWrapper";
import InputWrapper from "../../forms/InputWrapper";
import CommentCard from "../CommentCard";

interface ReplyCommentProps {
  postId: number;
  findReplies: FindRepliesCondition;
  replyAmount: number;
  isComment?: boolean;
}

const CommentInteractions: React.FC<ReplyCommentProps> = ({
  postId,
  findReplies,
  replyAmount,
  isComment = true,
}) => {
  const [replyInputState, setReplyInputState] = useState(false);
  const [repliseState, setRepliesState] = useState(false);
  const { commentDispatch, commentState } = useComment();

  const { parentCommentId, replyToUserId } = findReplies;
  const replies = commentState.comments.find(
    (comment) => comment.id === findReplies.parentCommentId
  )?.replies;

  const arrow = repliseState ? (
    <i className="bi bi-caret-down-fill"></i>
  ) : (
    <i className="bi bi-caret-up-fill"></i>
  );
  const viewReply =
    replyAmount > 1 ? ` view ${replyAmount} replies` : "View reply";

  const fetchReplyBtn = () => {
    // Fetch data only in close to open state
    if (!repliseState && !replies?.length) {
      fetchReplies(
        postId,
        {
          parentCommentId,
          replyToUserId,
        },
        commentDispatch
      );
    }

    setRepliesState(!repliseState);
  };

  return (
    <>
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
      </div>

      {/* Reply input area */}
      {replyInputState && (
        <Formik
          initialValues={{ comment: "" }}
          onSubmit={async (value, { setFieldValue }) => {
            const { comment: comment_text } = value;

            createCommentOrReply(
              postId,
              { comment_text, parentCommentId, replyToUserId },
              commentDispatch
            );

            setFieldValue("comment", "");
            setReplyInputState(false);
          }}
        >
          {(props) => (
            <FormWrapper props={props} formUsage="Comment" isComment={true}>
              <InputWrapper label="Comment" name="comment" />
            </FormWrapper>
          )}
        </Formik>
      )}

      {/* Replies */}
      {replyAmount && isComment ? (
        <div>
          <div
            role="button"
            onClick={() => fetchReplyBtn()}
            className="text-primary"
          >
            {arrow}
            {viewReply}
          </div>

          {/* Show reply only if it is comment
          {repliseState &&
            replies?.map((reply) => (
              // <div key={reply.id}>123</div>
              <div key={reply.id}>
                <CommentCard
                  comment={reply}
                  postId={postId}
                  isComment={false}
                  parentCommentId={parentCommentId}
                />
              </div>
            ))} */}
        </div>
      ) : null}
    </>
  );
};

export default CommentInteractions;
