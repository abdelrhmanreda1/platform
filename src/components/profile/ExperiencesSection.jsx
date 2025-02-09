const ExperiencesSection = () => {
  const experiences = [
    { title: "Senior Fullstack Developer", company: "Xceed", duration: "May 2023 - Currently" },
    { title: "Senior Fullstack Developer", company: "Oracle", duration: "March 2022 - May 2023" },
    { title: "Frontend Developer", company: "Xceed", duration: "Oct 2019 - March 2021" },
  ];

  return (
    <div
      style={{
        boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)",
      }}
      className="bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0 md:mt-0 mt-4"
    >
      <h3 className="text-lg font-bold mb-2">Experiences</h3>
      <hr className="bg-[#FF6B35] h-[1px] w-[20%]  mb-4 border-0" />
      <ul className="space-y-4">
        {experiences.map((exp, index) => (
          <li key={index} className="flex justify-between items-center">
            <div>
              <strong className="text-base md:text-lg">{exp.title}</strong> - <span className="text-[#8D8A8A] font-semibold text-base md:text-lg">{exp.company}</span>
            </div>
            <span className="text-base md:text-lg text-[#8D8A8A]">{exp.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperiencesSection;
