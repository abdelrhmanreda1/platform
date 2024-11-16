import PropTypes from "prop-types";

export const ActionButton = ({ onClick, text }) => (
  <button onClick={onClick} className="w-full bg-main text-white py-3 rounded-lg hover:bg-hoverButton transition duration-300">
    {text}
  </button>
);

ActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
