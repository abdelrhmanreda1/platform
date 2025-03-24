const statusColors = {
  "In Review": { bg: "bg-[#FFB836]", text: "text-[#FFB836]", border: "border-[#FFB836]" },
  Shortlisted: { bg: "bg-[#56CDAD]", text: "text-[#56CDAD]", border: "border-[#56CDAD]" },
  Interviewing: { bg: "bg-[#FFB836]", text: "text-[#FFB836]", border: "border-[#FFB836]" },
  Unsuitable: { bg: "bg-[#FF6550]", text: "text-[#FF6550]", border: "border-[#FF6550]" },
  Offered: { bg: "bg-[#4640DE]", text: "text-[#4640DE]", border: "border-[#4640DE]" },
};

const Tag = ({ status }) => {
  const { bg, text, border } = statusColors[status] || { bg: "bg-gray-500", text: "text-gray-700", border: "border-gray-700" };

  return (
    <div className="flex">
      <p className={`flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full border ${text} ${border}`}>
        <span className={`w-3 h-3 block rounded-full ${bg}`}></span> {status}
      </p>
    </div>
  );
};

export default Tag;
