import TitleOfSections from "../../ui/TitleOfSections";

function WhyChooseUs() {
  const cards = [
    {
      title: "Smart Matching Algorithms",
      description: "Let AI handle the work. Get connected to jobs or candidates that match your preferences.",
      imageSrc: "/robot-arm.png",
    },
    {
      title: "Company Insights & Reviews",
      description: "Access reviews, salary insights, and more to make informed decisions about your future.",
      imageSrc: "/amico.png",
    },
    {
      title: "Secure In-Platform Messaging",
      description: "Engage directly with employers or candidates, with a built-in, secure messaging system.",
      imageSrc: "/bro.png",
    },
  ];

  return (
    <section id="features" className="py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <TitleOfSections>Why Choose Us?</TitleOfSections>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div key={index} className="border cursor-pointer border-[#2c7599] rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-medium text-[#1C1A1A] mb-2">{card.title}</h3>
              <p className="text-gray-400 text-[15px]">{card.description}</p>
              <img src={card.imageSrc} alt={card.title} className="mx-auto  w-[337px] h-[186px] object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
