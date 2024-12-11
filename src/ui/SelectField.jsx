const SelectField = ({ label, options, required = true }) => {
  return (
    <div className="mb-4">
      <label className="block text-base font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select className="w-full text-[#8D8A8A] border border-gray-300 rounded-lg px-4 py-2">
        {options.map((option, index) => (
          <option className="text-[#8D8A8A] text-sm" key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
