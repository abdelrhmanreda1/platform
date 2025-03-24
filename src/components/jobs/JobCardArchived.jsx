import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useArchiveJob } from "../../services/apiJobs";

const JobCardArchived = ({ job }) => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mutate: archiveJob, isLoading } = useArchiveJob();

  const handleArchive = () => {
    archiveJob(job._id, {
      onSuccess: () => {
        setIsMenuOpen(false);
      },
    });
  };

  return (
    <div className="border-2 border-[#B3C5CE] rounded-2xl p-4 w-full h-full flex flex-col relative">
      <div className="flex items-center justify-between">
        <img src={job.company[0].profilePicture.secure_url} alt="Company Logo" className="w-20 h-20 rounded-full shadow-sm" />
      </div>
      <div className="flex flex-col justify-start items-start flex-grow">
        <h3 className={`font-semibold text-xl mt-4 ${job.jobPeriod === "PartTime" ? "text-[#FF804B]" : job.jobPeriod === "FullTime" ? "text-[#013E5D]" : "text-black"}`}>{job.jobPeriod}</h3>
        <h2 className="text-2xl font-medium my-2">{job.jobTitle}</h2>
        <p className="text-lg">{job.salary} EGP / Month</p>
      </div>
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm text-[#8D8A8A] font-medium">Company: {job.company[0].companyName}</p>
        <button onClick={() => navigate(`/dashboard/jobs/${job._id}`)} className="bg-main text-white rounded-2xl px-8 py-2">
          {role === "Company" ? "Details" : "Apply"}
        </button>
      </div>

      {/* أيقونة الـ 3 نقط والـ Dropdown */}
      {role === "Company" && (
        <div className="absolute top-4 right-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-[#013E5D] focus:outline-none" disabled={isLoading}>
            <BsThreeDotsVertical size={20} />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-[#B3C5CE] rounded-lg shadow-lg z-10">
              <button onClick={handleArchive} className="w-full text-left px-4 py-2 text-[#013E5D] hover:bg-[#013E5D] hover:text-white rounded-lg transition-colors duration-200" disabled={isLoading}>
                Un Archive
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobCardArchived;
