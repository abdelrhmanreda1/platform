const EducationSection = ({ educations }) => {
  return (
    <div
      style={{
        boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)",
      }}
      className="bg-white p-6 rounded-lg shadow-md mt-4"
    >
      <h3 className="text-lg font-bold mb-2">Education</h3>
      <hr className="bg-[#FF6B35] h-[1px] w-[20%] mb-4 border-0" />
      {educations && educations.length > 0 ? (
        <ul className="space-y-4">
          {educations.map((edu, index) => (
            <li key={index} className="text-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <p className="text-sm text-gray-500">{edu.degree || "Not specified"}</p>
                <p className="font-semibold text-base md:text-lg">{edu.institution || "Not specified"}</p>
              </div>
              <span className="text-base md:text-sm">{edu.location || "Not specified"}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">No education details available.</p>
      )}
    </div>
  );
};

export default EducationSection;
