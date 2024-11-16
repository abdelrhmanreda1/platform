function HeroSection() {
  return (
    <section id="heroSection">
      <div className="flex flex-col-reverse mt-16 md:mt-0 md:flex-row items-center justify-end gap-8 md:gap-0">
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-10 md:pl-[9rem]">
          <h3 className="text-main text-[14px] md:text-[16px] tracking-wide font-semibold uppercase mb-4 flex items-center justify-center md:justify-start">
            <span className="inline-block align-middle mr-2">―</span> Connecting Talent with Opportunity.
          </h3>

          <h1 className="text-3xl md:text-4xl lg:text-[40px] text-[#1C1A1A] font-bold mb-6">
            The Future Of Hiring
            <br />
            Is Here.
          </h1>

          <p className="text-gray-400 text-sm  w-[80%]  leading-relaxed mb-6 mx-auto md:mx-0 md:w-[78%]">The ultimate hiring platform connecting job seekers with employers. Effortlessly discover your dream job or find exceptional talent. Simplify your hiring journey today!</p>

          <button className="bg-main text-white rounded-full px-6 py-3 hover:bg-hoverButton transition duration-300">Learn More</button>
          <div className="mt-[4rem] border-t border-yellow-500 w-[70%] mx-auto md:mx-0"></div>
        </div>

        <div className="relative flex items-center justify-end w-full md:w-1/2">
          <div className="bg-main w-[63%] md:w-[56%] h-[400px] md:h-[500px] lg:h-[600px] rounded-lg mr-[1px] mt-[-6px] md:mt-[65px]"></div>

          <div className="absolute mt-0 md:mt-16 left-[12%] md:left-[16%] lg:left-[29%] w-[84%] md:w-[80%] lg:w-[68%]">
            <img src="/image-hero-section.png" alt="Team Working" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
