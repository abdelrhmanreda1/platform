const JobHeader = ({ title, company, date }) => {
  return (
    <div
      className="text-white mb-20  py-14 flex flex-col justify-center items-center rounded-md"
      style={{
        backgroundImage: "url('/rect1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-2xl font-bold mb-4">Job Details</h1>
      <p className="text-gray-500 mt-2 text-lg">
        {date} by <span className="font-semibold text-white text-xl">{company}</span>
      </p>
      <h2 className="text-xl font-semibold mt-4">{title}</h2>
    </div>
  );
};

export default JobHeader;
