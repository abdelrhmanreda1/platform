import { useState } from "react";
import { FiFilter } from "react-icons/fi";

const SearchFormbar = ({ onFilterClick, onSearch }) => {
  const [location, setLocation] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const handleSearch = () => {
    onSearch({
      location,
      minSalary: Number(minSalary),
      maxSalary: Number(maxSalary),
    });
  };

  return (
    <div
      className="text-white py-14 flex flex-col justify-center items-center rounded-md relative"
      style={{
        backgroundImage: "url('/rect1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl font-bold mb-3 ml-[-25px] md:ml-0">Job Search</h1>
      <div className="mt-4 flex flex-col md:flex-row items-center w-[80%] md:w-[60%]  mx-auto relative gap-4">
        <input type="text" placeholder="Location (e.g. Cairo)" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full text-gray-600 p-3 rounded-2xl placeholder:text-[12px] md:placeholder:text-base border-none outline-none" />
        <div className="flex gap-2 w-full">
          <input type="number" placeholder="Min Salary" value={minSalary} onChange={(e) => setMinSalary(e.target.value)} className="w-[50%] text-gray-600 p-3 rounded-2xl placeholder:text-[12px] md:placeholder:text-base border-none outline-none" min="0" />
          <input type="number" placeholder="Max Salary" value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} className="w-[50%] text-gray-600 p-3 rounded-2xl placeholder:text-[12px] md:placeholder:text-base border-none outline-none" min="0" />
        </div>
        <button onClick={handleSearch} className="w-full md:w-auto rounded-2xl py-[10px] bg-main shadow-md border-2 border-gray-200 text-white px-6 md:px-12">
          Search
        </button>
        {/* Filter Icon */}
        <button className="absolute top-[-40px] right-[-33px] text-white md:hidden" onClick={onFilterClick}>
          <img className="rounded-2xl" src="/filter.png" alt="filter icon" />
        </button>
      </div>
    </div>
  );
};

export default SearchFormbar;
