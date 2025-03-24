import Spinner from "../../ui/Spinner";
import JobCardProfile from "./JobCardProfile";
import { useProfileData } from "../../services/apiProfile";

const JobListProfile = () => {
  const { data: Jobprofile, isLoading, error } = useProfileData();

  const companyProfile = Jobprofile.data;

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

  if (!Jobprofile.data.jobPosts?.length || Jobprofile.data.jobPosts?.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl text-main mt-12 font-medium mb-4">No jobs found</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-medium mb-4 ml-5 md:ml-0">
        All <span className="text-main">{Jobprofile.data.jobPosts?.length || ""}</span> jobs found
      </h2>
      <div className="grid w-[92%]  mx-auto md:w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 justify-center">
        {Jobprofile.data.jobPosts.map((job) => (
          <JobCardProfile key={job.id} job={job} companyProfile={companyProfile} />
        ))}
      </div>
    </div>
  );
};

export default JobListProfile;
