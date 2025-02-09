import { FiFilter } from "react-icons/fi";

const SearchBar = ({ onFilterClick }) => {
  return (
    <div
      className="text-white py-14 flex flex-col justify-center items-center rounded-md relative"
      style={{
        backgroundImage: "url('/rect1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl font-bold mb-3 ml-[-25px] md:ml-0">Job Search</h1>
      <div className="mt-4 flex items-center w-[80%] md:w-[50%] lg:w-[40%] mx-auto relative">
        <div className="relative w-full rounded-full ml-[-20px] md:ml-0">
          <input type="text" placeholder="What are you looking for?" className="w-full text-gray-600 p-3 pr-28 rounded-2xl placeholder:text-[12px] md:placeholder:text-base border-none  outline-none" />
          <button className="absolute top-1/2 -translate-y-1/2 right-[2px] rounded-2xl py-[10px] bg-main text-white px-6 md:px-12">Search</button>
        </div>
        {/* Filter Icon */}
        <button className="absolute rounded-full right-[-33px] text-white md:hidden" onClick={onFilterClick}>
          <img className="rounded-2xl" src="/filter.png" alt="filter icon" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
