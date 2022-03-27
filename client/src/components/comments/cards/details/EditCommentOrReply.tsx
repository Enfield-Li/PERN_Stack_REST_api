import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import {
  editCommentOrReply,
  useComment,
} from "../../../../contexts/Comments/actions/commentAction";
import InputWrapper from "../../../forms/InputWrapper";

interface EditCommentOrReplyProps {
  currentCommentOrReplyId: number;
  comment: string;
  setEditComment: React.Dispatch<React.SetStateAction<string | null>>;
  parentCommentId?: number;
}

const EditCommentOrReply: React.FC<EditCommentOrReplyProps> = ({
  setEditComment,
  currentCommentOrReplyId,
  parentCommentId,
  comment,
}) => {
  const { commentDispatch } = useComment();

  return (
    <Formik
      initialValues={{ comment }}
      onSubmit={async (value, { setFieldValue }) => {
        editCommentOrReply(
          currentCommentOrReplyId,
          value.comment,
          commentDispatch,
          parentCommentId
        );

        setEditComment(null);
        setFieldValue("comment", "");
      }}
    >
      {(props) => (
        <Form>
          <InputWrapper name="comment" textarea={true} />

          <div className="row">
            <div className="col-8"></div>

            {/* Cancel button */}
            <div className="col-2">
              <button
                disabled={props.isSubmitting}
                className="btn btn-secondary w-100"
                onClick={() => {
                  setEditComment(null);
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

export default EditCommentOrReply;
