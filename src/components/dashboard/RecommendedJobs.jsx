import { useNavigate } from "react-router-dom";
import JobCard from "./JobCard";

const RecommendedJobs = () => {
  const navigate = useNavigate();
  const colors = ["#338384BF", "#F36072BF", "#60F3C0BF", "#6067F3BF", "#FFD037BF", "#613384BF"];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Recommended Jobs</h2>
      {colors.map((color, index) => (
        <JobCard key={index} borderColor={color} />
      ))}
      <button onClick={() => navigate("jobs")} className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg shadow-[0_0_10px_5px_rgba(1,52,83,0.5)] bg-white transition-all duration-300 hover:shadow-[0_0_15px_7px_rgba(1,52,83,0.6)] hover:bg-[#F5F5F5]">
        Show all jobs <img src="/arrowicon.png" />
      </button>
    </div>
  );
};

export default RecommendedJobs;
