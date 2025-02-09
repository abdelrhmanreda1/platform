const ProfileCard = () => {
  return (
    <>
      <div
        className=" bg-white max-w-sm mx-auto overflow-hidden"
        style={{
          boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)",
        }}
      >
        <div className="relative h-32 bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }}>
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
            <img src="/imgprofile.svg" alt="Profile" className="w-[200px] rounded-full" />
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Mustafa Mahmoud</h2>
          <hr className="bg-[#FF6B35] h-[1px] w-[88%] mx-auto border-0" />
          <div className="flex items-center gap-3 w-[88%] mx-auto mt-4 ">
            <img src="/fluent-mdl2_work.png" alt="icon of developer" />
            <p className=" text-base md:text-lg mt-1">Senior Fullstack Developer</p>
          </div>
          <div className="flex items-center gap-3 w-[88%] mx-auto mt-4 ">
            <img src="/phone.svg" alt="icon of phone" />
            <p className="text-base md:text-lg mt-1">+201000001100</p>
          </div>
          <div className="flex items-center gap-3 w-[88%] mx-auto mt-4 ">
            <img src="/email.svg" alt="icon of email" />
            <p className="text-base md:text-lg mt-1">MustafaMahmoud@gmail.com</p>
          </div>

          <div className="flex items-center gap-3 w-[88%] mx-auto mt-4 mb-7 ">
            <img src="/mynaui_location.png" alt="icon of developer" />
            <p className="text-base md:text-lg mt-1">Egypt, Cairo</p>
          </div>
          <div className=" text-end mr-4 my-8">
            <button className="border border-main rounded-2xl px-8 py-2">Edit</button>
          </div>
        </div>
      </div>

      <div
        style={{
          boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)",
        }}
        className="p-8 bg-white max-w-sm mx-auto mt-6 overflow-hidden"
      >
        <div className="flex justify-between items-center mb-9 ">
          <h2 className="text-xl font-semibold text-gray-800 ">On the web</h2>
          <button className="bg-[#ECF9FF] text-main px-4 py-1 rounded-2xl">+ Add Link</button>
        </div>
        <div className="flex items-center gap-14 ">
          <a href="#" className="hover:opacity-80">
            <img src="/githup.svg" alt="GitHub" className="w-6 h-6 " />
          </a>
          <a href="#" className="hover:opacity-80">
            <img src="/twitter.svg" alt="Twitter" className="w-10 h-10 " />
          </a>
          <a href="#" className="hover:opacity-80">
            <img src="/web-icon.svg" alt="Website" className="w-6 h-6" />
          </a>
        </div>
        <hr className="bg-[#FF6B35] h-[1px] w-[80%] mt-8 mb-7 border-0" />
      </div>
    </>
  );
};

export default ProfileCard;
