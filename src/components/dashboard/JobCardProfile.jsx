import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const JobCardProfile = ({ job, companyProfile }) => {
  console.log(job);

  const navigate = useNavigate();
  const { role } = useAuth();
  return (
    <div className="border-2 border-[#B3C5CE] rounded-2xl p-4 w-full md:w-[320px] h-full flex flex-col">
      {" "}
      {/* h-full & flex flex-col */}
      <div className="flex items-center justify-between">
        <img src={companyProfile.profilePicture.secure_url} alt="Company Logo" className="w-20 h-20 rounded-full" />
        {/* <div className="relative flex items-center justify-center w-[72px] h-[72px] rounded-full bg-[conic-gradient(#FF6B35_80%,_#013E5D_0%)]">
          <div className="absolute w-[70%] h-[70%] bg-white rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-gray-800">80%</span>
          </div>
        </div> */}
      </div>
      <div className="flex flex-col justify-start items-start flex-grow">
        {" "}
        {/* flex-grow علشان ياخد الباقي من المساحة */}
        <h3 className={`font-semibold text-xl mt-4 ${job.jobPeriod === "PartTime" ? "text-[#FF804B]" : job.jobPeriod === "FullTime" ? "text-[#013E5D]" : "text-black"}`}>{job.jobPeriod}</h3>
        <h2 className="text-2xl font-medium my-2">{job.jobTitle}</h2>
        <p className="text-lg">{job.salary} EGP / Month</p>
      </div>
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm text-[#8D8A8A] font-medium">Company: {companyProfile.companyName}</p>
        {role === "Company" && (
          <button onClick={() => navigate(`/dashboard/jobs/${job._id}`)} className="bg-main text-white rounded-2xl px-8 py-2">
            Details
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCardProfile;
