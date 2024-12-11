import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
const PostItem = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const maxLength = 207;

  const reducedText = text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src="/imgprofile.svg" alt="Profile" className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="font-semibold text-sm">
              Mustafa Mahmoud{" "}
              <span className="text-[#8D8A8A] font-normal text-sm ml-3">
                <span className="mt">.</span> 1st
              </span>
            </h3>
            <p className="text-xs text-[#8D8A8A]">2,871 followers</p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-[#8D8A8A]">16h ago.</p>
              <img src="/icon.png" alt="facion icon" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <BsThreeDots className=" text-gray-500 cursor-pointer" />
          <FaTimes className="cursor-pointer text-gray-500 text-[20px]" />
        </div>
      </div>
      <p className="mt-4 text-base ml-3 ">
        {isExpanded ? text : reducedText}
        {text.length > maxLength && (
          <button onClick={toggleText} className="text-[#8D8A8A]  font-medium hover:underline ml-2">
            {isExpanded ? "see less" : "see more"}
          </button>
        )}
      </p>
      <div className="flex items-center gap-2 my-4 ml-3 ">
        <img src="like.png" alt="like icon" />
        <img src="/roofing.png" alt="roofing icon " />
        <img src="heart.png" alt="heart icon " />
        <span className="text-[#8D8A8A]">258 . 56 comments</span>
      </div>
      <div className="flex justify-between mt-4 text-sm text-gray-500 w-[60%] mx-auto my-3">
        <button className="flex items-center gap-1 font-medium text-[#8D8A8A] text-[17px]">
          <img src="/thumbs-up.png" alt="thumbs-up" /> Like
        </button>
        <button className="flex items-center gap-1 font-medium text-[#8D8A8A] text-[17px]">
          {" "}
          <img src="/bubble.png" alt="bubble" /> Comment
        </button>
        <button className="flex items-center gap-1 font-medium text-[#8D8A8A] text-[17px]">
          <img src="/send.png" alt="share" /> Send
        </button>
      </div>
    </div>
  );
};

export default PostItem;
