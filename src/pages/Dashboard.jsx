import MainContent from "../components/dashboard/MainContent";
import RecommendedJobs from "../components/dashboard/RecommendedJobs";
import Sidebar from "../components/dashboard/Sidebar";

const Dashboard = () => {
  return (
    <div className=" min-h-screen">
      <div className="grid grid-cols-12 gap-4 px-6 py-4 w-[90%] mx-auto mt-9">
        <div className="col-span-3">
          <Sidebar />
        </div>
        <div className="col-span-6">
          <MainContent />
        </div>
        <div className="col-span-3">
          <RecommendedJobs />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
