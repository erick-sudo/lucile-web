import * as yup from "yup";

export const userSchema = yup.object().shape({
  username: yup.string().required("This field is required"),
  first_name: yup.string().required("This field is required"),
  last_name: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Not a valid email")
    .required("This field is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$*])[0-9a-zA-Z@#$*]{8,}$/,
      "Password must be at least 8 characters long, contain at least one digit, one uppercase letter, and one special character (@#$*)"
    ),
  password_confirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export type User = yup.InferType<typeof userSchema>;

export type UsetSchemaKeys = keyof User;
