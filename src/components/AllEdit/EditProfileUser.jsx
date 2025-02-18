import { useState } from "react";
import { FiCamera } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";
function EditProfileUser({ userData, setUserData, setIsEditing }) {
  const [formData, setFormData] = useState({
    ...userData,
    experiences: userData.experiences || [],
    education: userData.education || [],
    skills: userData.skills || [],
    links: {
      github: userData.links?.github || "",
      twitter: userData.links?.twitter || "",
      website: userData.links?.website || "",
    },
    resume: userData.resume || null,

    profilePhoto: userData.profilePhoto || "/imgprofile.svg",
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profilePhoto: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["github", "twitter", "website"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        links: {
          ...prev.links,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      resume: file || null,
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...formData.experiences];
    updatedExperiences[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      experiences: updatedExperiences,
    }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { title: "", company: "" }],
    }));
  };

  const removeExperience = (index) => {
    const updatedExperiences = [...formData.experiences];
    updatedExperiences.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      experiences: updatedExperiences,
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      education: updatedEducation,
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", location: "" }],
    }));
  };

  const removeEducation = (index) => {
    const updatedEducation = [...formData.education];
    updatedEducation.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      education: updatedEducation,
    }));
  };

  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black opacity-40" onClick={() => setIsEditing(false)}></div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl p-6 max-h-[90vh] scrollbar-hide overflow-y-auto">
        <img src="/close.png" onClick={() => setIsEditing(false)} className="absolute w-6 h-6 top-3 right-2 cursor-pointer" />
        <h2 className="text-xl font-semibold text-gray-800 -mt-3 mb-4 text-center">Edit Profile</h2>
        <hr className="bg-gray-200 h-[1px] w-full mb-6 border-0" />

        <div className="flex justify-center mt-2 relative">
          <img src={formData.profilePhoto || "/imgprofile.svg"} alt="Profile" className="w-20 h-20 object-cover rounded-full" />
          <label
            htmlFor="profilePhoto"
            className="absolute bottom-0 left-[52%] cursor-pointer
                      bg-white p-1 rounded-full border border-gray-300"
            title="Change photo"
          >
            <FiCamera className="text-gray-600 w-3 h-3" />
          </label>
          <input id="profilePhoto" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
        </div>

        <h3 className="text-xl text-center font-bold mb-3 mt-4">Personal Information</h3>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Position</label>
          <input type="text" name="position" value={formData.position} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <hr className="bg-[#FF6B35] h-[1px] mb-6 border-0" />

        <h3 className="text-xl text-center font-bold mb-3">On the Web</h3>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">GitHub</label>
          <input type="text" name="github" value={formData.links.github} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Twitter</label>
          <input type="text" name="twitter" value={formData.links.twitter} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Website</label>
          <input type="text" name="website" value={formData.links.website} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <hr className="bg-[#FF6B35] h-[1px] mb-6 border-0" />

        <h3 className="text-lg text-center mt-4 font-bold mb-4">Resume</h3>

        <div className="flex justify-center border rounded-md p-5 border-dotted items-center gap-2 mb-6">
          <FiFileText className="w-5 h-5 text-[#FF6B35]" />
          <label className="text-main cursor-pointer  text-sm font-medium">
            Upload CV/Resume
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} className="hidden" />
          </label>
        </div>

        {formData.resume && typeof formData.resume === "object" && <p className="text-sm  mb-3 text-green-600">Selected file: {formData.resume.name}</p>}

        <hr className="bg-[#FF6B35] h-[1px] mb-6 border-0" />

        <h3 className="text-xl text-center font-bold mb-3">Experiences</h3>
        {formData.experiences.map((exp, index) => (
          <div key={index} className="mb-4 border p-3 rounded-lg">
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Title</label>
              <input type="text" value={exp.title} onChange={(e) => handleExperienceChange(index, "title", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Company</label>
              <input type="text" value={exp.company} onChange={(e) => handleExperienceChange(index, "company", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <button onClick={() => removeExperience(index)} className="bg-red-500 text-white px-3 py-1 rounded-md">
              Remove
            </button>
          </div>
        ))}
        <button onClick={addExperience} className=" text-main text-sm   rounded-lg mb-6">
          + Add new experience
        </button>

        <hr className="bg-[#FF6B35] h-[1px] mb-6 border-0" />

        <h3 className="text-xl text-center font-bold mb-3">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="mb-4 border p-3 rounded-lg">
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Degree</label>
              <input type="text" value={edu.degree} onChange={(e) => handleEducationChange(index, "degree", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Institution</label>
              <input type="text" value={edu.institution} onChange={(e) => handleEducationChange(index, "institution", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Location</label>
              <input type="text" value={edu.location} onChange={(e) => handleEducationChange(index, "location", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <button onClick={() => removeEducation(index)} className=" text-red-500 text-sm  rounded">
              Remove
            </button>
          </div>
        ))}
        <button onClick={addEducation} className="text-main text-sm   rounded-lg mb-6">
          + Add new education
        </button>

        <hr className="bg-[#FF6B35] h-[1px] mb-6 border-0" />

        <h3 className="text-xl text-center font-bold mb-3">Skills</h3>
        <ul className="list-disc pl-5 mb-4">
          {formData.skills.map((skill, index) => (
            <li key={index} className="mb-1 flex items-center justify-between">
              <span>{skill}</span>
              <button onClick={() => removeSkill(index)} className="text-sm text-red-500 px-2 py-1  rounded">
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center  gap-14 mb-6">
          <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="w-[70%] px-2 py-2 border border-transparent  outline-none rounded-lg" placeholder="Add new skill" />
          <button onClick={addSkill} className="text-main text-sm   rounded-lg ">
            + Add
          </button>
        </div>
        <div className="w-full ">
          <button className="bg-main w-full text-white px-4 py-2 rounded-lg" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileUser;
