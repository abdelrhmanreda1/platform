import { useNavigate } from "react-router-dom";
import backgroundImage from "/Rectangle-right.png";
import LoginStatement from "../components/Authentication/loginStatement";
import MoveBack from "../ui/MoveBack";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-white">
      <MoveBack />
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
        <LoginStatement />
      </div>
      <div
        className="w-full hidden md:flex md:w-3/4 text-white flex-col justify-center items-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-lg pl-28 md:text-3xl font-bold mb-4">Don’t Have An Account Yet?</h2>
        <p className="mb-12 pl-28 font-light text-lg text-center">Let’s get you all set up so you can start</p>
        <button onClick={() => navigate("/signup")} className="ml-28 border border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-[#003366] transition duration-300">
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Login;
