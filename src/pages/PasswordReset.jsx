import PasswordResetForm from "../components/Authentication/PasswordResetForm";
import RegisterFormCompany from "../components/Authentication/RegisterFormCompany";
import SignUpBanner from "../components/Authentication/SignUpBanner";
import SocialSignUp from "../components/Authentication/SocialSignUp";
import MoveBack from "../ui/MoveBack";

function PasswordReset() {
  return (
    <div className="flex justify-center items-center h-full md:h-screen w-full bg-[#F5F5F5]">
      <MoveBack />
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full h-full">
        <SignUpBanner />
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <PasswordResetForm />
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
