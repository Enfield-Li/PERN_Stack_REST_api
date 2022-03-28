import { Formik } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  usePost,
  editCurrentPost,
} from "../../../contexts/Post/actions/PostAction";
import FormWrapper from "../../forms/FormWrapper";
import InputWrapper from "../../forms/InputWrapper";

interface EditPostProps {}

const EditPost: React.FC<EditPostProps> = ({}) => {
  const { id } = useParams();
  const { postState, postDispatch } = usePost();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(10, "Must be longer than or equal to 10 characters")
      .required("Required"),
    content: Yup.string(),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      // no good
      initialValues={{
        title: postState.currentPost?.post.title
          ? postState.currentPost?.post.title
          : "",
        content: postState.currentPost?.post.content
          ? postState.currentPost?.post.content
          : "",
      }}
      onSubmit={async (values) => {
        const res = await editCurrentPost(+id!, values);
        if (res) navigate(`/post/${res.post.id}`, { replace: true });
      }}
    >
      {(props) => (
        <FormWrapper props={props} formUsage="Create Post">
          <InputWrapper label="Title" name="title" />
          <InputWrapper
            label="Content"
            name="content"
            textarea={true}
            required={false}
          />
        </FormWrapper>
      )}
    </Formik>
  );
};

export default EditPost;
