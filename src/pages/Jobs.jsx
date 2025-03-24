import { useState } from "react";
import { IoClose } from "react-icons/io5";
import JobList from "../components/jobs/JobList";
import SearchFormbar from "../components/jobs/SearchFormbar";
import FilterPanel from "../components/jobs/FilterPanels";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

function Jobs() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({});
  const [filterParams, setFilterParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalItems, setTotalItems] = useState(0);

  const handleSearch = (searchInput) => {
    if (!searchInput.minSalary || !searchInput.maxSalary) {
      toast.error("Please provide both minimum and maximum salary!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    const newSearchParams = {
      minSalary: searchInput.minSalary,
      maxSalary: searchInput.maxSalary,
      location: searchInput.location || "",
      page: currentPage,
      size: pageSize,
    };
    console.log("New Search Params:", newSearchParams);
    setSearchParams(newSearchParams);
  };

  const handleApplyFilter = (filters) => {
    console.log("Applied Filters:", filters);
    setFilterParams(filters);
    setIsFilterOpen(false);
  };

  const handlePageChange = (selectedPage) => {
    const newPage = selectedPage.selected + 1;
    setCurrentPage(newPage);
    setSearchParams((prev) => ({
      ...prev,
      page: newPage,
      size: pageSize,
    }));
  };

  const handlePageSizeChange = (event) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    setCurrentPage(1);
    setSearchParams((prev) => ({
      ...prev,
      page: 1,
      size: newSize,
    }));
  };

  const updateTotalItems = (total) => {
    setTotalItems(total);
  };

  const pageCount = Math.ceil(totalItems / pageSize);

  return (
    <div className="min-h-screen w-full relative">
      <SearchFormbar onFilterClick={() => setIsFilterOpen(true)} onSearch={handleSearch} />
      <div className="container mx-auto py-4">
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className={`fixed top-0 left-0 h-screen shadow-lg md:shadow-none p-4 w-80 bg-white transition-transform transform ${isFilterOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:w-1/4 md:block z-50 md:z-0 overflow-y-auto scrollbar-hide md:h-auto`}>
            <button className="absolute top-4 right-4 md:hidden text-gray-600" onClick={() => setIsFilterOpen(false)}>
              <IoClose size={24} />
            </button>
            <FilterPanel onApplyFilter={handleApplyFilter} />
          </div>
          {isFilterOpen && <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 md:hidden z-40" onClick={() => setIsFilterOpen(false)}></div>}
          <div className="w-full mx-auto md:w-3/4">
            <JobList searchParams={searchParams} filterParams={filterParams} currentPage={currentPage} pageSize={pageSize} updateTotalItems={updateTotalItems} />
            {Object.keys(searchParams).length > 0 && (
              <div className="mt-8 flex flex-col items-center gap-6">
                {/* Page Size Selector */}
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium text-gray-700">Show:</span>
                  <select id="pageSize" value={pageSize} onChange={handlePageSizeChange} className="p-2 bg-white border border-[#B3C5CE] rounded-lg text-[#013E5D] font-semibold focus:ring-2 focus:ring-[#013E5D] focus:outline-none">
                    <option value={2}>2 per page</option>
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                  </select>
                </div>
                {/* Pagination */}
                <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} breakLabel={"..."} pageCount={pageCount} marginPagesDisplayed={2} pageRangeDisplayed={5} onPageChange={handlePageChange} containerClassName={"flex items-center gap-2"} pageClassName={"w-10 h-10 flex items-center justify-center rounded-full border border-[#B3C5CE] text-[#013E5D] hover:bg-[#013E5D] hover:text-white transition-colors duration-200"} activeClassName={"bg-[#013E5D] text-white border-[#013E5D]"} previousClassName={"px-4 py-2 rounded-full border border-[#B3C5CE] text-[#013E5D] hover:bg-[#013E5D] hover:text-white transition-colors duration-200"} nextClassName={"px-4 py-2 rounded-full border border-[#B3C5CE] text-[#013E5D] hover:bg-[#013E5D] hover:text-white transition-colors duration-200"} breakClassName={"w-10 h-10 flex items-center justify-center text-[#013E5D]"} disabledClassName={"opacity-50 cursor-not-allowed"} forcePage={currentPage - 1} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
