import { useState } from "react";
import InputFieldJob from "../ui/InputFieldjob";
import SelectField from "../ui/SelectField";

const PostJob = () => {
  const [skills, setSkills] = useState("");
  const [availableSkills, setAvailableSkills] = useState(["JavaScript", "HTML", "CSS", "React", "Node.js", "Python"]);

  const addSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills(skills ? `${skills}, ${skill}` : skill);
      setAvailableSkills(availableSkills.filter((s) => s !== skill));
    }
  };

  const removeSkill = (skill) => {
    const updatedSkills = skills
      .split(", ")
      .filter((s) => s !== skill)
      .join(", ");
    setSkills(updatedSkills);
    setAvailableSkills([...availableSkills, skill]);
  };

  return (
    <div className=" min-h-screen ">
      <div
        className="text-white py-14 flex flex-col justify-center items-center rounded-md"
        style={{
          backgroundImage: "url('/rect1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl font-bold mb-3">Post A Job</h1>
      </div>
      <div className="container mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold ml-6 my-4">Job Details</h1>
          <div className="h-[1px] bg-[#FF804B] w-[16%] "></div>
        </div>
        <section className="mb-8">
          <h2 className="text-lg text-main font-semibold mb-4">Basic Information</h2>
          <InputFieldJob label="Job Title" placeholder="ex:Web Designer" required />
          <InputFieldJob label="Job Description" isTextArea={true} placeholder="Write about the job in details..." required />
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="Job Type"
              options={[
                { label: "Full Time", value: "full-time" },
                { label: "Part Time", value: "part-time" },
              ]}
              required
            />
            <SelectField
              label="Job Category"
              options={[
                { label: "Designer", value: "designer" },
                { label: "Developer", value: "developer" },
              ]}
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-[2]">
              <SelectField
                label="Salary"
                options={[
                  { label: "Monthly", value: "monthly" },
                  { label: "Weekly", value: "weekly" },
                  { label: "Year", value: "year" },
                ]}
                required
              />
            </div>

            <div className="flex-1">
              <InputFieldJob label="Min Salary" type="number" />
            </div>

            <div className="flex-1">
              <InputFieldJob label="Max Salary" type="number" />
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Skills & Experiences</h2>

          <div className="mb-4">
            <InputFieldJob label="Skills" placeholder="Add Skills" value={skills} onChange={(e) => setSkills(e.target.value)} required />
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            {availableSkills.map((skill) => (
              <button key={skill} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => addSkill(skill)}>
                {skill}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.split(", ").map(
              (skill) =>
                skill && (
                  <div key={skill} className="bg-main text-white px-4 py-2 rounded-lg flex items-center">
                    {skill}
                    <button className="ml-2 text-white font-bold" onClick={() => removeSkill(skill)}>
                      X
                    </button>
                  </div>
                )
            )}
          </div>

          <SelectField
            label="Experience"
            options={[
              { label: "Beginner", value: "beginner" },
              { label: "Intermediate", value: "intermediate" },
              { label: "Expert", value: "expert" },
            ]}
            required
          />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Address & Location</h2>
          <InputFieldJob label="Address" placeholder="e.g. Street name, Building No." required />
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="Country"
              options={[
                { label: "Egypt", value: "egypt" },
                { label: "USA", value: "usa" },
                { label: "Canada", value: "canada" },
                { label: "Germany", value: "germany" },
                { label: "France", value: "france" },
                { label: "Australia", value: "australia" },
                { label: "India", value: "india" },
                { label: "UK", value: "uk" },
              ]}
              required
            />
            <SelectField
              label="City"
              options={[
                { label: "Cairo", value: "cairo" },
                { label: "Alexandria", value: "alexandria" },
                { label: "Giza", value: "giza" },
                { label: "New York", value: "new-york" },
                { label: "Los Angeles", value: "los-angeles" },
                { label: "Toronto", value: "toronto" },
                { label: "Vancouver", value: "vancouver" },
                { label: "Berlin", value: "berlin" },
                { label: "Munich", value: "munich" },
                { label: "Paris", value: "paris" },
                { label: "Sydney", value: "sydney" },
                { label: "Melbourne", value: "melbourne" },
                { label: "Mumbai", value: "mumbai" },
                { label: "Delhi", value: "delhi" },
                { label: "London", value: "london" },
                { label: "Manchester", value: "manchester" },
              ]}
              required
            />
          </div>
        </section>

        <button className="bg-main text-white px-12 font-medium py-2 mt-6 rounded-2xl">Post</button>
      </div>
    </div>
  );
};

export default PostJob;
