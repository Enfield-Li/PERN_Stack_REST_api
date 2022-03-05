import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, useGlobal } from "../context/actions/action";
import FormWrapper from "./nested-Components/FormWrapper";
import InputWrapper from "./nested-Components/InputWrapper";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [state, dispatch] = useGlobal();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ usernameOrEmail: "", password: "" }}
      onSubmit={async (values) => {
        const res = await loginUser(dispatch, values);
        if (res) navigate("/");
      }}
    >
      {(props) => (
        <FormWrapper props={props} formUsage="Login">
          <InputWrapper label="User name" name="usernameOrEmail" />
          <InputWrapper label="Password" name="password" type="password" />
        </FormWrapper>
      )}
    </Formik>
  );
};

export default Login;
