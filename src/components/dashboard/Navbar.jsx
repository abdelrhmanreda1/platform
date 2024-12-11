import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white px-6 py-4 sticky top-0 left-0 z-50 border-b-2 border-[#B3C5CE]">
      <div className="w-[90%] mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl md:text-3xl font-bold text-main">
          LOGO
        </Link>

        <ul className="flex gap-8 text-lg text-gray-600">
          <li>
            <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? "text-main" : "hover:text-main")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/jobs" className={({ isActive }) => (isActive ? "text-main" : "hover:text-main")}>
              Jobs
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/applications" className={({ isActive }) => (isActive ? "text-main" : "hover:text-main")}>
              Applications
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-14 relative">
          <div className="relative">
            <FaBell
              className="w-6 h-6"
              style={{
                fill: "none",
                stroke: "#000000",
                strokeWidth: "23px",
              }}
            />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </div>

          <img onClick={() => navigate("/dashboard/yourProfile")} src="/profile.png" alt="Profile" className="w-10 h-10 rounded-full cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
