import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { Link } from "react-router-dom";

export type InputWrapperProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  required?: boolean;
  label?: string;
  type?: "password" | "email";
  textarea?: boolean;
  userId?: number;
  userName?: string;
};

const InputWrapper: React.FC<InputWrapperProps> = ({
  label,
  textarea,
  type,
  required = true,
  userId,
  userName,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const InputType = textarea ? "textarea" : "input";
  return (
    <div className="mb-3">
      {userId && userName ? (
        <div>
          <Link to={`/user-profile/${userId}`}>
            <label htmlFor={field.name} className="form-label">
              as {userName}:
            </label>
          </Link>
        </div>
      ) : (
        label && (
          <label htmlFor={field.name} className="form-label">
            {label && label + ":"}
          </label>
        )
      )}

      <InputType
        required={required}
        type={type ? type : "text"}
        className="form-control"
        placeholder={required ? "" : "Optional"}
        id={field.name}
        {...field}
        aria-describedby="textHelp"
      />

      {error && (
        <div className="text-danger" id="feedback">
          {error}
        </div>
      )}
    </div>
  );
};
export default InputWrapper;
