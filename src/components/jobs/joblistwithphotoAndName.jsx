import { useEffect } from "react";
import JobCard from "./JobCard";
import { useGetJobs, useSearchJobs } from "../../services/apiJobs";
import Spinner from "../../ui/Spinner";

const JobList = ({ searchParams, filterParams, currentPage, onPageChange }) => {
  const { data: allJobs, isLoading: isLoadingAll, error: errorAll } = useGetJobs();
  const {
    data: searchedJobs,
    isLoading: isLoadingSearch,
    error: errorSearch,
    refetch,
  } = useSearchJobs({
    minSalary: searchParams.minSalary,
    maxSalary: searchParams.maxSalary,
    page: currentPage,
    size: searchParams.size || 2,
    filters: filterParams,
  });

  const hasSearch = Object.keys(searchParams).length > 0;
  let jobs = hasSearch ? searchedJobs : allJobs;
  const isLoading = hasSearch ? isLoadingSearch : isLoadingAll;
  const error = hasSearch ? errorSearch : errorAll;

  useEffect(() => {
    if (hasSearch) {
      refetch();
    }
  }, [searchParams, filterParams, refetch, hasSearch]);

  console.log("Search Params:", searchParams);
  console.log("Filter Params:", filterParams);
  console.log("Raw Jobs Data:", jobs);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <h2 className="text-2xl font-medium mb-4">Failed to load jobs</h2>
        <p>{error.message || "Something went wrong"}</p>
      </div>
    );
  }

  if (!jobs?.data || jobs.data.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-medium mb-4">No jobs found</h2>
      </div>
    );
  }

  // تطبيق الفلاتر محليًا لو الـ API مش بيدعمها
  let filteredJobs = [...jobs.data];
  if (filterParams && Object.keys(filterParams).length > 0) {
    const { location, jobPeriod, experience, minSalary, maxSalary } = filterParams;

    if (location) {
      filteredJobs = filteredJobs.filter((job) => job.location?.toLowerCase().includes(location.toLowerCase()));
    }
    if (jobPeriod) {
      filteredJobs = filteredJobs.filter((job) => job.jobPeriod?.toLowerCase() === jobPeriod.toLowerCase());
    }
    if (experience?.length > 0) {
      filteredJobs = filteredJobs.filter((job) => experience.includes(job.experience));
    }
    if (minSalary !== null) {
      filteredJobs = filteredJobs.filter((job) => (job.salary || 0) >= minSalary);
    }
    if (maxSalary !== null) {
      filteredJobs = filteredJobs.filter((job) => (job.salary || 0) <= maxSalary);
    }
  }

  const totalPages = Math.ceil(jobs.total / (searchParams.size || 2));

  return (
    <div>
      <h2 className="text-2xl font-medium mb-4 ml-5 md:ml-0">
        All <span className="text-main">{filteredJobs.length}</span> jobs found
      </h2>
      <div className="grid w-[92%] mx-auto md:w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 justify-center">
        {filteredJobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
      {hasSearch && (
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-[#013E5D] text-white rounded-md disabled:opacity-50">
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-[#013E5D] text-white rounded-md disabled:opacity-50">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default JobList;
