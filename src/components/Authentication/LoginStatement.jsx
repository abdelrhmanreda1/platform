import { useState } from "react";
import PropTypes from "prop-types";
import { InputField } from "../../ui/InputField";
import { ActionButton } from "../../ui/ActionButton";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { login, requestPasswordReset, resendConfirm } from "../../services/apiAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";

const FormSection = ({ title, subtitle, children }) => (
  <div className="flex flex-col justify-center items-center">
    <h1 className="text-3xl mb-3 font-bold text-main">LOGO</h1>
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {subtitle && <p className="text-sm text-center text-gray-500 mb-4">{subtitle}</p>}
    {children}
  </div>
);

FormSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};

FormSection.defaultProps = {
  subtitle: "",
};

const loginSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

const forgetPasswordSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

function LoginStatement() {
  const [step, setStep] = useState("login");
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      authLogin(data.user);
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: () => toast.error("Username or password is not correct."),
  });

  const forgetPasswordMutation = useMutation(requestPasswordReset, {
    onSuccess: () => {
      setStep("confirmationMessage");
      toast.success("Reset link sent to your email!");
    },
    onError: () => toast.error("Failed to send reset instructions. Please try again."),
  });

  const resendConfirmMutation = useMutation(resendConfirm, {
    onSuccess: () => {
      toast.success("If this email exists, you will get password reset email in your inbox.");
    },
    onError: () => toast.error("Failed to resend email. Please try again."),
  });

  const loginFormik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (values) => loginMutation.mutate(values),
  });

  const forgetPasswordFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: forgetPasswordSchema,
    onSubmit: (values) => forgetPasswordMutation.mutate(values),
  });

  return (
    <div className="w-[90%] md:w-[50%] gap-2 mx-auto">
      {step === "login" && (
        <FormSection title="Welcome Back!">
          <form onSubmit={loginFormik.handleSubmit} className="w-full max-w-sm flex flex-col gap-3">
            <InputField formik={loginFormik} name="username" type="text" placeholder="Username" />
            <InputField formik={loginFormik} name="password" type="password" placeholder="Password" />
            <div className="flex items-start justify-end">
              <button type="button" onClick={() => setStep("forgetPassword")} className="text-sm text-[#1C1A1A] hover:text-hoverButton transition duration-300">
                Forgot password?
              </button>
            </div>
            <ActionButton type="submit" text={loginMutation.isLoading ? "Loading..." : "Login"} />
          </form>
        </FormSection>
      )}

      {step === "forgetPassword" && (
        <FormSection title="Forgot Password?" subtitle="Enter your email to receive a reset link">
          <form onSubmit={forgetPasswordFormik.handleSubmit} className="w-full max-w-sm flex flex-col gap-3">
            <InputField formik={forgetPasswordFormik} name="email" type="email" placeholder="Enter Your Email" />
            <ActionButton type="submit" text={forgetPasswordMutation.isLoading ? "Sending..." : " Reset Password"} />
          </form>
        </FormSection>
      )}

      {step === "confirmationMessage" && (
        <FormSection title="Verify Account">
          <span className="text-slate-500">Please check your email inbox and click on the provided link to reset your password. if you don't recieve email, </span>
          <button onClick={() => resendConfirmMutation.mutate({ email: forgetPasswordFormik.values.email })} className="text-blue-600 hover:text-blue-800 text-sm mt-2">
            click here to resend
          </button>
        </FormSection>
      )}
    </div>
  );
}

export default LoginStatement;
