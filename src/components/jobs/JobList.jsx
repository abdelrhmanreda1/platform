import JobCard from "./JobCard";

const JobList = () => {
  const jobs = [
    { id: 1, title: "Animator & 3D Artist", type: "Full-time", salary: "700-800 EGP/hour", company: "DELL" },
    { id: 2, title: "Web Designer", type: "Part-time", salary: "7500-8000 EGP/month", company: "DELL" },
    { id: 3, title: "Animator & 3D Artist", type: "Full-time", salary: "700-800 EGP/hour", company: "DELL" },
    { id: 4, title: "Web Designer", type: "Part-time", salary: "7500-8000 EGP/month", company: "DELL" },
    { id: 5, title: "Animator & 3D Artist", type: "Full-time", salary: "700-800 EGP/hour", company: "DELL" },
    { id: 6, title: "Web Designer", type: "Part-time", salary: "7500-8000 EGP/month", company: "DELL" },
    { id: 7, title: "Animator & 3D Artist", type: "Full-time", salary: "700-800 EGP/hour", company: "DELL" },
    { id: 8, title: "Web Designer", type: "Part-time", salary: "7500-8000 EGP/month", company: "DELL" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-medium mb-4">
        All <span className="text-main">{jobs.length}</span> jobs found
      </h2>
      <div className="grid w-[92%] md:w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 justify-center">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
