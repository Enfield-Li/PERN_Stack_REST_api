import { Form, Formik } from "formik";
import React from "react";
import {
  createCommentOrReply,
  useComment,
} from "../../../contexts/Comments/actions/commentAction";
import InputWrapper from "../../forms/InputWrapper";

interface CreateCommentProps {
  postId: number;
  isReply: boolean;
  parentCommentId?: number | undefined;
  replyToUserId?: number | undefined;
  setReplyInputState?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateComment: React.FC<CreateCommentProps> = ({
  postId,
  parentCommentId,
  replyToUserId,
  isReply,
  setReplyInputState,
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
        <Form>
          <InputWrapper label="Comment" name="comment" textarea={true} />

          <div className="row">
            <div className="col-8"></div>

            {/* Cancel button */}
            <div className="col-2">
              <button
                disabled={props.isSubmitting}
                className="btn btn-secondary w-100"
                onClick={() => {
                  if (setReplyInputState) setReplyInputState(false);
                }}
              >
                Cancel
              </button>
            </div>

            {/* Submit button */}
            <div className="col-2">
              <button
                type="submit"
                disabled={props.isSubmitting}
                className="btn btn-primary w-100"
              >
                Comment
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateComment;
