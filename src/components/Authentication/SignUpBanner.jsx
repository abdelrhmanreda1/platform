import { useNavigate } from "react-router-dom";
import backgroundImage from "/Rectangle4455.png";

function SignUpBanner() {
  const navigate = useNavigate();

  return (
    <div
      className="w-full hidden md:w-3/4 text-white md:flex flex-col justify-center items-center pr-0 md:pr-[12rem]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-lg md:text-3xl font-bold mb-4">Already Signed Up?</h2>
      <p className="mb-12 text-lg font-light text-center">Log in to your account</p>
      <button onClick={() => navigate("/login")} className="border border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-[#003366] transition duration-300">
        Login
      </button>
    </div>
  );
}

export default SignUpBanner;
