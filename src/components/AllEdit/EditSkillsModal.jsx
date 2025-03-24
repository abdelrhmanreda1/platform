import { useState } from "react";
import { useUpdateSkills } from "../../services/apiProfile";
import { toast } from "react-toastify";

const ALLOWED_SKILLS = ["methodology", "TDD", "BDD", "CircleCI", "Travis CI", "Selenium", "Puppeteer", "Mocha", "Jest", "Jasmine", "Cypress", "Postman", "SQL Server", "Oracle", "AWS Lambda", "Lambda functions", "Hadoop", "Spark", "Cloud computing", "WebSockets", "WebRTC", "jQuery", "Bootstrap", "Tailwind CSS", "SASS", "LESS", "CSS Grid", "Flexbox", "Webpack", "Babel", "Parcel", "Grunt", "Gulp", "Vagrant", "Ansible", "Puppet", "Chef", "Vercel", "Netlify", "REST", "SOAP", "HATEOAS", "OAuth", "OpenID Connect", "JWT", "SAML", "LDAP", "NoSQL", "Graph databases", "Firestore", "Databases Design", "ORM", "Entity Framework", "Sequelize", "Mongoose", "SQL optimization", "CloudFormation", "Azure Functions", "Cloud Run", "Redis Caching", "Kafka Streams", "Event-driven architecture", "Serverless frameworks", "Continuous Integration", "Continuous Delivery", "Code review", "Monitoring & Logging", "Prometheus", "Grafana", "Datadog", "Sentry", "New Relic", "Raygun", "Microservices architecture", "API Gateway", "AWS S3", "AWS EC2", "Azure Blob Storage", "Kubernetes Service", "Data Analytics", "Business"];

function EditSkillsModal({ skills, onClose, onSkillsUpdate }) {
  // أضفنا onSkillsUpdate
  const [formSkills, setFormSkills] = useState(skills || []);
  const [selectedSkill, setSelectedSkill] = useState("");
  const { mutate: updateSkills, isLoading: isUpdatingSkills } = useUpdateSkills();

  const addSkill = () => {
    if (selectedSkill && !formSkills.includes(selectedSkill)) {
      setFormSkills((prev) => [...prev, selectedSkill]);
      setSelectedSkill("");
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...formSkills];
    updatedSkills.splice(index, 1);
    setFormSkills(updatedSkills);
  };

  const handleSave = () => {
    updateSkills(formSkills, {
      onSuccess: (data) => {
        // أضفنا data هنا
        toast.success("Skills updated successfully!");
        onSkillsUpdate(formSkills); // عدل الـ skills في الـ parent
        onClose();
      },
      onError: (err) => {
        const errorMessage = err.response?.data?.message || "An error occurred while updating skills!";
        toast.error(errorMessage);
      },
    });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl p-6 max-h-[90vh] scrollbar-hide overflow-y-auto">
        <img src="/close.png" onClick={onClose} className="absolute w-6 h-6 top-3 right-2 cursor-pointer" alt="Close" />
        <h2 className="text-xl font-semibold text-gray-800 -mt-3 mb-4 text-center">Edit Skills</h2>
        <hr className="bg-gray-200 h-[1px] w-full mb-6 border-0" />

        <h3 className="text-xl text-center font-bold mb-3">Skills</h3>
        <ul className="list-disc pl-5 mb-4">
          {formSkills.map((skill, index) => (
            <li key={index} className="mb-1 flex items-center justify-between">
              <span>{skill}</span>
              <button onClick={() => removeSkill(index)} className="text-sm text-red-500 px-2 py-1 rounded">
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 mb-6">
          <select
            value={selectedSkill} // Controlled component
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="w-[84%] px-2 py-1 border border-gray-100  outline-none rounded-lg"
          >
            <option value="" disabled>
              Select a skill
            </option>
            {ALLOWED_SKILLS.map((skill) => (
              <option key={skill} value={skill} disabled={formSkills.includes(skill)}>
                {skill}
              </option>
            ))}
          </select>
          <button
            onClick={addSkill}
            className="text-main text-sm rounded-lg"
            disabled={!selectedSkill} // Disable if no skill is selected
          >
            + Add
          </button>
        </div>
        <div className="w-full">
          <button className="bg-main flex justify-center items-center w-full text-white px-4 py-2 rounded-lg" onClick={handleSave} disabled={isUpdatingSkills}>
            {isUpdatingSkills ? "Updating..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditSkillsModal;
