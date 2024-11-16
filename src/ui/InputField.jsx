import PropTypes from "prop-types";

export const InputField = ({ type, placeholder, value, onChange }) => <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="w-full px-3 py-3 text-sm mb-4 border border-gray-300 rounded-lg focus:outline-none" />;

InputField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

InputField.defaultProps = {
  type: "text",
  value: "",
};
