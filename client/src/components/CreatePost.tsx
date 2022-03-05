import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createPost, useGlobal } from "../contexts/User/actions/UserAction";
import FormWrapper from "./nested-Components/FormWrapper";
import InputWrapper from "./nested-Components/InputWrapper";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
  const [state, dispatch] = useGlobal();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ title: "", content: "" }}
      onSubmit={async (values) => {
        const res = await createPost(dispatch, values);
        if (res) navigate(`/post/${res.postId}`, { replace: true });
      }}
    >
      {(props) => (
        <FormWrapper props={props} formUsage="Create Post">
          <InputWrapper label="Title" name="title" />
          <InputWrapper label="Content" name="content" textarea={true} />
        </FormWrapper>
      )}
    </Formik>
  );
};

export default CreatePost;
