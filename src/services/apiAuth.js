import axios from "axios";

const api_key = import.meta.env.VITE_API_BASE_URL;

export const registerJobSeeker = async (values) => {
  const response = await axios.post(`${api_key}/auth/employee`, values, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response.data;
};

export const registerEmployee = async (values) => {
  const response = await axios.post(`${api_key}/auth/employee`, values, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response.data;
};

export const registerCompany = async (values) => {
  const response = await axios.post(`${api_key}/auth/company`, values, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response.data;
};

export const login = async (values) => {
  try {
    console.log("Sending login payload:", values); // نتأكد من الـ values
    const response = await axios.post(`${api_key}/auth/login`, values, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // لو الـ API بيعتمد على cookies
    });
    console.log("Login response:", response.data); // نشوف الـ response
    return response.data;
  } catch (error) {
    console.error("Login API error:", error.response?.data || error.message);
    throw error;
  }
};

export const resendConfirm = async (values) => {
  const response = await axios.post(`${api_key}/auth/resend-confirm`, values, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response.data;
};

export const passwordReset = async (values, resetToken) => {
  const response = await axios.post(`${api_key}/auth/password-reset?token=${resetToken}`, values, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response.data;
};

export const requestPasswordReset = async (values) => {
  const response = await axios.post(`${api_key}/auth/request-password-reset`, values, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response.data;
};
