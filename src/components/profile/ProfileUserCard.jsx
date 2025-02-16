import { useState } from "react";
import EditProfileUser from "../AllEdit/EditProfileUser";

function ProfileUserCard() {
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "Mustafa",
    lastName: "Mahmoud",
    position: "Senior Fullstack Developer",
    phone: "+201000001100",
    email: "MustafaMahmoud@gmail.com",
    location: "Egypt, Cairo",
    links: {
      github: "https://github.com/mustafa-mondy",
      twitter: "https://twitter.com/yourprofile",
      website: "https://website-name.com",
    },
    resume: null, // or a string if you’re storing a URL
    experiences: [
      { title: "Senior Fullstack Developer", company: "Xceed" },
      { title: "Senior Fullstack Developer", company: "Oracle" },
      { title: "Frontend Developer", company: "Xceed" },
    ],
    education: [
      {
        degree: "Computer Science",
        institution: "Cairo University",
        location: "Egypt",
      },
      {
        degree: "High School Diploma",
        institution: "Almamon Secondary school",
        location: "Egypt",
      },
    ],
    skills: ["HTML/CSS", "JavaScript", "Database Management", "DevOps Basics", "Testing"],
    profilePhoto: "/imgprofile.svg",
  });

  return (
    <>
      <div className="bg-white max-w-sm mx-auto overflow-hidden" style={{ boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)" }}>
        <div className="relative h-32 bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }}>
          <div
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 
                w-[170px] h-[170px] rounded-full overflow-hidden"
          >
            <img src={userData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="mt-24 text-center">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
            {userData.firstName} {userData.lastName}
          </h2>
          <hr className="bg-[#FF6B35] h-[1px] w-[88%] mx-auto border-0" />
          <div className="flex items-center gap-3 w-[88%] mx-auto mt-4 ">
            <img src="/fluent-mdl2_work.png" alt="icon of developer" />
            <p className=" text-base md:text-lg mt-1">{userData.position}</p>
          </div>
          <div className="flex items-center gap-3 w-[88%] mx-auto mt-4 ">
            <img src="/phone.svg" alt="icon of phone" />
            <p className="text-base md:text-lg mt-1">{userData.phone}</p>
          </div>
          <div className="flex items-center gap-3 w-[88%] mx-auto mt-4 ">
            <img src="/email.svg" alt="icon of email" />
            <p className="text-base md:text-lg mt-1">{userData.email}</p>
          </div>
          <div className="flex items-center gap-3 w-[88%] mx-auto mt-4 mb-7 ">
            <img src="/mynaui_location.png" alt="icon of developer" />
            <p className="text-base md:text-lg mt-1">{userData.location}</p>
          </div>
          <div className="text-end mr-4 my-8">
            <button className="border border-main rounded-2xl px-8 py-2 hover:bg-main hover:text-white transition-colors duration-300" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* On the web */}
      <div style={{ boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)" }} className="p-8 bg-white max-w-sm mx-auto mt-6 overflow-hidden">
        <div className="flex justify-between items-center mb-9 ">
          <h2 className="text-xl font-semibold text-gray-800 ">On the web</h2>
          <button className="bg-[#ECF9FF] text-main px-4 py-1 rounded-2xl">+ Add Link</button>
        </div>
        <div className="flex items-center gap-14 ">
          <a href={userData.links.github} className="hover:opacity-80" target="_blank" rel="noreferrer">
            <img src="/githup.svg" alt="GitHub" className="w-6 h-6 " />
          </a>
          <a href={userData.links.twitter} className="hover:opacity-80" target="_blank" rel="noreferrer">
            <img src="/twitter.svg" alt="Twitter" className="w-10 h-10 " />
          </a>
          <a href={userData.links.website} className="hover:opacity-80" target="_blank" rel="noreferrer">
            <img src="/web-icon.svg" alt="Website" className="w-6 h-6" />
          </a>
        </div>
        <hr className="bg-[#FF6B35] h-[1px] w-[80%] mt-8 mb-7 border-0" />
      </div>
      <div
        style={{
          boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)",
        }}
        className="bg-white w-[100%] md:w-[88%] mx-auto p-6 rounded-lg shadow-md mt-4"
      >
        <h3 className="text-lg font-bold mb-2">Skills</h3>
        <hr className="bg-[#494443] h-[1px] w-[40%]  mb-4 border-0" />
        <ul className="list-disc pl-5 text-lg space-y-2 text-gray-700">
          {userData.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      {/* Edit Modal */}
      {isEditing && <EditProfileUser userData={userData} setUserData={setUserData} setIsEditing={setIsEditing} />}
    </>
  );
}

export default ProfileUserCard;
