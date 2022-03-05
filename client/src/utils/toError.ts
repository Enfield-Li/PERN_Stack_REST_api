type errorType = {
  [key: string]: string;
};

type FieldError = {
  field: string;
  message: string;
};

export const mapToError = (errors: FieldError) => {
  const fieldError: errorType = {};

  fieldError[errors.field] = errors.message;

  return fieldError;
};
