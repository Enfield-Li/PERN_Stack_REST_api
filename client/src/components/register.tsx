import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, useUser } from "../contexts/User/actions/UserAction";
import FormWrapper from "./nested-Components/FormWrapper";
import InputWrapper from "./nested-Components/InputWrapper";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [state, dispatch] = useUser();
  const navigate = useNavigate();

  return (
    <div className="space-align-block">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          await registerUser(dispatch, values);
          navigate("/");
        }}
      >
        {(props) => (
          <FormWrapper props={props} formUsage="Register">
            <InputWrapper label="User name" name="username" />
            <InputWrapper label="Email" name="email" />
            <InputWrapper label="Password" name="password" type="password" />
          </FormWrapper>
        )}
      </Formik>
    </div>
  );
};

export default Register;
