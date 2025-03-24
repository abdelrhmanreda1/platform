import { useState, useEffect } from "react";
import { FiCamera, FiFileText, FiUpload } from "react-icons/fi";
import { useUpdateProfile, useUploadProfilePicture, useUploadResume } from "../../services/apiProfile";
import { toast } from "react-toastify";
import MinSpinner from "../../ui/MinSpinnner";

const EDUCATION_DEGREES = ["High School", "Associate Degree", "Bachelor's Degree", "Master's Degree", "Doctorate (PhD)", "Diploma", "Certificate", "Other"];
const EXPERIENCE_TITLES = ["AI Engineer", "Backend Engineer", "Frontend Engineer", "FullStack Engineer", "Data Scientist", "DevOps Engineer", "Software Architect", "QA Engineer", "System Administrator", "Network Engineer", "Security Engineer", "Cloud Engineer"];

function EditProfileUser({ userData, setIsEditing }) {
  const initialExperience = Array.isArray(userData.experience) ? userData.experience : userData.experience && Object.keys(userData.experience).length ? [userData.experience] : [{ title: "", company: "", duration: { from: "", to: "" } }];
  const initialEducation = Array.isArray(userData.education) ? userData.education : userData.education && Object.keys(userData.education).length ? [userData.education] : [{ degree: "", institution: "", location: "" }];

  const [formData, setFormData] = useState({
    ...userData,
    experience: initialExperience,
    education: initialEducation,
    github: userData.github || "",
    twitter: userData.twitter || "",
    website: userData.website || "",
    resume: userData.resume?.secure_url || null,
    profilePicture: userData.profilePicture?.secure_url || "",
    jobTitle: userData.jobTitle || "",
  });

  const [resumeDetails, setResumeDetails] = useState(null);

  useEffect(() => {
    if (userData.resume?.secure_url && !resumeDetails) {
      setResumeDetails({
        name: userData.resume.secure_url.split("/").pop(),
        size: "Unknown",
        uploadedAt: "Previously uploaded",
      });
    }
  }, [userData.resume, resumeDetails]);

  const { mutate: updateProfile, isLoading: isUpdating } = useUpdateProfile();
  const { mutate: uploadProfilePicture, isLoading: isUploadingPicture } = useUploadProfilePicture();
  const { mutate: uploadResume, isLoading: isUploadingResume } = useUploadResume();

  const getChangedData = (oldData, newData) => {
    const changedData = {};
    Object.keys(newData).forEach((key) => {
      if (key === "resume" || key === "profilePicture") return;

      if (key === "experience" || key === "education") {
        // ننظف الـ _id من كل عنصر في الـ array
        const cleanedArray = newData[key].map((item) => {
          const { _id, ...rest } = item; // شيل الـ _id
          return rest;
        });
        if (JSON.stringify(cleanedArray) !== JSON.stringify(oldData[key])) {
          changedData[key] = cleanedArray;
        }
      } else if (typeof newData[key] === "object" && newData[key] !== null) {
        if (JSON.stringify(newData[key]) !== JSON.stringify(oldData[key])) {
          changedData[key] = newData[key];
        }
      } else if (newData[key] !== oldData[key]) {
        changedData[key] = newData[key];
      }
    });
    return changedData;
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      profilePicture: previewUrl,
    }));

    uploadProfilePicture(file, {
      onSuccess: (newProfilePicture) => {
        const pictureUrl = typeof newProfilePicture === "string" ? newProfilePicture : newProfilePicture?.secure_url || newProfilePicture?.url || previewUrl;
        setFormData((prev) => ({
          ...prev,
          profilePicture: pictureUrl,
        }));
        toast.success("Profile picture updated successfully!");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to upload profile picture!");
        setFormData((prev) => ({
          ...prev,
          profilePicture: userData.profilePicture?.secure_url || "",
        }));
      },
    });
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    uploadResume(file, {
      onSuccess: (resumeData) => {
        const resumeUrl = typeof resumeData === "string" ? resumeData : resumeData?.secure_url || "";
        setFormData((prev) => ({
          ...prev,
          resume: resumeUrl,
        }));
        setResumeDetails({
          name: file.name,
          size: (file.size / 1024).toFixed(2) + " KB",
          uploadedAt: new Date().toLocaleTimeString(),
        });
        toast.success("Resume uploaded successfully!");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to upload resume!");
      },
    });
  };

  const handleSave = () => {
    const changedData = getChangedData(userData, formData);
    console.log("Changed data sent to PUT /profile:", changedData);

    if (Object.keys(changedData).length > 0) {
      updateProfile(changedData, {
        onSuccess: () => {
          toast.success("Profile updated successfully!");
          setIsEditing(false);
        },
        onError: (error) => {
          const errorMessage = error.response?.data?.message || "An error occurred while updating the profile!";
          toast.error(errorMessage);
        },
      });
    } else {
      setIsEditing(false);
      toast.success("No changes to save!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExperienceChange = (e, index, subField) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedExperience = prev.experience.map((exp, i) =>
        i === index
          ? {
              ...exp,
              ...(subField ? { duration: { ...exp.duration, [subField]: value } } : { [name]: value }),
            }
          : exp
      );
      return { ...prev, experience: updatedExperience };
    });
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { title: "", company: "", duration: { from: "", to: "" } }],
    }));
  };

  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "degree" && value && !EDUCATION_DEGREES.includes(value)) {
      toast.error("Degree must be one of: " + EDUCATION_DEGREES.join(", "));
      return;
    }
    setFormData((prev) => {
      const updatedEducation = prev.education.map((edu, i) => (i === index ? { ...edu, [name]: value } : edu));
      return { ...prev, education: updatedEducation };
    });
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", location: "" }],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
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
          <img src={formData.profilePicture || "/default-profile.png"} alt="Profile" className="w-20 h-20 object-cover shadow-sm rounded-full" />
          <label htmlFor="profilePicture" className="absolute bottom-0 left-[52%] cursor-pointer bg-white p-1 rounded-full border border-gray-300" title="Change photo">
            {isUploadingPicture ? <MinSpinner /> : <FiCamera className="text-gray-600 w-3 h-3" />}
          </label>
          <input id="profilePicture" type="file" accept="image/*" className="hidden" disabled={isUploadingPicture} onChange={handlePhotoChange} />
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
          <label className="block text-gray-700 mb-1">Job Title</label>
          <select name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
            <option value="">Select a job title</option>
            {EXPERIENCE_TITLES.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
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
          <label className="block text-gray-700 mb-1">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <hr className="bg-[#FF6B35] h-[1px] mb-6 border-0" />

        <h3 className="text-xl text-center font-bold mb-3">On the Web</h3>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">GitHub</label>
          <input type="text" name="github" value={formData.github} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Twitter</label>
          <input type="text" name="twitter" value={formData.twitter} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Website</label>
          <input type="text" name="website" value={formData.website} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <hr className="bg-[#FF6B35] h-[1px] mb-6 border-0" />

        <h3 className="text-lg text-center mt-4 font-bold mb-4">Resume</h3>

        <div className="flex justify-center border rounded-md p-5 border-dotted items-center gap-2 mb-6">
          {isUploadingResume ? (
            <MinSpinner />
          ) : resumeDetails ? (
            <div className="flex items-center justify-between w-full px-4 py-2 bg-gray-50 rounded-md shadow-sm">
              <div className="flex items-center gap-3">
                <FiFileText className="w-6 h-6 text-[#FF6B35]" />
                <div>
                  <p className="text-sm font-semibold text-gray-800 truncate max-w-[200px]">{resumeDetails.name}</p>
                  <p className="text-xs text-gray-500">Size: {resumeDetails.size}</p>
                  <p className="text-xs text-gray-500">Uploaded: {resumeDetails.uploadedAt}</p>
                </div>
              </div>
              <label className="flex items-center gap-1 text-[#FF6B35] cursor-pointer text-xs font-medium hover:text-[#e65a2f] transition-colors">
                <FiUpload className="w-4 h-4" />
                Change
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} disabled={isUploadingResume} className="hidden" />
              </label>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FiFileText className="w-5 h-5 text-[#FF6B35]" />
              <label className="text-[#FF6B35] cursor-pointer text-sm font-medium hover:text-[#e65a2f] transition-colors">
                Upload CV/Resume
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} disabled={isUploadingResume} className="hidden" />
              </label>
            </div>
          )}
        </div>

        <hr className="bg-[#FF6B35] h-[1px] mb-6 border-0" />

        <h3 className="text-xl text-center font-bold mb-3">Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index} className="mb-4 border p-3 rounded-lg">
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Title</label>
              <select name="title" value={exp.title} onChange={(e) => handleExperienceChange(e, index)} className="w-full px-3 py-2 border rounded-lg">
                <option value="">Select a title</option>
                {EXPERIENCE_TITLES.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Company</label>
              <input type="text" name="company" value={exp.company} onChange={(e) => handleExperienceChange(e, index)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">From</label>
              <input type="date" name="from" value={exp.duration.from?.split("T")[0] || ""} onChange={(e) => handleExperienceChange(e, index, "from")} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">To</label>
              <input type="date" name="to" value={exp.duration.to?.split("T")[0] || ""} onChange={(e) => handleExperienceChange(e, index, "to")} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            {formData.experience.length > 1 && (
              <button type="button" onClick={() => removeExperience(index)} className="text-red-500 hover:text-red-700">
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addExperience} className="text-blue-500 hover:text-blue-700 mb-6">
          + Add Experience
        </button>

        <hr className="bg-[#FF6B35] h-[1px] mb-6 border-0" />

        <h3 className="text-xl text-center font-bold mb-3">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="mb-4 border p-3 rounded-lg">
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Degree</label>
              <select name="degree" value={edu.degree} onChange={(e) => handleEducationChange(e, index)} className="w-full px-3 py-2 border rounded-lg">
                <option value="">Select a degree</option>
                {EDUCATION_DEGREES.map((degree) => (
                  <option key={degree} value={degree}>
                    {degree}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Institution</label>
              <input type="text" name="institution" value={edu.institution} onChange={(e) => handleEducationChange(e, index)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Location</label>
              <input type="text" name="location" value={edu.location} onChange={(e) => handleEducationChange(e, index)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            {formData.education.length > 1 && (
              <button type="button" onClick={() => removeEducation(index)} className="text-red-500 hover:text-red-700">
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addEducation} className="text-blue-500 hover:text-blue-700 mb-6">
          + Add Education
        </button>

        <hr className="bg-[#FF6B35] h-[1px] mb-6 border-0" />

        <div className="w-full">
          <button className="bg-main flex justify-center items-center w-full text-white px-4 py-2 rounded-lg" onClick={handleSave} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileUser;
