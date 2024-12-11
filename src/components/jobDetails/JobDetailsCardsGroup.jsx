import JobDetailsCard from "./JobDetailsCard";

const JobDetailsCardsGroup = () => {
  const cards = [
    { icon: "/nimbus_money.svg", label: "Salary", value: "7k-8k / month" },
    { icon: "/icon-park_check-correct.svg", label: "Expertise", value: "Intermediate" },
    { icon: "/mynaui_location.svg", label: "Location", value: "Egypt, Cairo" },
    { icon: "/bag.svg", label: "Experience", value: "2 Years" },

    { icon: "/mingcute_time-line.svg", label: "Job Type", value: "Part-time", color: "text-[#FF804B]" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 mb-14 mt-6">
      {cards.map((card, index) => (
        <JobDetailsCard key={index} icon={card.icon} label={card.label} value={card.value} color={card.color} />
      ))}
    </div>
  );
};

export default JobDetailsCardsGroup;
