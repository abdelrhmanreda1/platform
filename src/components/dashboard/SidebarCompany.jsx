import { useState } from "react";
import EditProfileCompany from "../AllEdit/EditProfileCompany";

function SidebarCompany() {
  const [isEditing, setIsEditing] = useState(false);

  const [companyData, setCompanyData] = useState({
    name: "Dell Technologies",
    phone: "+201000004033",
    email: "delltechnologies@gmail.com",
    location: "Egypt, Cairo",
    description: "Dell is a global technology leader, providing innovative computers, software, and IT solutions. Committed to excellence, Dell offers a dynamic work environment with opportunities for growth and development.",
    employees: "10,000+ Employee",
    links: {
      github: "#",
      twitter: "#",
      website: "#",
    },
    profilePhoto: "/dellprofile.svg",
  });

  return (
    <>
      <div className=" bg-white max-w-sm mx-auto overflow-hidden" style={{ boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)" }}>
        <div className="relative h-32 bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }}>
          <div
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 
                w-[170px] h-[170px] rounded-full overflow-hidden"
          >
            <img src={companyData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">{companyData.name}</h2>
          <hr className="bg-[#FF6B35] h-[1px] w-[88%] mx-auto border-0" />

          <div className="flex items-center gap-2 w-[88%] mx-auto mt-4">
            <img src="/phone-company.png" alt="phone icon" />
            <p className="text-base mt-1">{companyData.phone}</p>
          </div>

          <div className="flex items-center gap-2 w-[88%] mx-auto mt-4">
            <img src="/email-company.png" alt="email icon" />
            <p className="text-base mt-1">{companyData.email}</p>
          </div>

          <div className="flex items-center gap-2 w-[88%] mx-auto mt-4 mb-7">
            <img src="/mynaui_location.png" alt="icon of developer" />
            <p className="text-base mt-1">{companyData.location}</p>
          </div>

          <div className=" text-end mr-4 my-8">
            <button
              onClick={() => setIsEditing(true)}
              className="
    inline-flex items-center justify-center
    px-8 py-2
    rounded-2xl
    border border-main
    text-main
    font-semibold
    hover:bg-main hover:text-white
    transition-colors
    duration-300
    ease-in-out
    shadow-sm
  "
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      <div style={{ boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)" }} className="p-8 bg-white max-w-sm mx-auto mt-6 overflow-hidden">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">About company</h2>
        <hr className="bg-[#FF6B35] h-[1px] w-[80%] mt-4 mb-7 border-0" />
        <div className="flex items-center gap-3 ">
          <p className="w-full text-[15px]">{companyData.description}</p>
        </div>
      </div>

      <div style={{ boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)" }} className="p-8 bg-white max-w-sm mx-auto mt-6 overflow-hidden">
        <div className="flex items-center justify-between ">
          <h2 className="text-xl font-semibold text-gray-800 ">On the web</h2>
          <button className="bg-[#ECF9FF] text-main p-1 rounded-md text-sm">+ Add link</button>
        </div>
        <hr className="bg-[#FF6B35] h-[1px] w-[50%] mt-4 mb-7 border-0" />
        <div className="flex items-center gap-14 ">
          <a href={companyData.links.github} className="hover:opacity-80">
            <img src="/githup.svg" alt="GitHub" className="w-6 h-6 " />
          </a>
          <a href={companyData.links.twitter} className="hover:opacity-80">
            <img src="/twitter.svg" alt="Twitter" className="w-10 h-10 " />
          </a>
          <a href={companyData.links.website} className="hover:opacity-80">
            <img src="/web-icon.svg" alt="Website" className="w-6 h-6" />
          </a>
        </div>
      </div>

      <div style={{ boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)" }} className="p-8 bg-white max-w-sm mx-auto mt-6 overflow-hidden">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Company size</h2>
        <hr className="bg-[#FF6B35] h-[1px] w-[64%] mt-4 mb-7 border-0" />
        <div className="flex items-center gap-14 ">
          <p>{companyData.employees}</p>
        </div>
      </div>

      {/* عرض المودال إذا كان isEditing = true */}
      {isEditing && <EditProfileCompany companyData={companyData} setCompanyData={setCompanyData} setIsEditing={setIsEditing} />}
    </>
  );
}

export default SidebarCompany;
