import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, useUser } from "../contexts/User/actions/UserAction";
import { mapToError } from "../utils/toError";
import FormWrapper from "./nested-Components/forms/FormWrapper";
import InputWrapper from "./nested-Components/forms/InputWrapper";
import * as Yup from "yup";
import {
  clearCache,
  fetchPaginatedPosts,
  usePost,
} from "../contexts/Post/actions/PostAction";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const { userDispatch } = useUser();
  const { postDispatch } = usePost();

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    usernameOrEmail: Yup.string()
      .min(5, "Must be longer than or equal to 5 characters")
      .required("Required"),
    password: Yup.string()
      .min(5, "Must be longer than or equal to 5 characters")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{ usernameOrEmail: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const errorRes = await loginUser(userDispatch, values);

        if (errorRes) {
          setErrors(mapToError(errorRes));
          return;
        } else {
          clearCache(postDispatch);
          fetchPaginatedPosts(postDispatch);
          navigate("/");
          return;
        }
      }}
      validationSchema={validationSchema}
    >
      {(props) => (
        <FormWrapper props={props} formUsage="Login">
          <InputWrapper label="Username or Email" name="usernameOrEmail" />
          <InputWrapper label="Password" name="password" type="password" />
        </FormWrapper>
      )}
    </Formik>
  );
};

export default Login;
