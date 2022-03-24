import { Formik } from "formik";
import React, { useState } from "react";
import {
  createCommentOrReply,
  useComment,
} from "../../../contexts/Comments/actions/commentAction";
import FormWrapper from "../../forms/FormWrapper";
import InputWrapper from "../../forms/InputWrapper";

interface ReplyCommentProps {
  postId: number;
  parentCommentId: number;
  replyToUserId: number;
}

const CommentInteractions: React.FC<ReplyCommentProps> = ({
  postId,
  parentCommentId,
  replyToUserId,
}) => {
  const [replyState, setReplyState] = useState(false);
  const { commentState, commentDispatch } = useComment();

  return (
    <>
      <div>
        {/* Thumbs */}
        <i className="bi bi-hand-thumbs-up" role="button"></i>
        <i className="bi bi-hand-thumbs-down mx-3" role="button"></i>

        {/* Reply */}
        <span
          className="text-muted"
          role="button"
          onClick={() => setReplyState(!replyState)}
        >
          Reply
        </span>
      </div>
      {replyState && (
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
            setReplyState(false);
          }}
        >
          {(props) => (
            <FormWrapper props={props} formUsage="Comment" isComment={true}>
              <InputWrapper label="Comment" name="comment" />
            </FormWrapper>
          )}
        </Formik>
      )}
    </>
  );
};

export default CommentInteractions;
