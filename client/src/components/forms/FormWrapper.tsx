import { Form, FormikProps } from "formik";
import { Link } from "react-router-dom";

type FormUsage =
  | "Login"
  | "Register"
  | "Change password"
  | "Create Post"
  | "Update Post";

interface FormWrapperProps<Values> {
  children: React.ReactNode;
  props: FormikProps<Values>;
  formUsage?: FormUsage;
}

const FormWrapper = <Values,>({
  children,
  props,
  formUsage,
}: FormWrapperProps<Values>) => {
  // Form bottom assist msg
  let addtionalAssist = null;

  if (formUsage === "Login") {
    addtionalAssist = (
      <div className="d-flex justify-content-between">
        <Link to={"/forgot-password"}>Forgot password?</Link>
        <Link to={"/register"}>Regester!</Link>
      </div>
    );
  } else if (formUsage === "Register") {
    addtionalAssist = <Link to={"/login"}>Got an account?</Link>;
  } else if (formUsage === "Change password") {
    addtionalAssist = <Link to={"/change-password"}>Or you can login!</Link>;
  }

  return (
    <Form className="container mt-2 py-3 w-50 fs-5">
      <div className="d-grid">
        {children}

        <button
          type="submit"
          disabled={props.isSubmitting}
          className="btn btn-primary w-auto"
        >
          {formUsage}
        </button>
      </div>
      <div className="pt-3">{addtionalAssist}</div>
    </Form>
  );
};
export default FormWrapper;
