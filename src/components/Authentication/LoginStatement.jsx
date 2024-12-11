import { useState } from "react";
import PropTypes from "prop-types";
import { InputField } from "../../ui/InputField";
import { ActionButton } from "../../ui/ActionButton";
import { useNavigate } from "react-router-dom";

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

function LoginStatement() {
  const [step, setStep] = useState("login");
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const navigate = useNavigate();
  const handleForgetPassword = () => setStep("forgetPassword");
  const handleResetPassword = () => setStep("verifyAccount");
  const handleVerify = () => setStep("resetPassword");
  const handlePasswordReset = () => setStep("login");

  const handleVerificationInput = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      if (value && index < 3) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  return (
    <div className="w-[90%] md:w-[50%] mx-auto">
      {step === "login" && (
        <FormSection title="Welcome Back!" subtitle="">
          <form className="w-full max-w-sm">
            <InputField type="email" placeholder="Email Address" />
            <InputField type="password" placeholder="Password" />
            <div className="flex items-start justify-end mb-6">
              <button type="button" onClick={handleForgetPassword} className="text-sm text-[#1C1A1A] hover:text-hoverButton transition duration-300">
                Forgot password?
              </button>
            </div>
            <ActionButton
              onClick={() => {
                navigate("/dashboard");
              }}
              text="Login"
            />
          </form>
        </FormSection>
      )}

      {step === "forgetPassword" && (
        <FormSection title="Forget Password?" subtitle="Don’t worry, we will send you reset instructions.">
          <InputField type="email" placeholder="Enter Your Email" />
          <ActionButton onClick={handleResetPassword} text="Reset Password" />
        </FormSection>
      )}

      {step === "verifyAccount" && (
        <FormSection title="Verify Account" subtitle="Enter the 4-digit code we sent to your email.">
          <div className="flex space-x-2 mb-4">
            {verificationCode.map((digit, index) => (
              <input key={index} id={`code-input-${index}`} type="text" maxLength="1" value={digit} onChange={(e) => handleVerificationInput(e.target.value, index)} className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:border-main" />
            ))}
          </div>
          <ActionButton onClick={handleVerify} text="Verify Now" />
        </FormSection>
      )}

      {step === "resetPassword" && (
        <FormSection title="Reset Your Password" subtitle="">
          <InputField type="password" placeholder="New Password" />
          <InputField type="password" placeholder="Confirm Password" />
          <ActionButton onClick={handlePasswordReset} text="Reset Password" />
        </FormSection>
      )}
    </div>
  );
}

export default LoginStatement;
