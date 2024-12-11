const JobDetailsCard = ({ label, value, color, icon }) => {
  return (
    <div className="bg-white rounded-3xl w-[74%] py-10 mx-auto flex flex-col justify-center items-center  text-center shadow-xl ">
      <img src={icon} alt="icon of card" className="w-12 mb-11" />
      <p className="text-[#4D4949] text-lg">{label}</p>
      <h3 className={`font-semibold text-xl ${color ? color : ""}`}>{value}</h3>
    </div>
  );
};

export default JobDetailsCard;
