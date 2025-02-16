const SkillsSection = () => {
  const skills = ["HTML/CSS", "JavaScript", "Database Management", "DevOps Basics", "Testing"];
  return (
    <div
      style={{
        boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)",
      }}
      className="bg-white w-[100%] md:w-[88%] mx-auto p-6 rounded-lg shadow-md mt-4"
    >
      <h3 className="text-lg font-bold mb-2">Skills</h3>
      <hr className="bg-[#494443] h-[1px] w-[40%]  mb-4 border-0" />
      <ul className="list-disc pl-5 text-lg space-y-2 text-gray-700">
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsSection;
