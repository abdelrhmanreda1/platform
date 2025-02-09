import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { passwordReset } from "../../services/apiAuth";
import { InputField } from "../../ui/InputField";
import { ActionButton } from "../../ui/ActionButton";

const resetPasswordSchema = Yup.object({
  newPassword: Yup.string().min(8, "Password must be at least 8 characters").required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function PasswordResetForm() {
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const token = queryParams.get("token");
    if (token) {
      setResetToken(token);
    } else {
      navigate("/login");
    }
  }, [search, navigate]);

  const resetPasswordMutation = useMutation(
    (values) => passwordReset({ newPassword: values.newPassword }, resetToken), // بيبعت بس newPassword
    {
      onSuccess: () => {
        toast.success("Password reset successful!");
        navigate("/login");
      },
      onError: () => toast.error("Password reset failed. Please try again."),
    }
  );

  const resetPasswordFormik = useFormik({
    initialValues: { newPassword: "", confirmPassword: "" },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => resetPasswordMutation.mutate(values),
  });

  return (
    <div className="w-[90%] md:w-[50%] gap-2 mx-auto">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl mb-3 font-bold text-main">LOGO</h1>
        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
        <form onSubmit={resetPasswordFormik.handleSubmit} className="w-full max-w-sm flex flex-col gap-3">
          <InputField formik={resetPasswordFormik} name="newPassword" type="password" placeholder="New Password" />
          <InputField formik={resetPasswordFormik} name="confirmPassword" type="password" placeholder="Confirm Password" />
          <ActionButton type="submit" text={resetPasswordMutation.isLoading ? "Resetting..." : "Reset Password"} />
        </form>
      </div>
    </div>
  );
}

export default PasswordResetForm;
