import { useState } from "react";

const FilterPanel = ({ onApplyFilter }) => {
  const [location, setLocation] = useState("");
  const [jobPeriod, setJobPeriod] = useState("");
  const [experience, setExperience] = useState([]);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const handleJobPeriodChange = (type) => {
    setJobPeriod(type);
  };

  const handleExperienceChange = (level) => {
    setExperience((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]));
  };

  const handleApply = () => {
    const filters = {
      location: location || "",
      jobPeriod: jobPeriod || null,
      experience: experience.length > 0 ? experience : null,
      minSalary: minSalary ? Number(minSalary) : null,
      maxSalary: maxSalary ? Number(maxSalary) : null,
    };
    onApplyFilter(filters);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Filter By</h2>
      <div className="bg-[#B3C5CE] p-5 rounded-2xl">
        <div className="mb-4">
          <label className="block font-semibold mt-2 text-[18px]">Location</label>
          <input type="text" placeholder="e.g. Cairo" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full mt-1 p-2 border outline-none rounded-md" />
        </div>
        <div className="h-[1px] bg-[#1C1A1A] my-7 w-[70%] mx-auto"></div>
        <div className="mb-4">
          <h3 className="block font-semibold mb-6 text-[18px]">Job Type</h3>
          <div className="mt-2 flex flex-col gap-2">
            <label className="flex items-center  gap-2">
              <input type="radio" name="jobPeriod" onChange={() => handleJobPeriodChange("Hybrid")} checked={jobPeriod === "Hybrid"} className="w-5 h-5 accent-[#013E5D]  cursor-pointer transition-transform duration-200" />
              Hybrid
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="jobPeriod" onChange={() => handleJobPeriodChange("FullTime")} checked={jobPeriod === "FullTime"} className="w-5 h-5   accent-[#013E5D] cursor-pointer transition-transform duration-200" />
              Full Time
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="jobPeriod" onChange={() => handleJobPeriodChange("PartTime")} checked={jobPeriod === "PartTime"} className="w-5 h-5 accent-[#013E5D] cursor-pointer transition-transform duration-200" />
              Part Time
            </label>
          </div>
        </div>
        <div className="h-[1px] bg-[#1C1A1A] my-7 w-[70%] mx-auto"></div>
        <div className="mb-4">
          <h3 className="block font-semibold mb-6 text-[18px]">Experience</h3>
          <div className="mt-2 flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" onChange={() => handleExperienceChange("Fresher")} checked={experience.includes("Fresher")} className="w-5 h-5 accent-[#013E5D] cursor-pointer transition-transform duration-200" />
              Fresher
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" onChange={() => handleExperienceChange("Intermediate")} checked={experience.includes("Intermediate")} className="w-5 h-5 accent-[#013E5D] cursor-pointer transition-transform duration-200" />
              Intermediate
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" onChange={() => handleExperienceChange("Expert")} checked={experience.includes("Expert")} className="w-5 h-5 accent-[#013E5D] cursor-pointer transition-transform duration-200" />
              Expert
            </label>
          </div>
        </div>
        <div className="h-[1px] bg-[#1C1A1A] my-7 w-[70%] mx-auto"></div>
        <div className="mb-4">
          <label className="block font-semibold mb-6 text-[18px]">Salary Range (EGP)</label>
          <div className="flex gap-3 mb-4">
            <input type="number" placeholder="Min" value={minSalary} onChange={(e) => setMinSalary(e.target.value)} className="w-[45%] p-2 border outline-none rounded-md" min="0" />
            <span>-</span>
            <input type="number" placeholder="Max" value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} className="w-[45%] p-2 border outline-none rounded-md" min="0" />
          </div>
          <div className="h-[1px] bg-[#1C1A1A] my-7 w-[70%] mx-auto"></div>
          <button className="w-full bg-[#013E5D] text-white py-3 rounded-2xl font-semibold mt-4" onClick={handleApply}>
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
