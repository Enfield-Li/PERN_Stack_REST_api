import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../../forms/FormWrapper";
import InputWrapper from "../../forms/InputWrapper";
import * as Yup from "yup";
import { createPost, usePost } from "../../../contexts/Post/actions/PostAction";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
  const { postDispatch } = usePost();
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
      initialValues={{ title: "", content: "" }}
      onSubmit={async (values) => {
        const res = await createPost(postDispatch, values);
        if (res) navigate(`/post/${res.post.id}`, { replace: true });
      }}
    >
      {(props) => (
        <FormWrapper props={props} formUsage="Create Post" fullWidth={true}>
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

export default CreatePost;
