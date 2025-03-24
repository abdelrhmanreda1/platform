function MinSpinner({ text = "Uploading..." }) {
  return (
    <div className="flex flex-col items-center gap-2 w-3 h-3 ">
      <div className="w-6 h-6 object-cover border-4 border-gray-200 border-t-[#FF6B35] rounded-full animate-spin"></div>
      <p className="text-xs text-[#FF6B35]">{text}</p>
    </div>
  );
}

export default MinSpinner;
