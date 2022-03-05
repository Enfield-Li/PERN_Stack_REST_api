import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, useUser } from "../contexts/User/actions/UserAction";
import FormWrapper from "./nested-Components/FormWrapper";
import InputWrapper from "./nested-Components/InputWrapper";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [state, dispatch] = useUser();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ usernameOrEmail: "", password: "" }}
      onSubmit={async (values) => {
        console.log(values);
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
