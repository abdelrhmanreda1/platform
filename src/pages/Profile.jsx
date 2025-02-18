import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

function Profile() {
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");
  const navigate = useNavigate();
  return (
    <>
      <YourProfile />
      <div className=" w-[94%] mx-auto px-4 py-8">
        {role === "Company" && (
          <div className=" justify-end hidden md:flex  mb-5  space-x-4">
            <button
              className={`border border-main text-main rounded-2xl px-6 py-2 transition 
              ${activeTab === "posts" ? "border-2 font-bold" : "border font-normal"}`}
              onClick={() => setActiveTab("posts")}
            >
              See Posts
            </button>

            <button
              className={`border border-main text-main rounded-2xl px-6 py-2 transition 
              ${activeTab === "jobs" ? "border-2  font-bold" : "border font-normal"}`}
              onClick={() => setActiveTab("jobs")}
            >
              See Jobs
            </button>
            <button
              className={`border border-main text-main rounded-2xl px-6 py-2 transition 
              ${activeTab === "create" ? "border-2  font-bold" : "border font-normal"}`}
              onClick={() => {
                setActiveTab("create");
                navigate("/dashboard/jobs/post");
              }}
            >
              create Job
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            {role !== "Company" && <ProfileUserCard />}
            {role === "Company" && <SidebarCompany />}
          </div>

          <div className="col-span-2">
            {role === "Company" && (
              <div className=" justify-end flex md:hidden  mb-5  space-x-4">
                <button
                  className={`border border-main text-main rounded-2xl px-6 py-2 transition 
              ${activeTab === "posts" ? "border-2 font-bold" : "border font-normal"}`}
                  onClick={() => setActiveTab("posts")}
                >
                  See Posts
                </button>

                <button
                  className={`border border-main text-main rounded-2xl px-6 py-2 transition 
              ${activeTab === "jobs" ? "border-2  font-bold" : "border font-normal"}`}
                  onClick={() => setActiveTab("jobs")}
                >
                  See Jobs
                </button>
              </div>
            )}

            {role === "Company" ? (
              activeTab === "posts" ? (
                <PostItemCompany />
              ) : (
                <JobList />
              )
            ) : (
              <>
                <ExperiencesSection />
                <EducationSection />
                <PostsUserSection />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
