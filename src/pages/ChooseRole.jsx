import { Link, useNavigate } from "react-router-dom";

export default function ChooseRole() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Link to="/" className="fixed top-12 left-7 w-8 h-8 object-cover cursor-pointer">
        <img src="/backArrow.png" alt="back arrow" />
      </Link>
      <div className="mb-8 mt-16  lg:mt-[-20px] text-center">
        <h1 className="text-3xl font-bold text-main">LOGO</h1>
      </div>

      <h2 className="text-xl font-semibold text-textColor mb-6">Choose Your Role</h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 space-x-0  lg:space-x-6  ">
        <div className="bg-grayColor p-9 rounded-3xl cursor-pointer  shadow-md w-80 md:w-96 text-center">
          <div className="flex items-center justify-center mb-4">
            <img src="/User.png" alt="Job Seeker" className="w-16 h-16 object-cover" />
          </div>
          <h3 className="text-lg font-medium text-textColor mb-2">Job Seeker</h3>
          <p className="text-[#4D4949] w-48 mx-auto text-2nd-text-color text-xs">Discover your dream job with detailed company insights. Make empowered career choices.</p>
        </div>

        <div className="bg-grayColor p-9 rounded-3xl cursor-pointer  shadow-md w-80 md:w-96 text-center">
          <div className="flex items-center justify-center mb-4">
            <img src="/Manager.png" alt="Employer" className="w-16 h-16 object-cover" />
          </div>
          <h3 className="text-lg font-medium text-textColor mb-2">Employer</h3>
          <p className="text-[#4D4949] w-48 mx-auto text-xs">Access valuable insights to enhance your hiring process. Find the right candidates for your team.</p>
        </div>
      </div>

      <div className="flex space-x-4 mt-10 mb-7 md:mb-0">
        <button onClick={() => navigate("/login")} className="px-8 py-2 border border-main text-main  hover:text-white hover:bg-main transition duration-300   rounded-md">
          Login
        </button>
        <button onClick={() => navigate("/signup")} className="px-6 py-2 bg-main text-white hover:bg-hoverButton transition duration-300  rounded-md">
          Sign Up
        </button>
      </div>
    </div>
  );
}
