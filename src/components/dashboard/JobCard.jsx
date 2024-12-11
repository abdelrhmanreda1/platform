import { FaTimes } from "react-icons/fa";

const JobCard = ({ borderColor }) => {
  return (
    <div className={`bg-white flex justify-between py-8 px-3 rounded-3xl mb-6 border-l-[5px] border-b-[5px]`} style={{ borderColor: borderColor }}>
      <div className="flex items-start gap-3">
        <img src="/public/logo.svg" alt="logo job" />
        <div>
          <h3 className="font-semibold mb-1 text-lg">Web Designer</h3>
          <p className="text-base text-gray-500 mb-1">
            hp <span className="text-[#FF6B35] ml-4">Part-time</span>
          </p>
          <p className="text-base text-gray-500">Egypt, Cairo</p>
        </div>
      </div>
      <FaTimes className="cursor-pointer text-gray-500 text-[20px]" />
    </div>
  );
};

export default JobCard;
