import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, useUser } from "../contexts/User/actions/UserAction";
import FormWrapper from "./nested-Components/forms/FormWrapper";
import InputWrapper from "./nested-Components/forms/InputWrapper";
import * as Yup from "yup";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [state, dispatch] = useUser();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(5, "Must be longer than or equal to 5 characters")
      .required("Required"),
    password: Yup.string()
      .min(5, "Must be longer than or equal to 5 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

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
        validationSchema={validationSchema}
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
