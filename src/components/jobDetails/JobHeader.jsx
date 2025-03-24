import { useState, useRef, useEffect } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const JobHeader = ({ title, company, date, jobType, location, onEdit, onDelete }) => {
  const { role } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="text-white mb-20 py-14 flex flex-col justify-center items-center rounded-md relative"
      style={{
        backgroundImage: "url('/rect1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-2xl font-bold mb-4">Job Details</h1>
      <p className="text-gray-500 mt-2 text-lg">
        {date} by <span className="font-semibold text-white text-xl">{company}</span>
      </p>
      <h2 className="text-xl font-semibold mt-4">{title}</h2>

      {role === "Company" && (
        <div className="absolute top-12 right-16" ref={dropdownRef}>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-white hover:bg-gray-700 p-2 rounded-full transition">
            <FaEllipsisV size={24} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 py-6 bg-white rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  onEdit();
                }}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 w-full text-lg font-medium"
              >
                <FaEdit size={20} className="mr-2 text-[#FF804B]" />
                Edit job post
              </button>
              <hr />
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  onDelete(); // Call the onDelete callback to show the confirmation modal
                }}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 w-full text-lg font-medium"
              >
                <FaTrash size={16} className="mr-2 text-[#DF2424]" />
                Delete job post
              </button>
              <hr />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobHeader;
