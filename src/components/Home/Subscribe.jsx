function Subscribe() {
  return (
    <section className="bg-[#012E50] text-white h-[140px] pt-12 ">
      <div className=" max-w-8xl  md:max-w-7xl mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-center  items-center gap-5 md:gap-14 nb-2 md:mb-10">
          <h2 className="text-[12px] md:text-[20px] font-medium">SUBSCRIBE TO OUR NEWSLETTER</h2>
          <div className="flex  justify-center items-center bg-white  w-[290px] md:w-[280px ] lg:w-[380px] h-[35px]  md:h-[42px] p-[1px] rounded-full">
            <input type="email" placeholder="Enter your email address" className="w-full max-w-md px-4  text-gray-700 bg-transparent rounded-full focus:outline-none focus:ring-0 border-none md:text-base text-[12px]" />
            <button className="bg-[#012E50] text-[12px] md:text-base hover:bg-hoverButton transition duration-300 text-white px-3  md:px-4  lg:px-6 py-2 rounded-full">SUBSCRIBE</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Subscribe;
