const ExperiencesSection = ({ experiences }) => {
  return (
    <div
      style={{
        boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)",
      }}
      className="bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0 md:mt-0 mt-4"
    >
      <h3 className="text-lg font-bold mb-2">Experiences</h3>
      <hr className="bg-[#FF6B35] h-[1px] w-[20%] mb-4 border-0" />
      {experiences && experiences.length > 0 ? (
        <ul className="space-y-4">
          {experiences.map((exp, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <strong className="text-base md:text-lg">{exp.title || "Not specified"}</strong> - <span className="text-[#8D8A8A] font-semibold text-base md:text-lg">{exp.company || "Not specified"}</span>
              </div>
              <span className="text-base md:text-lg text-[#8D8A8A]">{exp.duration?.from && exp.duration?.to ? `${exp.duration.from.split("T")[0]} - ${exp.duration.to.split("T")[0]}` : "Duration not specified"}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">No experience details available.</p>
      )}
    </div>
  );
};

export default ExperiencesSection;