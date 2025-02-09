import { useNavigate } from "react-router-dom";
import { InputField } from "../../ui/InputField";
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { registerCompany } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { validationCompanySchema } from "../../schema/RegiserSchema";

function RegisterFormCompany() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      companyName: "",
      address: "",
    },
    validationSchema: validationCompanySchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });
  const mutation = useMutation({
    mutationFn: async (values) => {
      const response = await registerCompany(values);
      return response;
    },
    onSuccess: (data) => {
      console.log("Mutation success with data:", data);
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
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-3">
      <p className="text-[18px]">
        Sign up as <span className="text-[#FF6B35]">Company</span>
      </p>
      <InputField formik={formik} name="username" type="username" placeholder="Username" />
      <InputField formik={formik} name="email" type="email" placeholder="Email Address" />
      <div className="flex space-x-2 w-full">
        <select className="w-1/4 px-0 md:px-2 py-0 md:py-1 text-sm cursor-pointer border text-[#8D8A8A] border-[#CCCCCC] rounded-lg focus:outline-none">
          <option value="+2">+2</option>
        </select>
        <InputField formik={formik} name="phone" placeholder="Phone Number" type="text" />
      </div>
      <InputField formik={formik} name="password" type="password" placeholder="Password" />
      <InputField formik={formik} name="companyName" type="text" placeholder="companyName" />
      <InputField formik={formik} name="address" type="text" placeholder="address" />
      {mutation.isError && <p className="text-red-500">Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p className="text-green-500">Successfully registered! Check your inbox.</p>}
      <button type="submit" className="w-full bg-[#003366] text-white py-3 rounded-lg hover:bg-[#002855] transition duration-300 flex items-center justify-center">
        {mutation.isLoading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : "Sign Up"}
      </button>
    </form>
  );
}

export default RegisterFormCompany;
