import { Formik } from "formik";
import React from "react";
import {
  createCommentOrReply,
  useComment,
} from "../../../contexts/Comments/actions/commentAction";
import FormWrapper from "../../forms/FormWrapper";
import InputWrapper from "../../forms/InputWrapper";

interface CreateCommentProps {
  postId: number;
  parentCommentId?: number | undefined;
  replyToUserId?: number | undefined;
}

const CreateComment: React.FC<CreateCommentProps> = ({
  postId,
  parentCommentId,
  replyToUserId,
}) => {
  const { commentDispatch, commentState } = useComment();

  return (
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
      }}
    >
      {(props) => (
        <FormWrapper props={props} formUsage="Comment" isComment={true}>
          <InputWrapper label="Comment" name="comment" />
        </FormWrapper>
      )}
    </Formik>
  );
};

export default CreateComment;
