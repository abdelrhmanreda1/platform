const PostsSection = () => {
  return (
    <div
      style={{
        boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)",
      }}
      className="bg-white  rounded-lg shadow-md mt-4"
    >
      <div className=" p-6">
        <h3 className="text-lg font-bold mb-4">Posts</h3>
        <hr className="bg-[#FF6B35] h-[1px] w-[20%]  mb-4 border-0" />
        <div className="flex items-center gap-4 mb-4">
          <img src="/imgprofile.svg" alt="Profile" className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="font-semibold text-sm">Mustafa Mahmoud</h3>
            <p className="text-xs text-[#8D8A8A]">2,871 followers</p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-[#8D8A8A]">16h ago.</p>
              <img src="/icon.png" alt="facion icon" />
            </div>
          </div>
        </div>
        <div className="border rounded-2xl p-4">
          <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
        </div>
        <div className="mt-2 text-sm text-[#4D4949] flex items-center justify-between">
          <p>4290 react</p>
          <p> 42 comments · 2795 sends</p>
        </div>
      </div>
      <button
        style={{
          boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)",
        }}
        className="mt-4 text-[#1C1A1A]  px-4 py-2 rounded w-full flex items-center justify-center gap-2"
      >
        Show all posts
        <img src="/arrow-2.png" alt="arrow icon" />
      </button>
    </div>
  );
};

export default PostsSection;
