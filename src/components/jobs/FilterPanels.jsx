import { useState } from "react";
import InputFilter from "../../ui/InputFilter";

const FilterPanel = () => {
  const [value, setValue] = useState(0);

  const handleInput = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    const range = e.target;
    const percent = ((newValue - range.min) / (range.max - range.min)) * 100;
    range.style.background = `linear-gradient(to right, #013E5D 0%, #013E5D ${percent}%, #FFFFFF ${percent}%, #FFFFFF 100%)`;
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Filter By</h2>
      <div className="bg-[#B3C5CE] p-5 rounded-2xl">
        <div className="mb-4">
          <label className="block font-semibold mt-2 text-[18px]">Location</label>
          <input type="text" placeholder="e.g. Cairo" className="w-full mt-1 p-2 border outline-none rounded-md" />
        </div>
        <div className="h-[1px] bg-[#1C1A1A] my-7 w-[70%] mx-auto"></div>
        <div className="mb-4">
          <h3 className="block font-semibold mb-6 text-[18px]">Job Type</h3>
          <div className="mt-2 flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <InputFilter />
              Hybrid
            </label>
            <label>
              <InputFilter /> Full Time
            </label>
            <label>
              <InputFilter /> Part Time
            </label>
          </div>
        </div>
        <div className="h-[1px] bg-[#1C1A1A] my-7 w-[70%] mx-auto"></div>
        <div className="mb-4">
          <h3 className="block font-semibold mb-6 text-[18px]">Experience</h3>
          <div className="mt-2 flex flex-col gap-2">
            <label>
              <InputFilter /> Fresher
            </label>
            <label>
              <InputFilter /> Intermediate
            </label>
            <label>
              <InputFilter /> Expert
            </label>
          </div>
        </div>
        <div className="h-[1px] bg-[#1C1A1A] my-7 w-[70%] mx-auto"></div>
        <div className="mb-4">
          <label className="block font-semibold mb-6 text-[18px]">Salary</label>
          <div className="flex  gap-3 mb-4">
            <input value={0} type="text" className="w-[20%] text-gray-700 text-center  border outline-none rounded-md" />
            <span>-</span>
            <input value={6000} type="text" className="w-[20%] text-gray-700 text-center  border outline-none rounded-md" />
            <span className="text-xl ml-[-5px]">EGP</span>
          </div>
          <div className="relative mb-4">
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={value}
              onInput={handleInput}
              className="w-full h-2 rounded-full appearance-none cursor-pointer outline-none"
              style={{
                background: `linear-gradient(to right, #013E5D 0%, #013E5D 0%, #FFFFFF 0%, #FFFFFF 100%)`,
              }}
            />
          </div>
          <div className="flex justify-between mb-9 mt-6 ">
            <button className="bg-white border border-gray-300 text-gray-800 font-medium px-2  py-1 rounded-md hover:bg-gray-100 transition">Weekly</button>
            <button className="bg-white border border-gray-300 text-gray-800 font-medium px-2 py-1  rounded-md hover:bg-gray-100 transition">Monthly</button>
            <button className="bg-white border border-gray-300 text-gray-800 font-medium px-2 py-1  rounded-md hover:bg-gray-100 transition">Hourly</button>
          </div>
          <div className="h-[1px] bg-[#1C1A1A] my-7 w-[70%] mx-auto"></div>
          <button className="w-full bg-[#013E5D] text-white py-3 rounded-2xl font-semibold mt-4">Apply Filter</button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
