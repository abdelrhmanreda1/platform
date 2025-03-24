import { useState } from "react";
import FilterSidebar from "../components/Applications/FilterSidebar";
import ApplicationCard from "../components/Applications/ApplicationCard";

const applications = [
  { id: 1, company: "Nomad", position: "Frontend Developer", date: "24 July 2024", status: "In Review", logo: "/nomad-company.svg" },
  { id: 2, company: "Packer", position: "Frontend Developer", date: "24 July 2024", status: "Shortlisted", logo: "/red-company.svg" },
  { id: 3, company: "Udacity", position: "Frontend Developer", date: "24 July 2024", status: "Offered", logo: "/Company-Logo-suggestion.svg" },
  { id: 4, company: "Divvy", position: "Frontend Developer", date: "24 July 2024", status: "Interviewing", logo: "/black-conpany.svg" },
  { id: 5, company: "Digital Ocean", position: "Frontend Developer", date: "24 July 2024", status: "Unsuitable", logo: "/red-icon-conpany.svg" },
  { id: 6, company: "Nomad", position: "Frontend Developer", date: "24 July 2024", status: "In Review", logo: "/nomad-company.svg" },
  { id: 7, company: "Packer", position: "Frontend Developer", date: "24 July 2024", status: "Shortlisted", logo: "/red-company.svg" },
  { id: 8, company: "Udacity", position: "Frontend Developer", date: "24 July 2024", status: "Offered", logo: "/Company-Logo-suggestion.svg" },
  { id: 9, company: "Divvy", position: "Frontend Developer", date: "24 July 2024", status: "Interviewing", logo: "/black-conpany.svg" },
  { id: 10, company: "Digital Ocean", position: "Frontend Developer", date: "24 July 2024", status: "Unsuitable", logo: "/red-icon-conpany.svg" },
  { id: 11, company: "Udacity", position: "Frontend Developer", date: "24 July 2024", status: "Offered", logo: "/Company-Logo-suggestion.svg" },
  { id: 12, company: "Divvy", position: "Frontend Developer", date: "24 July 2024", status: "Interviewing", logo: "/black-conpany.svg" },
  { id: 13, company: "Digital Ocean", position: "Frontend Developer", date: "24 July 2024", status: "Unsuitable", logo: "/red-icon-conpany.svg" },
  { id: 14, company: "Nomad", position: "Frontend Developer", date: "24 July 2024", status: "In Review", logo: "/nomad-company.svg" },
  { id: 15, company: "Packer", position: "Frontend Developer", date: "24 July 2024", status: "Shortlisted", logo: "/red-company.svg" },
];

const Applications = () => {
  const [filter, setFilter] = useState("All");

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});
  const filters = [{ name: "All", count: applications.length }, ...Object.entries(statusCounts).map(([status, count]) => ({ name: status, count }))];
  const filteredApps = filter === "All" ? applications : applications.filter((app) => app.status === filter);
  return (
    <div className="w-full md:w-[90%] mx-auto">
      <h2 className="font-semibold text-xl px-5 py-2 mt-6">Keep it up, Mustafa</h2>

      <div className="flex flex-col-reverse  md:flex-row gap-8 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">{filteredApps.length > 0 ? filteredApps.map((app) => <ApplicationCard key={app.id} data={app} />) : <p className="text-gray-500 text-center col-span-full">No applications found.</p>}</div>
        <FilterSidebar setFilter={setFilter} currentFilter={filter} filters={filters} />
      </div>
    </div>
  );
};

export default Applications;
