import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  createPost,
  editCurrentPost,
  usePost,
  fetchSinglePost,
} from "../contexts/Post/actions/PostAction";
import FormWrapper from "./nested-Components/FormWrapper";
import InputWrapper from "./nested-Components/InputWrapper";
import * as Yup from "yup";

interface EditPostProps {}

const EditPost: React.FC<EditPostProps> = ({}) => {
  const { id } = useParams();
  const [postState, postDispatch] = usePost();
  const navigate = useNavigate();

  //   const [title, setTitle] = useState("");
  //   const [content, setContent] = useState("");

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(10, "Must be longer than or equal to 10 characters")
      .required("Required"),
    content: Yup.string(),
  });

  console.log("current post:", postState.currentPost);

  return (
    <Formik
      initialValues={{
        title: postState.currentPost?.post.title
          ? postState.currentPost?.post.title
          : "",
        content: postState.currentPost?.post.content
          ? postState.currentPost?.post.content
          : "",
      }}
      onSubmit={async (values) => {
        const res = await editCurrentPost(postDispatch, +id!, values);
        if (res) navigate(`/post/${res.post.id}`, { replace: true });
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

export default EditPost;
