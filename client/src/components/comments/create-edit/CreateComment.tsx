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
  isReply: boolean;
  parentCommentId?: number | undefined;
  replyToUserId?: number | undefined;
}

const CreateComment: React.FC<CreateCommentProps> = ({
  postId,
  parentCommentId,
  replyToUserId,
  isReply,
}) => {
  const { commentDispatch, commentState } = useComment();

  return (
    <Formik
      initialValues={{ comment: "" }}
      onSubmit={async (value, { setFieldValue }) => {
        const { comment: comment_text } = value;

        createCommentOrReply(
          postId,
          { comment_text, parentCommentId, replyToUserId, isReply },
          commentDispatch
        );

        setFieldValue("comment", "");
      }}
    >
      {(props) => (
        <FormWrapper props={props} formUsage="Comment" isReply={true}>
          <InputWrapper label="Comment" name="comment" textarea={true} />
        </FormWrapper>
      )}
    </Formik>
  );
};

export default CreateComment;
