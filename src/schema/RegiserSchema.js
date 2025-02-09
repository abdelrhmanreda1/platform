import * as Yup from "yup";
export const validationEmployeeSchema = Yup.object({
  firstName: Yup.string().min(2, "First Name must be at least 2 characters").required("First Name is required"),
  lastName: Yup.string().min(2, "Last Name must be at least 2 characters").required("Last Name is required"),
  email: Yup.string()
    .trim()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Invalid email format")
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^(?:\+20|0)(1[0125]\d{8}|2\d{8}|3\d{8})$/, "Invalid Egyptian phone number")
    .required("Phone number is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  dob: Yup.date().required("Date of birth is required"),
  gender: Yup.string().oneOf(["Male", "Female"], "Gender must be Male or Female").required("Gender is required"),
});

export const validationCompanySchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .trim()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Invalid email format")
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^(?:\+20|0)(1[0125]\d{8}|2\d{8}|3\d{8})$/, "Invalid Egyptian phone number")
    .required("Phone number is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  companyName: Yup.string().min(2, "companyName must be at least 2 characters").required("companyName is required"),
  address: Yup.string().required("Address is required"),
});
