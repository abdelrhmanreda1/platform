import { useState, useEffect } from "react";
import SidebarCompany from "../components/dashboard/SidebarCompany";
import EducationSection from "../components/profile/EducationSection";
import ExperiencesSection from "../components/profile/ExperiencesSection";
import PostsUserSection from "../components/profile/PostsUserSection";
import ProfileUserCard from "../components/profile/ProfileUserCard";
import SkillsSection from "../components/profile/SkillsSection";
import { useAuth } from "../context/AuthContext";
import YourProfile from "../ui/YourProfile";
import PostItemCompany from "../components/dashboard/PostItemCompany";
import JobList from "../components/jobs/JobList";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../ui/Spinner";

function Profile() {
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  if (role === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <YourProfile />
      <div className="w-[94%] mx-auto px-4 py-8">
        {role === "Company" && (
          <div className="justify-end hidden md:flex mb-5 space-x-4">
            <button
              className={`border border-main text-main rounded-2xl px-6 py-2 transition 
              ${activeTab === "posts" ? "border-2 font-bold" : "border font-normal"}`}
              onClick={() => setActiveTab("posts")}
            >
              See Posts
            </button>
            <button
              className={`border border-main text-main rounded-2xl px-6 py-2 transition 
              ${activeTab === "jobs" ? "border-2 font-bold" : "border font-normal"}`}
              onClick={() => setActiveTab("jobs")}
            >
              See Jobs
            </button>
            <button
              className={`border border-main text-main rounded-2xl px-6 py-2 transition 
              ${activeTab === "archived" ? "border-2 font-bold" : "border font-normal"}`}
              onClick={() => setActiveTab("archived")}
            >
              See Archived
            </button>
            <button
              className={`border border-main text-main rounded-2xl px-6 py-2 transition 
              ${activeTab === "create" ? "border-2 font-bold" : "border font-normal"}`}
              onClick={() => {
                setActiveTab("create");
                navigate("/dashboard/jobs/post");
              }}
            >
              Create Job
            </button>
          </div>
        )}

        <div>
          <div>{role !== "Company" ? <ProfileUserCard /> : <SidebarCompany activeTab={activeTab} setActiveTab={setActiveTab} />}</div>
        </div>
      </div>
    </>
  );
}

export default Profile;
