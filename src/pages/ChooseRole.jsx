import { Link } from "react-router-dom";

export default function ChooseRole() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Link to="/" className="fixed top-12 left-7 w-8 h-8 object-cover cursor-pointer">
        <img src="/backArrow.png" alt="back arrow" />
      </Link>
      <div className="mb-8 mt-16 text-center">
        <h1 className="text-3xl font-bold text-main">LOGO</h1>
      </div>

      <h2 className="text-2xl font-semibold text-textColor mb-11">Choose Your Role</h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 space-x-0 lg:space-x-6">
        
        <Link to="/signup/JobSeeker">
          <div className="bg-grayColor p-5 rounded-3xl cursor-pointer shadow-md w-80 text-center">
            <div className="flex items-center justify-center mb-4">
              <img src="/User.png" alt="Job Seeker" className="w-16 h-16 object-cover" />
            </div>
            <h3 className="text-xl font-medium text-textColor mb-2">Job Seeker</h3>
            <p className="text-[#4D4949] w-56 mx-auto text-2nd-text-color text-[14px]">Discover your dream job with detailed company insights. Make empowered career choices.</p>
          </div>
        </Link>
        <Link to="/signup/Employee">
          <div className="bg-grayColor p-5 rounded-3xl cursor-pointer shadow-md w-80 text-center">
            <div className="flex items-center justify-center mb-4">
              <img src="/Manager.png" alt="Employer" className="w-16 h-16 object-cover" />
            </div>
            <h3 className="text-xl font-medium text-textColor mb-2">Employee</h3>
            <p className="text-[#4D4949] w-56 mx-auto text-[14px]">Access valuable insights to enhance your hiring process. Find the right candidates for your team.</p>
          </div>
        </Link>

      
        <Link to="/signup/Company">
          <div className="bg-grayColor p-5 rounded-3xl cursor-pointer shadow-md w-80 text-center">
            <div className="flex items-center justify-center mb-4">
              <img src="/Manager.png" alt="Employer" className="w-16 h-16 object-cover" />
            </div>
            <h3 className="text-xl font-medium text-textColor mb-2">Company</h3>
            <p className="text-[#4D4949] w-56 mx-auto text-[14px]">Post job openings, find top candidates, and manage applications effortlessly to build your dream team.</p>
          </div>
        </Link>
      </div>

      <h4 className="mt-24 text-xl font-semibold">
        Already Have An Account?{" "}
        <Link to="/login" className="underline text-main hover:text-[#FF6B35] transition duration-300">
          Login
        </Link>
      </h4>
    </div>
  );
}
