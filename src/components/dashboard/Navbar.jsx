import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // دالة لتغيير حالة القائمة
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="bg-white px-6 py-4 sticky top-0 left-0 z-50 border-b-2 border-[#B3C5CE]">
      <div className="w-[90%] mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/dashboard" className="text-2xl md:text-3xl font-bold text-main">
          LOGO
        </Link>

        {/* القائمة العادية للكمبيوتر */}
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
            <NavLink to="/dashboard/applications" className={({ isActive }) => (isActive ? "text-main" : "hover:text-main")}>
              Applications
            </NavLink>
          </li>
        </ul>

        {/* أيقونات الإشعارات والصورة */}
        <div className="flex items-center gap-6 relative">
          <div className="relative">
            <FaBell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </div>

          <img onClick={() => navigate("/dashboard/yourProfile")} src="/profile.png" alt="Profile" className="w-10 h-10 rounded-full cursor-pointer" />

          {/* زر القائمة للموبايل */}
          <button onClick={toggleMenu} className="md:hidden">
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* القائمة للموبايل */}
      <div className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={toggleMenu}>
        <div
          className={`mobile-menu fixed top-0 right-0 w-2/3 h-full bg-white shadow-lg transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} p-6`}
          onClick={(e) => e.stopPropagation()} // يمنع إغلاق القائمة عند الضغط داخلها
        >
          {/* زر الإغلاق داخل القائمة */}
          <button onClick={toggleMenu} className="absolute top-4 right-4 text-gray-600">
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
