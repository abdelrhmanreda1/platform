import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const api_key = import.meta.env.VITE_API_BASE_URL;

// دالة لجلب بيانات البروفايل
const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api_key}/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile data");
  }
};

export const useProfileData = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["profile", token],
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });
};

const updateProfile = async (data) => {
  const token = localStorage.getItem("token");

  const updatedData = Object.keys(data).reduce((acc, key) => {
    if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
      acc[key] = data[key];
    }
    return acc;
  }, {});

  const response = await axios.put(`${api_key}/profile`, updatedData, {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      queryClient.invalidateQueries(["jobs"]);
    },
  });
};

// دالة لتحديث الـ skills
const updateSkills = async (skills) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${api_key}/profile/skills`,
    { skills },
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const useUpdateSkills = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSkills,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });
};

// دالة لرفع صورة البروفايل
const uploadProfilePicture = async (file) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("attachment", file); // تغيير إلى "file" (قد تحتاج إلى تعديله بناءً على الـ Backend)

  try {
    const response = await axios.patch(`${api_key}/profile/profile-picture`, formData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data.profilePicture;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to upload profile picture");
  }
};

export const useUploadProfilePicture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadProfilePicture,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });
};

// دالة لرفع السيرة الذاتية
const uploadResume = async (file) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("attachment", file); // تغيير إلى "file" (قد تحتاج إلى تعديله بناءً على الـ Backend)

  try {
    const response = await axios.patch(`${api_key}/profile/resume`, formData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data.resume;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to upload resume");
  }
};

export const useUploadResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadResume,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });
};
