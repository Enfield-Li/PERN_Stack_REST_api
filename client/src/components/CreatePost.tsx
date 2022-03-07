import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createPost, usePost } from "../contexts/Post/actions/PostAction";
import FormWrapper from "./nested-Components/FormWrapper";
import InputWrapper from "./nested-Components/InputWrapper";
import * as Yup from "yup";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
  const [state, dispatch] = usePost();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(10, "Must be longer than or equal to 10 characters")
      .required("Required"),
    content: Yup.string(),
  });

  return (
    <Formik
      initialValues={{ title: "", content: "" }}
      onSubmit={async (values) => {
        const res = await createPost(dispatch, values);
        if (res) navigate(`/post/${res.id}`, { replace: true });
      }}
      validationSchema={validationSchema}
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

export default CreatePost;
