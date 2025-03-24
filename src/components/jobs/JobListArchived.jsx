import { useGetArchivedJobs } from "../../services/apiJobs";
import JobCardArchived from "./JobCardArchived";
import Spinner from "../../ui/Spinner";

const JobListArchived = () => {
  const { data: archivedJobs, isLoading, error } = useGetArchivedJobs();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  // لو الـ error بيقول "Job posts are not found"، نعرض "No archived jobs found"
  if (archivedJobs === undefined) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-medium mb-4 text-main">No archived jobs found</h2>
      </div>
    );
  }

  // أي error تاني غير "Job posts are not found"
  if (error) {
    return (
      <div className="text-center text-red-500">
        <h2 className="text-2xl font-medium mb-4">Failed to load archived jobs</h2>
        <p>{error.message || "Something went wrong"}</p>
      </div>
    );
  }

  // لو مفيش داتا أو الداتا فاضية
  if (!archivedJobs?.data || archivedJobs.data.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-medium mb-4">No archived jobs found</h2>
      </div>
    );
  }

  // تعديل البيانات لإضافة company كـ array لو مش موجود
  const normalizedJobs = {
    ...archivedJobs,
    data: archivedJobs.data.map((job) => ({
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

  return (
    <div>
      <h2 className="text-2xl font-medium mb-4 ml-5 md:ml-0">
        All <span className="text-main">{normalizedJobs.data.length}</span> archived jobs found
      </h2>
      <div className="grid w-[92%] mx-auto md:w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 justify-center">
        {normalizedJobs.data.map((job) => (
          <JobCardArchived key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobListArchived;
