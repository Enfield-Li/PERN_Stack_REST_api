import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  createCommentOrReply,
  useComment,
} from "../../../contexts/Comments/actions/commentAction";
import {
  sendNotification,
  useSocket,
} from "../../../contexts/SocketIo/actions/socketActions";
import { useUser } from "../../../contexts/User/actions/UserAction";
import InputWrapper from "../../forms/InputWrapper";

export interface CreateCommentProps {
  postId: number;
  isReply: boolean;
  reciverId: number;
  isComment?: boolean;
  parentCommentId?: number;
  replyToUserId?: number;
  replyToUsername?: string;
  setReplyInputState?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateComment: React.FC<CreateCommentProps> = ({
  postId,
  parentCommentId,
  replyToUserId,
  isComment = true,
  isReply,
  setReplyInputState,
  replyToUsername,
  reciverId,
}) => {
  const { commentDispatch, commentState } = useComment();
  const navigate = useNavigate();
  const { userState } = useUser();
  const { user } = userState;
  const { socket } = useSocket();

  return (
    <Formik
      initialValues={{ comment: "" }}
      onSubmit={async (value, { setFieldValue }) => {
        if (!user) {
          navigate("/login");
          return;
        }

        // Emit notification
        sendNotification(socket, {
          postId,
          reciverId,
          senderId: user.id,
          value: true,
          senderName: user.username,
          type: "comment",
        });

        const { comment: comment_text } = value;

        createCommentOrReply(
          postId,
          {
            comment_text,
            parentCommentId,
            replyToUserId,
          },
          commentDispatch
        );

        setFieldValue("comment", "");
        if (setReplyInputState) setReplyInputState(false);
      }}
    >
      {(props) => (
        <Form>
          <InputWrapper name="comment" textarea={true} />

          <div className="row">
            <div className={isComment ? "col-8" : "col-10"}></div>

            {/* Cancel button */}
            {isComment && (
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
            )}

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
