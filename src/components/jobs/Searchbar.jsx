const SearchBar = () => {
  return (
    <div
      className="text-white  py-14 flex flex-col justify-center items-center rounded-md"
      style={{
        backgroundImage: "url('/rect1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl font-bold mb-3">Job Search</h1>
      <div className="mt-4 flex items-center w-[40%] mx-auto">
        <div className="relative w-full rounded-full">
          <input type="text" placeholder="What are you looking for?" className="w-full text-gray-600 p-3 pr-28 rounded-2xl border-none outline-none" />
          <button className="absolute top-1/2 -translate-y-1/2 right-[2px] rounded-2xl py-[10px] bg-main text-white px-12">Search</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
