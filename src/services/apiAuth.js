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
  const response = await axios.post(`${api_key}/auth/login`, values, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response.data;
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
