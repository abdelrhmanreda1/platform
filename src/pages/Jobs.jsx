import FilterPanel from "../components/jobs/FilterPanel";
import JobList from "../components/jobs/JobList";
import SearchBar from "../components/jobs/Searchbar";

function Jobs() {
  return (
    <div className="min-h-screen bg-gray-100">
      <SearchBar />
      <div className="container mx-auto  py-4">
        <div className="flex mt-6">
          <FilterPanel />
          <JobList />
        </div>
      </div>
    </div>
  );
}

export default Jobs;
