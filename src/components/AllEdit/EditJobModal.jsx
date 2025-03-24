import { useState } from "react";

// Predefined list of allowed skills (same as in EditSkillsModal)
const ALLOWED_SKILLS = ["methodology", "TDD", "BDD", "CircleCI", "Travis CI", "Selenium", "Puppeteer", "Mocha", "Jest", "Jasmine", "Cypress", "Postman", "SQL Server", "Oracle", "AWS Lambda", "Lambda functions", "Hadoop", "Spark", "Cloud computing", "WebSockets", "WebRTC", "jQuery", "Bootstrap", "Tailwind CSS", "SASS", "LESS", "CSS Grid", "Flexbox", "Webpack", "Babel", "Parcel", "Grunt", "Gulp", "Vagrant", "Ansible", "Puppet", "Chef", "Vercel", "Netlify", "REST", "SOAP", "HATEOAS", "OAuth", "OpenID Connect", "JWT", "SAML", "LDAP", "NoSQL", "Graph databases", "Firestore", "Databases Design", "ORM", "Entity Framework", "Sequelize", "Mongoose", "SQL optimization", "CloudFormation", "Azure Functions", "Cloud Run", "Redis Caching", "Kafka Streams", "Event-driven architecture", "Serverless frameworks", "Continuous Integration", "Continuous Delivery", "Code review", "Monitoring & Logging", "Prometheus", "Grafana", "Datadog", "Sentry", "New Relic", "Raygun", "Microservices architecture", "API Gateway", "AWS S3", "AWS EC2", "Azure Blob Storage", "Kubernetes Service", "Data Analytics", "Business"];

const EditJobModal = ({ jobDetails, onClose, onSubmit, isUpdating }) => {
  console.log("jobDetails", jobDetails);

  // State for form data (excluding requiredSkills, which will be handled separately)
  const [formData, setFormData] = useState({
    jobTitle: jobDetails?.jobTitle || "",
    jobCategory: jobDetails?.jobCategory || "",
    jobDescription: jobDetails?.jobDescription || "",
    location: jobDetails?.location || "",
    country: jobDetails?.country || "",
    city: jobDetails?.city || "",
    salary: jobDetails?.salary || "",
    jobPeriod: jobDetails?.jobPeriod || "",
    experience: jobDetails?.experience || "",
    applicationDeadline: jobDetails?.applicationDeadline?.split("T")[0] || "",
    jobType: jobDetails?.jobType || "",
  });

  // State for managing the list of selected skills
  const [formSkills, setFormSkills] = useState(jobDetails?.requiredSkills || []);
  const [selectedSkill, setSelectedSkill] = useState(""); // State for the dropdown selection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add a skill to the list
  const addSkill = () => {
    if (selectedSkill && !formSkills.includes(selectedSkill)) {
      setFormSkills((prev) => [...prev, selectedSkill]);
      setSelectedSkill(""); // Reset the dropdown after adding
    }
  };

  // Remove a skill from the list
  const removeSkill = (index) => {
    const updatedSkills = [...formSkills];
    updatedSkills.splice(index, 1);
    setFormSkills(updatedSkills);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFields = {};

    // Handle form fields (excluding requiredSkills)
    for (const key in formData) {
      if (formData[key] !== jobDetails[key] && formData[key] !== "") {
        updatedFields[key] = formData[key];
      }
    }

    // Handle requiredSkills separately
    const originalSkills = jobDetails?.requiredSkills || [];
    if (JSON.stringify(formSkills) !== JSON.stringify(originalSkills)) {
      updatedFields.requiredSkills = formSkills;
    }

    onSubmit(updatedFields);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full mx-6 max-w-xl flex flex-col max-h-[90vh]">
        <div className="flex justify-center relative items-center pt-6 pb-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-center">Edit Job Post</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 absolute top-5 right-5">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide mt-4">
          <form onSubmit={handleSubmit}>
            <h3 className="text-xl font-semibold text-center text-main mb-4">Basic Information</h3>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Job Title *</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter job title" required />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Job Category *</label>
              <input type="text" name="jobCategory" value={formData.jobCategory} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter job category" required />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Job Description *</label>
              <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter job description" rows="4" required />
            </div>

            {/* Skills Section */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Required Skills *</label>
              <ul className="list-disc pl-5 mb-4">
                {formSkills.length > 0 ? (
                  formSkills.map((skill, index) => (
                    <li key={index} className="mb-1 flex items-center justify-between">
                      <span>{skill}</span>
                      <button onClick={() => removeSkill(index)} className="text-sm text-red-500 px-2 py-1 rounded">
                        Remove
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No skills added</li>
                )}
              </ul>
              <div className="flex items-center gap-2">
                <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)} className="w-[84%] px-2 py-1 border border-gray-100 outline-none rounded-lg">
                  <option value="" disabled>
                    Select a skill
                  </option>
                  {ALLOWED_SKILLS.map((skill) => (
                    <option key={skill} value={skill} disabled={formSkills.includes(skill)}>
                      {skill}
                    </option>
                  ))}
                </select>
                <button onClick={addSkill} className="text-main text-sm rounded-lg" disabled={!selectedSkill}>
                  + Add
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Location *</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter location" required />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Country *</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter country" required />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">City *</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter city" required />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Salary * (EGP / month)</label>
              <input type="number" name="salary" value={formData.salary} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter salary" required />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Job Period *</label>
              <select name="jobPeriod" value={formData.jobPeriod} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required>
                <option value="">Select job period</option>
                <option value="FullTime">FullTime</option>
                <option value="PartTime">PartTime</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Experience *</label>
              <select name="experience" value={formData.experience} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required>
                <option value="">Select experience level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Application Deadline *</label>
              <input type="date" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Job Type *</label>
              <select name="jobType" value={formData.jobType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required>
                <option value="">Select job type</option>
                <option value="Onsite">Onsite</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <button type="submit" className="hidden">
              Submit
            </button>
          </form>
        </div>

        <div className="p-6 border-t">
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              Cancel
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-main text-white rounded-md">
              {isUpdating ? "updating..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJobModal;
