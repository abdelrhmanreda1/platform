import { useEffect } from "react";
import JobCard from "./JobCard";
import { useGetJobs, useSearchJobs } from "../../services/apiJobs";
import Spinner from "../../ui/Spinner";

const JobList = ({ searchParams, filterParams, currentPage, pageSize, updateTotalItems }) => {
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
    size: pageSize,
    filters: filterParams,
  });

  const hasSearch = Object.keys(searchParams).length > 0;
  let jobs = hasSearch ? searchedJobs : allJobs;
  const isLoading = hasSearch ? isLoadingSearch : isLoadingAll;
  const error = hasSearch ? errorSearch : errorAll;

  // كل الـ hooks هنا في الأول
  useEffect(() => {
    if (hasSearch) {
      refetch();
    }
  }, [searchParams, filterParams, refetch, hasSearch]);

  useEffect(() => {
    if (jobs?.total) {
      updateTotalItems(jobs.total);
    }
  }, [jobs?.total, updateTotalItems]);

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

  // تعديل البيانات لإضافة company كـ array لو مش موجود
  const normalizedJobs = {
    ...jobs,
    data: jobs.data.map((job) => ({
      ...job,
      company: job.company || [
        {
          companyName: "Unknown Company",
          profilePicture: { secure_url: "https://res.cloudinary.com/dbdv3lubq/image/upload/v1739568352/default_duucnz.png" },
          profileId: job.companyId,
        },
      ],
    })),
  };

  let filteredJobs = [...normalizedJobs.data];
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
    </div>
  );
};

export default JobList;
