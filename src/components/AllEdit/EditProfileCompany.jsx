import { useState } from "react";
import { FiCamera } from "react-icons/fi";
function EditProfileCompany({ companyData, setCompanyData, setIsEditing }) {
  const [formData, setFormData] = useState(companyData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["github", "twitter", "website"].includes(name)) {
      setFormData({
        ...formData,
        links: {
          ...formData.links,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
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
    setCompanyData(formData);
    setIsEditing(false);
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

        <h2 className="text-xl  font-semibold text-gray-800 mt-[-10px]  mb-2 text-center">Edit Profile</h2>
        <hr className="bg-gray-200 h-[1px] w-full  mb-6 border-0" />
        <div className="flex justify-center mt-2 relative">
          <img src={formData.profilePhoto} alt="Profile" className="w-20 h-20 object-cover rounded-full" />
          <label
            htmlFor="profilePhoto"
            className="absolute bottom-0 left-[52%] cursor-pointer
                      bg-white p-1 rounded-full border border-gray-300"
            title="Change photo"
          >
            <FiCamera className="text-gray-600 w-3 h-3" />
          </label>
          {/* input مخفي لاختيار الملف */}
          <input id="profilePhoto" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
        </div>
        <h3 className="text-xl text-center font-semibold text-gray-800 mt-3 mb-3">Basic information </h3>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Company Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
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
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <hr className="bg-[#FF6B35] h-[1px] mb-6 border-0" />

        <h3 className="text-xl text-center font-semibold text-gray-800 mb-3">About company</h3>

        <div className="mb-6">
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full scrollbar-hide px-3 py-2 border rounded-lg" rows={3}></textarea>
        </div>

        <hr className="bg-[#FF6B35] h-[1px] mb-6 border-0" />

        <h3 className="text-xl text-center font-semibold text-gray-800 mb-3">On the web</h3>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">GitHub Link</label>
          <input type="text" name="github" value={formData.links.github} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Twitter Link</label>
          <input type="text" name="twitter" value={formData.links.twitter} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Website Link</label>
          <input type="text" name="website" value={formData.links.website} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <hr className="bg-[#FF6B35] h-[1px] mb-6 border-0" />

        <h3 className="text-xl text-center font-semibold text-gray-800 mb-3">Company size</h3>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Employees</label>
          <input type="text" name="employees" value={formData.employees} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div className="w-full">
          <button className="bg-main w-full text-white px-4 py-2 rounded-lg" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileCompany;
