const FilterSidebar = ({ setFilter, currentFilter, filters }) => {
  return (
    <div className="md:w-[184px] w-full  grid grid-cols-2 sm:grid-cols-3 lg:block gap-3">
      {filters.map((filterItem) => (
        <button key={filterItem.name} onClick={() => setFilter(filterItem.name)} className={`w-full text-center py-2 my-1 rounded-full ${currentFilter === filterItem.name ? "border-2 border-main text-main font-semibold" : "border border-[#8D8A8A] text-[#8D8A8A]"}`}>
          {filterItem.name} ({filterItem.count})
        </button>
      ))}
    </div>
  );
};

export default FilterSidebar;
