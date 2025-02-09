function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-t-4 border-t-main rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default Spinner;
