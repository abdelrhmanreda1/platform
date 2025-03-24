import Tag from "./Tag";

const ApplicationCard = ({ data }) => {
  return (
    <div className="bg-white shadow-md relative rounded-lg p-4 border border-gray-200 flex flex-col h-52 ">
      <span className="absolute right-3 text-2xl block top-2">...</span>
      <img src={data.logo} alt={data.company} className="w-12 h-12 object-contain" />
      <div className="flex flex-col flex-grow mt-2">
        <h3 className="text-base font-medium">{data.company}</h3>
        <p className="font-semibold">{data.position}</p>
        <p className="text-sm text-gray-400 mt-5">Date Applied</p>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 font-medium">{data.date}</p>
          <Tag status={data.status} />
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
