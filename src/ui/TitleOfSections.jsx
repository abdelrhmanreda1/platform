import PropTypes from "prop-types";
function TitleOfSections({ children }) {
  return (
    <div className="flex items-center justify-center mb-6 space-x-4">
      <div className="h-[1px] w-[60%] md:w-[100%] bg-yellow-400"></div>
      <h2 className="text-[15px]  md:text-xl  lg:text-3xl w-[100%] font-bold text-[#1C1A1A]">{children}</h2>
      <div className="h-[1px] w-[60%] md:w-[100%] bg-yellow-400"></div>
    </div>
  );
}
TitleOfSections.propTypes = {
  children: PropTypes.node,
};
export default TitleOfSections;
