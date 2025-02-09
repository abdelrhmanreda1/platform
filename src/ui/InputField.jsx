import PropTypes from "prop-types";

export const InputField = ({ formik, name, ...props }) => {
  const error = formik?.touched[name] && formik?.errors[name];

  return (
    <div className="w-full">
      <input {...formik?.getFieldProps(name)} {...props} className={`w-full px-3 py-2 border rounded-lg ${error ? "border-red-500" : "border-gray-300"}`} />
      {error && <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>}
    </div>
  );
};

InputField.propTypes = {
  formik: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};
