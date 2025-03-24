import { useState } from "react";
import EditProfileCompany from "../AllEdit/EditProfileCompany";
import { useAuth } from "../../context/AuthContext";
import PostItemCompany from "./PostItemCompany";
import { useNavigate } from "react-router-dom";
import { useProfileData } from "../../services/apiProfile";
import Spinner from "../../ui/Spinner";
import JobListProfile from "./JobListProfile";
import JobListArchived from "../jobs/JobListArchived";

function SidebarCompany({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const { role } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const { data: companyData, isLoading, error } = useProfileData();

  const defaultCompanyData = {
    companyName: "Company Name",
    phone: "+1234567890",
    email: "company@example.com",
    address: "Location",
    aboutCompany: "No description available.",
    employeesCount: "Employee count not available",
    website: "#",
    profilePicture: "/dellprofile.svg",
  };

  const company = { ...defaultCompanyData, ...companyData?.data };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-400 p-4 flex items-center justify-start">Error: {error.message}</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="bg-white max-w-sm mx-auto overflow-hidden" style={{ boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)" }}>
            <div className="relative h-32 bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }}>
              <div
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 
                w-[170px] h-[170px] rounded-full overflow-hidden shadow-sm"
              >
                <img src={`${company.profilePicture.secure_url}`} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="mt-20 text-center">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">{company.companyName}</h2>
              <hr className="bg-[#FF6B35] h-[1px] w-[88%] mx-auto border-0" />
              <div className="flex items-center gap-3 w-[88%] mx-auto mt-4">
                <img src="/phone.svg" alt="icon of phone" />
                <p className="text-base md:text-lg mt-1">{company.phone}</p>
              </div>
              <div className="flex items-center gap-3 w-[88%] mx-auto mt-4">
                <img src="/email.svg" alt="icon of email" />
                <p className="text-base md:text-lg mt-1">{company.email}</p>
              </div>
              <div className="flex items-center gap-3 w-[88%] mx-auto mt-4 mb-7">
                <img src="/mynaui_location.png" alt="icon of developer" />
                <p className="text-base md:text-lg mt-1">{company.address}</p>
              </div>
              <div className="text-end mr-4 my-8">
                <button className="border border-main rounded-2xl px-8 py-2 hover:bg-main hover:text-white transition-colors duration-300" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div style={{ boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)" }} className="p-8 bg-white max-w-sm mx-auto mt-6 overflow-hidden">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">About company</h2>
            <hr className="bg-[#FF6B35] h-[1px] w-[80%] mt-4 mb-7 border-0" />
            <div className="flex items-center gap-3">
              <p className="w-full text-[15px]">{company.aboutCompany}</p>
            </div>
          </div>

          <div style={{ boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)" }} className="p-8 bg-white max-w-sm mx-auto mt-6 overflow-hidden">
            <div className="flex justify-between items-center mb-9">
              <h2 className="text-xl font-semibold text-gray-800">On the web</h2>
              <button className="bg-[#ECF9FF] text-main px-4 py-1 rounded-2xl">+ Add Link</button>
            </div>
            <div className="flex items-center gap-14">
              <a href={company.website} className="hover:opacity-80" target="_blank" rel="noreferrer">
                <img src="/web-icon.svg" alt="Website" className="w-6 h-6" />
              </a>
            </div>
            <hr className="bg-[#FF6B35] h-[1px] w-[80%] mt-8 mb-7 border-0" />
          </div>

          <div style={{ boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)" }} className="p-8 bg-white max-w-sm mx-auto mt-6 overflow-hidden">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Company size</h2>
            <hr className="bg-[#FF6B35] h-[1px] w-[64%] mt-4 mb-7 border-0" />
            <div className="flex items-center gap-14">
              <p>
                <span className="text-main">{company.employeesCount}</span> Employee
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          {role === "Company" && (
            <div className="justify-end flex md:hidden mb-5 space-x-3">
              <button
                className={`border border-main text-main rounded-2xl text-sm px-3 py-2 transition 
                  ${activeTab === "posts" ? "border-2 font-bold" : "border font-normal"}`}
                onClick={() => setActiveTab("posts")}
              >
                See Posts
              </button>
              <button
                className={`border border-main text-main rounded-2xl px-3 text-sm py-2 transition 
                  ${activeTab === "jobs" ? "border-2 font-bold" : "border font-normal"}`}
                onClick={() => setActiveTab("jobs")}
              >
                See Jobs
              </button>
              <button
                className={`border border-main text-main rounded-2xl px-3 text-sm py-2 transition 
                  ${activeTab === "archived" ? "border-2 font-bold" : "border font-normal"}`}
                onClick={() => setActiveTab("archived")}
              >
                See Archived
              </button>
              <button
                className={`border border-main text-main text-sm rounded-2xl px-3 py-2 transition 
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
          {role === "Company" ? activeTab === "posts" ? <PostItemCompany /> : activeTab === "jobs" ? <JobListProfile /> : activeTab === "archived" ? <JobListArchived /> : null : <></>}
        </div>
      </div>

      {isEditing && <EditProfileCompany companyData={company} setCompanyData={() => {}} setIsEditing={setIsEditing} />}
    </>
  );
}

export default SidebarCompany;
