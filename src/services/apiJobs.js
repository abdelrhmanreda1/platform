import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const api_key = import.meta.env.VITE_API_BASE_URL;

const getToken = () => {
  return localStorage.getItem("token");
};

// دالة لإنشاء الوظيفة
export const createJob = async (jobData) => {
  const token = getToken();

  const response = await axios.post(`${api_key}/jobpost`, jobData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  return response.data;
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    onSuccess: (data) => {
      console.log("Job created successfully:", data);

      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error) => {
      console.error("Error creating job:", error);
    },
  });
};

export const getJobs = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }
  const response = await axios.get(`${api_key}/jobpost`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
};

export const useGetJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
    onError: (error) => {
      console.error("Error fetching jobs:", error);
    },
  });
};

export const getJobDetails = async (id) => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  const response = await axios.get(`${api_key}/jobpost/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
};

export const useGetJobDetails = (id) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => getJobDetails(id),
    enabled: !!id,
    onError: (error) => {
      console.error("Error fetching job details:", error);
    },
  });
};

export const updateJob = async ({ jobId, updatedData }) => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  const response = await axios.put(`${api_key}/jobpost/${jobId}`, updatedData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  return response.data;
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateJob,
    onSuccess: (data, variables) => {
      console.log("Job updated successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["job", variables.jobId] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error) => {
      console.error("Error updating job:", error);
    },
  });
};

export const deleteJob = async (jobId) => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  const response = await axios.delete(`${api_key}/jobpost/${jobId}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJob,
    onSuccess: (data, jobId) => {
      console.log("Job deleted successfully:", data);
      // Invalidate the jobs list query to refresh the UI
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      // Optionally remove the job details query from the cache
      queryClient.removeQueries({ queryKey: ["job", jobId] });
    },
    onError: (error) => {
      console.error("Error deleting job:", error);
    },
  });
};

export const searchJobs = async ({ minSalary, maxSalary, page, size, filters = {} }) => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  if (!minSalary || !maxSalary || !page || !size) {
    throw new Error("Please provide minSalary, maxSalary, page, and size.");
  }

  const queryParams = new URLSearchParams({
    minSalary,
    maxSalary,
    page,
    size,
    ...(filters.location && { location: filters.location }),
    ...(filters.jobPeriod && { jobPeriod: filters.jobPeriod }),
    ...(filters.experience && { experience: filters.experience.join(",") }),
  });

  const response = await axios.get(`${api_key}/jobpost/search?${queryParams}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  console.log("Search API Response:", response.data);
  return response.data;
};

export const useSearchJobs = (searchParams) => {
  return useQuery({
    queryKey: ["searchJobs", searchParams],
    queryFn: () => searchJobs(searchParams),
    enabled: !!searchParams.minSalary && !!searchParams.maxSalary,
    onError: (error) => {
      toast.error(error.message || "Error searching jobs", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });
};

export const archiveJob = async (jobId) => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  const response = await axios.patch(
    `${api_key}/jobpost/${jobId}`,
    {},
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return response.data;
};

export const useArchiveJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archiveJob,
    onSuccess: (data, jobId) => {
      console.log("Job archived successfully:", data);
      toast.success("Job archived successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["archivedJobs"] });
      queryClient.invalidateQueries({ queryKey: ["searchJobs"] });
    },
    onError: (error) => {
      console.error("Error archiving job:", error);
      toast.error(error.message || "Error archiving job", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });
};

export const getArchivedJobs = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  const response = await axios.get(`${api_key}/jobpost/archived`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
};

export const useGetArchivedJobs = () => {
  return useQuery({
    queryKey: ["archivedJobs"],
    queryFn: getArchivedJobs,
    onError: (error) => {
      console.error("Error fetching archived jobs:", error);
      toast.error(error.message || "Error fetching archived jobs", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });
};
