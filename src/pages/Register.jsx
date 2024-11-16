import RegisterForm from "../components/Authentication/RegisterForm";
import SignUpBanner from "../components/Authentication/SignUpBanner";
import SocialSignUp from "../components/Authentication/SocialSignUp";
import MoveBack from "../ui/MoveBack";

function Register() {
  return (
    <div className="flex justify-center items-center h-full md:h-screen w-full bg-[#F5F5F5]">
      <MoveBack />
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full h-full">
        <SignUpBanner />
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="w-[90%] md:w-[60%] mx-auto">
            <div className="flex mt-14 md:mt-7 flex-col justify-center items-center gap-4">
              <h1 className="text-3xl font-bold text-main">LOGO</h1>
              <h4 className="text-2xl font-bold text-[#000000] mb-8">Let’s get started!</h4>
            </div>
            <RegisterForm />
            <SocialSignUp />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
