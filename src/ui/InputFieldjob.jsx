const InputFieldJob = ({ label, type = "text", placeholder, required, isTextArea = false, value, onChange, className }) => {
  return (
    <div className="mb-4">
      <label className={`${className} block mb-2`}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {isTextArea ? <textarea placeholder={placeholder} required={required} value={value} onChange={onChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" /> : <input type={type} placeholder={placeholder} required={required} value={value} onChange={onChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" />}
    </div>
  );
};

export default InputFieldJob;
