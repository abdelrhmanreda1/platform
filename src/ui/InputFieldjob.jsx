const InputFieldJob = ({ label, type = "text", placeholder, required, isTextArea = false, name, value, onChange, onBlur, error, className }) => {
  return (
    <div className="mb-4">
      <label className={`${className} block mb-2`}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {isTextArea ? <textarea name={name} placeholder={placeholder} required={required} value={value} onChange={onChange} onBlur={onBlur} className={`w-full p-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-md text-sm`} /> : <input type={type} name={name} placeholder={placeholder} required={required} value={value} onChange={onChange} onBlur={onBlur} className={`w-full p-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-md text-sm`} />}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputFieldJob;
