import MainContent from "../components/dashboard/MainContent";

import PostUserBox from "../components/dashboard/PostUserBox";
import RecommendedJobs from "../components/dashboard/RecommendedJobs";
// import SidebarCompany from "../components/dashboard/SidebarCompany";

import SidebarUser from "../components/dashboard/SidebarUser";
// import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  // const { role } = useAuth();
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 px-4  md:px-6 py-4 w-full md:w-[90%] md:mx-auto mt-2 md:mt-9">
        <div className="hidden sm:block sm:col-span-3">
          {/* {role === "Company" ? <SidebarCompany /> : <SidebarUser />} */}
          <SidebarUser />
        </div>

        <div className="col-span-1 sm:col-span-6">
          <PostUserBox />
          <span className="block md:hidden">
            <RecommendedJobs />
          </span>
          <MainContent />
        </div>

        <div className="hidden md:flex col-span-1 sm:col-span-3">
          <RecommendedJobs />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
