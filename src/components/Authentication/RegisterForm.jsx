import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { InputField } from "../../ui/InputField";

import { useAuth } from "../../context/AuthContext";
import { registerJobSeeker } from "../../services/apiAuth";
import { validationEmployeeSchema } from "../../schema/RegiserSchema";

function RegisterForm() {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: async (values) => {
      const response = await registerJobSeeker(values);
      return response;
    },
    onSuccess: (data) => {
      if (data?.success) {
        login(data?.data);
        toast.success("Check your inbox to confirm your email!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error("Registration failed! Please try again.");
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Registration failed!");
    },
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      confirmPassword: "",
      dob: "",
      gender: "",
    },
    validationSchema: validationEmployeeSchema,
    onSubmit: (values) => {
      const { confirmPassword, ...filteredValues } = values;
      mutation.mutate(filteredValues);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-2">
      <p className="text-[18px]">
        Sign up as <span className="text-[#FF6B35]">{role}</span>
      </p>

      <div className="flex gap-2">
        <InputField name="firstName" formik={formik} placeholder="First Name" />
        <InputField name="lastName" formik={formik} placeholder="Last Name" />
      </div>

      <InputField name="email" formik={formik} placeholder="Email Address" type="email" />

      <div className="flex space-x-2 w-full">
        <select disabled className="w-1/4 px-2 text-main py-1 text-sm cursor-pointer border border-[#CCCCCC] rounded-lg focus:outline-none">
          <option className="text-main" value="+2">
            +2
          </option>
        </select>
        <InputField name="phone" formik={formik} placeholder="Phone Number" type="text" />
      </div>

      <InputField name="username" formik={formik} placeholder="Username" />
      <InputField name="password" formik={formik} placeholder="Password" type="password" />
      <InputField name="confirmPassword" formik={formik} placeholder="Confirm Password" type="password" />
      <InputField name="dob" formik={formik} placeholder="Date of Birth" type="date" />
      <div className="w-full">
        <select name="gender" value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none">
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {formik.touched.gender && formik.errors.gender && <p className="text-red-500 text-sm mt-1">{formik.errors.gender}</p>}
      </div>

      {mutation.isError && <p className="text-red-500">Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p className="text-green-500">Successfully registered! Check your inbox.</p>}

      <button type="submit" className="w-full bg-[#003366] text-white py-3 rounded-lg hover:bg-[#002855] transition duration-300 flex items-center justify-center">
        {mutation.isLoading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : "Sign Up"}
      </button>
    </form>
  );
}

export default RegisterForm;
