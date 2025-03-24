import JobDetailsCard from "./JobDetailsCard";

const JobDetailsCardsGroup = ({ salary, location, experience, jobType }) => {
  const cards = [
    { icon: "/nimbus_money.svg", label: "Salary", value: `${salary}/ month` },
    { icon: "/mynaui_location.svg", label: "Location", value: `${location}` },
    // { icon: "/icon-park_check-correct.svg", label: "Expertise", value: "Intermediate" },
    { icon: "/bag.svg", label: "Experience", value: `${experience}` },

    {
      icon: "/mingcute_time-line.svg",
      label: "Job Type",
      value: jobType,
      color: jobType === "PartTime" ? "text-[#FF804B]" : jobType === "FullTime" ? "text-[#013E5D]" : "text-[#6A0DAD]",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-14 mt-6 mx-auto">
      {cards.map((card, index) => (
        <JobDetailsCard key={index} icon={card.icon} label={card.label} value={card.value} color={card.color} />
      ))}
    </div>
  );
};

export default JobDetailsCardsGroup;
