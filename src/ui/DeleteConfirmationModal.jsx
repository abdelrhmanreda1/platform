import { FaExclamationCircle } from "react-icons/fa";

const DeleteConfirmationModal = ({ onConfirm, onCancel, isDeleting }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex flex-col items-center">
          <FaExclamationCircle className="text-red-500 text-3xl mb-4" />
          <h2 className="text-lg font-medium text-gray-800 mb-4">Are you sure you want to delete the job post?</h2>
          <div className="flex justify-around gap-4 mt-3 w-full">
            <button onClick={onCancel} className="px-6 py-2 rounded-full text-sm bg-gray-200 text-gray-700  hover:bg-gray-300">
              Cancel
            </button>
            <button onClick={onConfirm} className="px-6 py-2 text-sm bg-red-500 text-white rounded-full hover:bg-red-600">
              {isDeleting ? "Deleting..." : "Yes, delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
