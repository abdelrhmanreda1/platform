import { useState } from "react";
import { FiCamera } from "react-icons/fi";
import { toast } from "react-toastify";
import { useUpdateProfile, useUploadProfilePicture } from "../../services/apiProfile";
import MinSpinner from "../../ui/MinSpinnner";

function EditProfileCompany({ companyData, setCompanyData, setIsEditing }) {
  const [formData, setFormData] = useState({
    ...companyData,
    profilePicture: companyData.profilePicture?.secure_url || companyData.profilePicture || "",
    website: companyData.website || "",
  });

  const { mutate: updateProfile, isLoading: isUpdating } = useUpdateProfile();
  const { mutate: uploadProfilePicture, isLoading: isUploadingPicture } = useUploadProfilePicture();

  const getChangedData = (oldData, newData) => {
    const changedData = {};

    Object.keys(newData).forEach((key) => {
      if (key === "profilePicture") return;

      if (Array.isArray(newData[key])) {
        if (JSON.stringify(newData[key]) !== JSON.stringify(oldData[key])) {
          changedData[key] = newData[key];
        }
      } else if (newData[key] !== oldData[key]) {
        changedData[key] = newData[key];
      }
    });

    return changedData;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // اعمل preview للصورة قبل الرفع
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
        console.error("Error uploading profile picture:", error);
        toast.error(error.message || "Failed to upload profile picture!");
        // ارجع للصورة الأصلية لو حصل خطأ
        setFormData((prev) => ({
          ...prev,
          profilePicture: companyData.profilePicture?.secure_url || companyData.profilePicture || "",
        }));
      },
    });
  };

  const handleSave = () => {
    const changedData = getChangedData(companyData, formData);
    console.log("Changed data sent to PUT /profile:", changedData);

    if (Object.keys(changedData).length > 0) {
      updateProfile(changedData, {
        onSuccess: () => {
          setCompanyData({ ...companyData, ...changedData }); // تحديث البيانات الأصلية
          toast.success("Profile updated successfully!");
          setIsEditing(false);
        },
        onError: (err) => {
          console.error("Failed to update profile:", err);
          const errorMessage = err.response?.data?.message || "An error occurred while updating the profile!";
          toast.error(errorMessage);
        },
      });
    } else {
      setCompanyData(formData);
      setIsEditing(false);
      toast.success("No changes to save!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black opacity-40" onClick={() => setIsEditing(false)}></div>

      <div
        className="scrollbar-hide
          relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl
          p-6 max-h-[85vh] overflow-y-auto
        "
      >
        <img src="/close.png" onClick={() => setIsEditing(false)} className="absolute w-6 h-6 top-3 right-2 cursor-pointer" />

        <h2 className="text-xl font-semibold text-gray-800 mt-[-10px] mb-2 text-center">Edit Profile</h2>
        <hr className="bg-gray-200 h-[1px] w-full mb-6 border-0" />
        <div className="flex justify-center mt-2 relative">
          <img src={formData.profilePicture || "/default-profile.png"} alt="Profile" className="w-20 shadow-sm h-20 object-cover rounded-full" />
          <label
            htmlFor="profilePhoto"
            className="absolute bottom-0 left-[52%] cursor-pointer
                      bg-white p-1 rounded-full border border-gray-300"
            title="Change photo"
          >
            {isUploadingPicture ? <MinSpinner /> : <FiCamera className="text-gray-600 w-3 h-3" />}
          </label>
          <input id="profilePhoto" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} disabled={isUploadingPicture} />
        </div>
        <h3 className="text-xl text-center font-semibold text-gray-800 mt-3 mb-3">Basic Information</h3>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Company Name</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Phone Number</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Location</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <hr className="bg-[#FF6B35] h-[1px] mb-6 border-0" />

        <h3 className="text-xl text-center font-semibold text-gray-800 mb-3">About Company</h3>

        <div className="mb-6">
          <textarea name="aboutCompany" value={formData.aboutCompany} onChange={handleChange} className="w-full scrollbar-hide px-3 py-2 border rounded-lg" rows={3}></textarea>
        </div>

        <hr className="bg-[#FF6B35] h-[1px] mb-6 border-0" />

        <h3 className="text-xl text-center font-semibold text-gray-800 mb-3">On the Web</h3>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Website Link</label>
          <input type="text" name="website" value={formData.website} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <hr className="bg-[#FF6B35] h-[1px] mb-6 border-0" />

        <h3 className="text-xl text-center font-semibold text-gray-800 mb-3">Company Size</h3>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Employees</label>
          <select name="employeesCount" value={formData.employeesCount || ""} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
            <option value="">Select company size</option>
            <option value="1-10">1-10</option>
            <option value="11-20">11-20</option>
            <option value="21-50">21-50</option>
            <option value="51-100">51-100</option>
            <option value="100+">100+</option>
          </select>
        </div>

        <div className="w-full">
          <button disabled={isUpdating || isUploadingPicture} className="bg-main w-full text-white px-4 py-2 rounded-lg" onClick={handleSave}>
            {isUpdating ? "Updating..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileCompany;
