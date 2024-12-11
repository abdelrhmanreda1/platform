import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="border-2 border-[#B3C5CE] rounded-2xl p-4 w-80 text-center ">
      <div className="flex items-center justify-between">
        <img src="/dell.svg" alt="Company Logo" className="w-20 h-20" />
        <div className="relative flex items-center justify-center w-[72px] h-[72px] rounded-full bg-[conic-gradient(#FF6B35_80%,_#013E5D_0%)]">
          <div className="absolute w-[70%] h-[70%] bg-white rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-gray-800">80%</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start">
        <h3 className={`font-semibold text-xl mt-4 ${job.type === "Part-time" ? "text-[#FF804B]" : job.type === "Full-time" ? "text-[#013E5D]" : "text-black"}`}>{job.type}</h3>

        <h2 className="text-2xl font-medium my-2">{job.title}.</h2>
        <p className="text-lg">{job.salary}</p>
      </div>
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm text-[#8D8A8A] font-medium"> Company: {job.company}</p>
        <button
          onClick={() => {
            navigate(`/dashboard/jobs/${job.id}`);
          }}
          className="bg-main text-white rounded-2xl px-8 py-2 "
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;
