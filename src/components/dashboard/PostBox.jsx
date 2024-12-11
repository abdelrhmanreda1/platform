const PostBox = () => {
  return (
    <div className="bg-white shadow-lg mb-8 p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <img src="/imgprofile.svg" alt="Profile" className="w-12 h-12 rounded-full" />
        <input type="text" placeholder="Write a post!" className="w-[80%] border border-gray-300 rounded-full px-4 py-2 focus:outline-none" />
      </div>
      <div className="flex justify-around mt-4">
        <button className="flex items-center justify-center gap-2  py-2 px-4 border-b-[3px] border-b-[#FF6B35] rounded-full">
          <img src="/photoicon.png" alt="Photo icon" />
          <span className=" text-lg font-medium">Photo</span>
        </button>

        <button className="flex items-center justify-center gap-2  py-2 px-4 border-b-[3px] border-b-[#FF6B35] rounded-full">
          <img src="/video.png" alt="Video icon" className="w-8 h-8" />
          <span className="text-gray-700 font-medium">Video</span>
        </button>

        <button className="flex items-center justify-center gap-2  py-2 px-4 border-b-[3px] border-b-[#FF6B35] rounded-full">
          <img src="/message.png" alt="Article icon" className="w-8 h-8" />
          <span className="text-gray-700 font-medium">Article</span>
        </button>
      </div>
    </div>
  );
};

export default PostBox;
