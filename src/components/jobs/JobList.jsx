import JobCard from "./JobCard";

const JobList = () => {
  const jobs = [
    {
      id: 1,
      title: "Animator & 3D Artist",
      type: "Full-time",
      salary: "700-800 EGP/hour",
      company: "DELL",
    },
    {
      id: 2,
      title: "Web Designer",
      type: "Part-time",
      salary: "7500-8000 EGP/month",
      company: "DELL",
    },
    {
      id: 3,
      title: "Animator & 3D Artist",
      type: "Full-time",
      salary: "700-800 EGP/hour",
      company: "DELL",
    },
    {
      id: 4,
      title: "Web Designer",
      type: "Part-time",
      salary: "7500-8000 EGP/month",
      company: "DELL",
    },
    {
      id: 5,
      title: "Animator & 3D Artist",
      type: "Full-time",
      salary: "700-800 EGP/hour",
      company: "DELL",
    },
    {
      id: 6,
      title: "Web Designer",
      type: "Part-time",
      salary: "7500-8000 EGP/month",
      company: "DELL",
    },
    {
      id: 7,
      title: "Animator & 3D Artist",
      type: "Full-time",
      salary: "700-800 EGP/hour",
      company: "DELL",
    },
    {
      id: 8,
      title: "Web Designer",
      type: "Part-time",
      salary: "7500-8000 EGP/month",
      company: "DELL",
    },
  ];

  return (
    <div className="flex-1">
      <h2 className="text-2xl font-medium mb-4">
        All <span className="text-main">{jobs.length} </span> jobs found
      </h2>
      <div className="grid  grid-cols-3 gap-4  ">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
