const JobSection = ({ title, content, isList }) => {
  return (
    <div className="mt-6 bg-white rounded-lg p-6  border border-[#1C1A1A]  ">
      <div className="flex items-center gap-3 mb-5 ml-[-5px]">
        {/* <p className="bg-main text-white w-8 h-8 flex justify-center items-center text-center rounded-full text-xl ">1</p> */}
        <h3 className="text-xl font-semibold ">{title}</h3>
      </div>
      {isList ? (
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">{content}</p>
      )}
    </div>
  );
};

export default JobSection;
