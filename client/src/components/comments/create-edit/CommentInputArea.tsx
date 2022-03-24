import { Formik } from "formik";
import React from "react";
import { createCommentOrReply, useComment } from "../../../contexts/Comments/actions/commentAction";
import FormWrapper from "../../forms/FormWrapper";
import InputWrapper from "../../forms/InputWrapper";

interface CommentInputAreaProps {
  replyInputState: boolean;
  setReplyInputState: React.Dispatch<React.SetStateAction<boolean>>;
  postId: number;
  parentCommentId: number;
  replyToUserId: number;
}

const CommentInputArea: React.FC<CommentInputAreaProps> = ({
  replyInputState,
  setReplyInputState,
  postId,
  parentCommentId,
  replyToUserId,
}) => {
  const { commentDispatch } = useComment();

  return (
    <>
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
    </>
  );
};

export default CommentInputArea;
