import { useState, useEffect } from "react"; // أضف useEffect
import EditProfileUser from "../AllEdit/EditProfileUser";
import EditSkillsModal from "../AllEdit/EditSkillsModal";
import { useProfileData } from "../../services/apiProfile";
import ExperiencesSection from "./ExperiencesSection";
import EducationSection from "./EducationSection";
import PostsUserSection from "./PostsUserSection";
import Spinner from "../../ui/Spinner";

function ProfileUserCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [userSkills, setUserSkills] = useState([]);
  const { data: userData, isLoading, error } = useProfileData();

  const defaultUserData = {
    firstName: "First Name",
    lastName: "Last Name",
    jobTitle: "jobTitle",
    phone: "+1234567890",
    email: "example@example.com",
    address: "Address",
    resume: null,
    github: "#",
    twitter: "#",
    website: "#",
    skills: ["Skill 1", "Skill 2", "Skill 3"],
    profilePicture: "/defaultAvatar.png",
    experience: [{ title: "", company: "", duration: { from: "", to: "" } }],
    education: [{ degree: "", institution: "", location: "" }],
  };

  const normalizedUserData = {
    ...userData?.data,
    experience: Array.isArray(userData?.data?.experience) ? userData?.data?.experience : userData?.data?.experience && Object.keys(userData?.data?.experience).length ? [userData?.data?.experience] : [{ title: "", company: "", duration: { from: "", to: "" } }],
    education: Array.isArray(userData?.data?.education) ? userData?.data?.education : userData?.data?.education && Object.keys(userData?.data?.education).length ? [userData?.data?.education] : [{ degree: "", institution: "", location: "" }],
  };

  const user = { ...defaultUserData, ...normalizedUserData };

  // حدث userSkills لما user.skills يتغير من الـ API
  useEffect(() => {
    setUserSkills(user.skills || []);
  }, [user.skills]);

  const handleSkillsUpdate = (updatedSkills) => {
    setUserSkills(updatedSkills); // حدث الـ skills هنا
  };

  if (isLoading) {
    return <Spinner />;
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
                w-[170px] h-[170px] shadow-sm rounded-full overflow-hidden"
              >
                <img src={user.profilePicture?.secure_url || "/defaultAvatar.png"} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="mt-24 text-center">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
                {user.firstName} {user.lastName}
              </h2>
              <hr className="bg-[#FF6B35] h-[1px] w-[88%] mx-auto border-0" />
              <div className="flex items-center gap-3 w-[88%] mx-auto mt-4">
                <img src="/fluent-mdl2_work.png" alt="icon of developer" />
                <p className="text-base md:text-lg mt-1">{user.jobTitle}</p>
              </div>
              <div className="flex items-center gap-3 w-[88%] mx-auto mt-4">
                <img src="/phone.svg" alt="icon of phone" />
                <p className="text-base md:text-lg mt-1">{user.phone}</p>
              </div>
              <div className="flex items-center gap-3 w-[88%] mx-auto mt-4">
                <img src="/email.svg" alt="icon of email" />
                <p className="text-base md:text-lg mt-1">{user.email}</p>
              </div>
              <div className="flex items-center gap-3 w-[88%] mx-auto mt-4 mb-7">
                <img src="/mynaui_location.png" alt="icon of developer" />
                <p className="text-base md:text-lg mt-1">{user.address}</p>
              </div>
              <div className="text-end mr-4 my-8">
                <button className="border border-main rounded-2xl px-8 py-2 hover:bg-main hover:text-white transition-colors duration-300" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div style={{ boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)" }} className="p-8 bg-white max-w-sm mx-auto mt-6 overflow-hidden">
            <div className="flex justify-between items-center mb-9">
              <h2 className="text-xl font-semibold text-gray-800">On the web</h2>
              <button className="bg-[#ECF9FF] text-main px-4 py-1 rounded-2xl">+ Add Link</button>
            </div>
            <div className="flex items-center gap-14">
              <a href={user.github} className="hover:opacity-80" target="_blank" rel="noreferrer">
                <img src="/githup.svg" alt="GitHub" className="w-6 h-6" />
              </a>
              <a href={user.twitter} className="hover:opacity-80" target="_blank" rel="noreferrer">
                <img src="/twitter.svg" alt="Twitter" className="w-10 h-10" />
              </a>
              <a href={user.website} className="hover:opacity-80" target="_blank" rel="noreferrer">
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
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">Skills</h3>
              <button className="bg-[#ECF9FF] text-main px-4 py-1 rounded-2xl" onClick={() => setIsEditingSkills(true)}>
                Edit
              </button>
            </div>
            <hr className="bg-[#494443] h-[1px] w-[40%] mb-4 border-0" />
            <ul className="list-disc pl-5 text-lg space-y-2 text-gray-700">
              {userSkills.map(
                (
                  skill,
                  index // غيرنا user.skills لـ userSkills
                ) => (
                  <li key={index}>{skill}</li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="col-span-2">
          <ExperiencesSection experiences={user.experience} />
          <EducationSection educations={user.education} />
          <PostsUserSection />
        </div>
      </div>

      {isEditing && <EditProfileUser userData={user} setIsEditing={setIsEditing} />}
      {isEditingSkills && <EditSkillsModal skills={userSkills} onClose={() => setIsEditingSkills(false)} onSkillsUpdate={handleSkillsUpdate} />}
    </>
  );
}

export default ProfileUserCard;
