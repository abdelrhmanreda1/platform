import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBell, FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useProfileData } from "../../services/apiProfile";

const Navbar = () => {
  const navigate = useNavigate();
  const { role, logout, token } = useAuth();
  const { data: user, isLoading } = useProfileData({ key: token }); // نستخدم الـ token كـ key

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsDropdownOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/dashboard/yourProfile");
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white px-6 py-4 sticky top-0 left-0 z-50 border-b-2 border-[#B3C5CE]">
      <div className="w-[90%] mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl md:text-3xl font-bold text-main font-[Pacifico]">
          HIRO
        </Link>

        <ul className="hidden md:flex gap-8 text-lg text-gray-600">
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
            <NavLink to="/dashboard/community" className={({ isActive }) => (isActive ? "text-main" : "hover:text-main")}>
              Community
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/applications" className={({ isActive }) => (isActive ? "text-main" : "hover:text-main")}>
              Applications
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-6 relative">
          <div className="relative">
            <FaBell className="w-6 h-6 text-gray-600 hover:text-main transition-colors" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </div>

          <div className="relative">
            {role === "Company" ? <img onClick={toggleDropdown} src={user?.data.profilePicture?.secure_url} alt="Company Profile" className="w-10 h-10 rounded-full shadow-sm cursor-pointer hover:ring-2 hover:ring-main transition-all" /> : <img onClick={toggleDropdown} src={user?.data.profilePicture?.secure_url} alt="User Profile" className="w-10 h-10 rounded-full shadow-sm cursor-pointer hover:ring-2 hover:ring-main transition-all" />}

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-xl z-50 border border-gray-100 overflow-hidden">
                <button onClick={handleProfileClick} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-main transition-colors duration-200">
                  <FaUser className="w-4 h-4 text-gray-500" />
                  <span>Profile</span>
                </button>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors duration-200 border-t border-gray-100">
                  <FaSignOutAlt className="w-4 h-4 text-gray-500" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          <button onClick={toggleMenu} className="md:hidden text-gray-600 hover:text-main transition-colors">
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={toggleMenu}>
        <div className={`mobile-menu fixed top-0 right-0 w-2/3 h-full bg-white shadow-lg transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} p-6`} onClick={(e) => e.stopPropagation()}>
          <button onClick={toggleMenu} className="absolute top-4 right-4 text-gray-600 hover:text-main transition-colors">
            <FaTimes className="w-6 h-6" />
          </button>

          <ul className="flex flex-col gap-6 text-lg text-gray-600 mt-10">
            <li>
              <NavLink to="/dashboard" end onClick={toggleMenu} className={({ isActive }) => (isActive ? "text-main" : "hover:text-main")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/jobs" onClick={toggleMenu} className={({ isActive }) => (isActive ? "text-main" : "hover:text-main")}>
                Jobs
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/community" className={({ isActive }) => (isActive ? "text-main" : "hover:text-main")}>
                Community
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/applications" onClick={toggleMenu} className={({ isActive }) => (isActive ? "text-main" : "hover:text-main")}>
                Applications
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
