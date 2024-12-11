const EducationSection = () => {
  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "Cairo University - Egypt",
      duration: "2014 - 2019",
    },
    {
      degree: "High School Diploma",
      school: "Al Ahram Secondary School - Egypt",
      duration: "2011 - 2014",
    },
  ];

  return (
    <div
      style={{
        boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)",
      }}
      className="bg-white p-6 rounded-lg shadow-md mt-4"
    >
      <h3 className="text-lg font-bold mb-2">Education</h3>
      <hr className="bg-[#FF6B35] h-[1px] w-[20%]  mb-4 border-0" />
      <ul className="space-y-4">
        {education.map((edu, index) => (
          <li key={index} className="text-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-500">{edu.duration}</p>
              <p className="font-semibold text-lg">{edu.degree}</p>
            </div>
            <span> {edu.school}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationSection;
