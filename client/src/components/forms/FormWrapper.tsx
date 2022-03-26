import { Form, FormikProps } from "formik";
import { Link } from "react-router-dom";

type FormUsage =
  | "Login"
  | "Register"
  | "Change password"
  | "Create Post"
  | "Update Post"
  | "Comment";

interface FormWrapperProps<Values> {
  children: React.ReactNode;
  props: FormikProps<Values>;
  formUsage?: FormUsage;
  fullWidth?: boolean;
  isReply?: boolean;
}

const FormWrapper = <Values,>({
  children,
  props,
  formUsage,
  fullWidth,
  isReply,
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

  let style = "container mt-2 py-3 w-50";
  if (fullWidth) style = "mt-2";
  if (isReply) style = "";

  return (
    <Form className={`fs-5 ${style}`}>
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
