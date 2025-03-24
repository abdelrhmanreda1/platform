import { useState } from "react";
import { format } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import JobDetailsCardsGroup from "../components/jobDetails/JobDetailsCardsGroup";
import JobHeader from "../components/jobDetails/JobHeader";
import JobSection from "../components/jobDetails/JobSection";
import ApllyJobModel from "../components/dashboard/ApllyJobModel";

import { useGetJobDetails, useUpdateJob, useDeleteJob } from "../services/apiJobs.js";
import Spinner from "../ui/Spinner";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../ui/DeleteConfirmationModal.jsx";
import EditJobModal from "../components/AllEdit/EditJobModal.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const JobDetailsPage = () => {
  const { role } = useAuth();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // For Apply Job modal
  const [showEditModal, setShowEditModal] = useState(false); // For Edit Job modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // For Delete Confirmation modal
  const { data: jobdetails, isLoading, error } = useGetJobDetails(jobId);
  const { mutate: updateJob, isLoading: isUpdating } = useUpdateJob();
  const { mutate: deleteJob, isLoading: isDeleting } = useDeleteJob();

  const detailsforJob = jobdetails?.data?.[0] || {};
  const { jobTitle, salary, experience, jobCategory, jobDescription, jobPeriod, jobType, location, requiredSkills, country, city, applicationDeadline } = detailsforJob || {};

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <h2 className="text-2xl font-medium mb-4">Failed to load jobs</h2>
        <p>{error.message || "Something went wrong"}</p>
      </div>
    );
  }

  if (!jobdetails || !jobdetails.data || jobdetails.data.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-medium mb-4">No job details found</h2>
      </div>
    );
  }

  const companyName = jobdetails.data[0]?.company?.[0]?.companyName || "Unknown Company";
  const date = jobdetails.data[0]?.createdAt?.split("T")[0] || "";
  const formattedDate = date ? format(new Date(date), "dd MMMM yyyy") : "Unknown Date";

  const handleEditSubmit = (updatedFields) => {
    updateJob({ jobId, updatedData: updatedFields });
  };

  const handleDelete = () => {
    // Show the confirmation modal instead of window.confirm
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteJob(jobId, {
      onSuccess: () => {
        toast.success("Job deleted successfully!");
        navigate("/dashboard/jobs");
      },
      onError: (err) => {
        const errorMessage = err.response?.data?.message || "An error occurred while deleting the job!";
        toast.error(errorMessage);
      },
      onSettled: () => {
        setShowDeleteModal(false);
      },
    });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false); // Close the modal without deleting
  };

  return (
    <div className="bg-gray-100 min-h-screen ">
      <JobHeader title={jobTitle} company={companyName} date={formattedDate} jobType={jobType} location={location} onEdit={() => setShowEditModal(true)} onDelete={handleDelete} />
      <div className="container mx-auto mt-8 ">
        <JobDetailsCardsGroup salary={salary} experience={experience} jobType={jobType} location={location} />
        <JobSection title="Overview" content={jobDescription} />
        <JobSection title="Required Skills" content={requiredSkills} isList />
        {role !== "Company" && (
          <button className="bg-main text-white px-6 py-3 my-6 rounded-2xl" onClick={() => setShowModal(true)}>
            Apply For This Job
          </button>
        )}
      </div>

      {showModal && <ApllyJobModel setShowModal={setShowModal} />}
      {showEditModal && <EditJobModal jobDetails={detailsforJob} onClose={() => setShowEditModal(false)} onSubmit={handleEditSubmit} isUpdating={isUpdating} />}
      {showDeleteModal && <DeleteConfirmationModal onConfirm={confirmDelete} onCancel={cancelDelete} isDeleting={isDeleting} />}
    </div>
  );
};

export default JobDetailsPage;
