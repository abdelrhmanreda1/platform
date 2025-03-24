const ResaubleCardCommunity = ({ name, img, primaryAction, primaryLabel, secondaryAction, secondaryLabel, primary = false }) => {
  return (
    <div className="bg-white p-4 shadow-[0px_0px_7px_rgba(0,0,0,0.25)] w-[90%] mx-auto  md:w-[210px] mx-auto text-center border border-gray-200">
      <img src={img} alt={name} className="w-28 h-28 rounded-full mx-auto mb-3" />

      <p className="text-xl font-semibold text-[#1C1A1A] mb-6">{name}</p>

      <div className="flex flex-col space-y-3">
        {primary && (
          <button onClick={primaryAction} className="bg-main text-white px-5 py-2 rounded-full flex items-center justify-center">
            {primaryLabel}
          </button>
        )}
        <button onClick={secondaryAction} className="bg-gray-100 text-gray-700 px-5 py-2 rounded-full flex items-center justify-center">
          {secondaryLabel}
        </button>
      </div>
    </div>
  );
};

export default ResaubleCardCommunity;
