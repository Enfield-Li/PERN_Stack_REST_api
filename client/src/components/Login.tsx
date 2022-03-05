import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, useUser } from "../contexts/User/actions/UserAction";
import { mapToError } from "../utils/toError";
import FormWrapper from "./nested-Components/FormWrapper";
import InputWrapper from "./nested-Components/InputWrapper";
import * as Yup from "yup";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [state, dispatch] = useUser();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    usernameOrEmail: Yup.string()
      .min(5, "Must be longer than or equal to 5 characters")
      .required("Required"),
    password: Yup.string()
      .min(5, "Must be longer than or equal to 5 characters")
      .required("Required"),
    // email: Yup.string().email("Invalid email address").required("Required"),
  });

  return (
    <Formik
      initialValues={{ usernameOrEmail: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const errorRes = await loginUser(dispatch, values);

        if (errorRes) {
          setErrors(mapToError(errorRes));
        } else {
          navigate("/");
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
