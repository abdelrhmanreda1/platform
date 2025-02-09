import { useState } from "react";
import { IoClose } from "react-icons/io5";

import JobList from "../components/jobs/JobList";
import SearchFormbar from "../components/jobs/SearchFormbar";
import FilterPanel from "../components/jobs/FilterPanels";

function Jobs() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-100 relative">
      <SearchFormbar onFilterClick={() => setIsFilterOpen(true)} />
      <div className="container mx-auto py-4">
        <div className="flex justify-center items-center mt-6 gap-4">
          {/* Filter Panel */}
          <div
            className={`fixed top-0 left-0 h-screen shadow-lg md:shadow rounded-md p-4 w-80 bg-white md:bg-gray-100 transition-transform transform ${isFilterOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:w-1/4 md:block  z-50 md:z-0 overflow-y-auto md:overflow-y-visible md:h-auto scrollbar-hide`} // Added md:h-auto and md:overflow-y-visible
          >
            <button className="absolute top-4 right-4 md:hidden text-gray-600" onClick={() => setIsFilterOpen(false)}>
              <IoClose size={24} />
            </button>
            <FilterPanel />
          </div>

          {/* Overlay for small screens */}
          {isFilterOpen && <div className="fixed inset-0 w-full min-h-screen bg-black bg-opacity-50 md:hidden z-40 md:z-0" onClick={() => setIsFilterOpen(false)}></div>}

          {/* Job List */}
          <div className="w-full md:w-3/4 flex justify-center items-center">
            <JobList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
