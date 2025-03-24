const SelectField = ({ label, name, options, required = true, value, onChange, onBlur, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-base font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select name={name} value={value} onChange={onChange} onBlur={onBlur} className={`w-full text-[#8D8A8A] border ${error ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-2`}>
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option, index) => (
          <option className="text-[#8D8A8A] text-sm" key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;
