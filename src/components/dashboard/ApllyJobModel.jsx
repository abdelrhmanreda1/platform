import { useState } from "react";
import UploadCVSection from "../../ui/UploadCVSection";
import { useNavigate } from "react-router-dom";

function ApplyJobModel({ setShowModal }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadTime, setUploadTime] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setUploadTime(new Date());
  };

  const handleApply = () => {
    if (uploadedFile) {
      setApplicationSubmitted(true);
    }
  };

  const handleBacktoHome = () => {
    setShowModal(false);
    navigate("/dashboard");
  };
  const formatDateTime = (date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#FEFEFE] mt-[100px] relative p-6 rounded-lg w-96 md:w-[50%] max-h-[90vh] scrollbar-hide overflow-y-auto">
        {!applicationSubmitted ? (
          <>
            <img src="/close.png" onClick={() => setShowModal(false)} className="absolute w-5 h-5 top-3 right-2 cursor-pointer" />
            <h2 className="text-2xl font-bold text-gray-800 -mt-3 mb-4 text-center">Apply Job</h2>
            <hr className="bg-gray-200 h-[1px] w-full mb-9 border-0" />

            <div className="w-full bg-[#EFEFEF] rounded-md mt-2 flex flex-col items-center py-6">
              <div className="w-20 h-20 rounded-full relative -top-[50px] bg-white flex items-center justify-center shadow-md">
                <img src="/dell.svg" alt="Dell" className="w-20" />
              </div>
              <div className="flex flex-col justify-center items-center -mt-[30px]">
                <h3 className="text-lg font-semibold">Frontend Developer</h3>
                <div className="flex justify-center gap-8 items-center mt-4">
                  <p className="text-lg font-medium">Dell </p>
                  <p className="text-xl text-[#FF804B]">•</p>
                  <p className="text-lg font-medium">Cairo</p>
                  <p className="text-xl text-[#FF804B]">•</p>
                  <p className="text-lg font-medium"> Fulltime</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-lg font-semibold">Upload CV</label>
              <p className="text-gray-400 mt-2 mb-2">Add your CV/Resume to apply for a job</p>

              <UploadCVSection onFileUpload={handleFileUpload} />
            </div>

            <div className="mt-4">
              <label className="block text-lg font-semibold">Cover Letter</label>
              <textarea className="shadow-sm p-4 w-full h-[100px] outline-none mt-1 rounded-2xl" placeholder="Explain why you are the right person for this job" />
            </div>

            <button className="bg-main text-white w-full py-2 mt-4 rounded-lg" onClick={handleApply}>
              Apply Now
            </button>
          </>
        ) : (
          <div className="text-center">
            {uploadedFile && (
              <>
                <img src="/close.png" onClick={() => setShowModal(false)} className="absolute w-5 h-5 top-3 right-2 cursor-pointer" />
                <h2 className="text-2xl font-bold text-gray-800 -mt-3 mb-4 text-center">Apply Job</h2>
                <hr className="bg-gray-200 h-[1px] w-full mb-9 border-0" />

                <div className="w-full bg-[#EFEFEF] rounded-md mt-2 flex flex-col items-center py-6">
                  <div className="w-20 h-20 rounded-full relative -top-[50px] bg-white flex items-center justify-center shadow-md">
                    <img src="/dell.svg" alt="Dell" className="w-20" />
                  </div>
                  <div className="flex flex-col justify-center items-center -mt-[30px]">
                    <h3 className="text-lg font-semibold">Frontend Developer</h3>
                    <div className="flex justify-center gap-8 items-center mt-4">
                      <p className="text-lg font-medium">Dell </p>
                      <p className="text-xl text-[#FF804B]">•</p>
                      <p className="text-lg font-medium">Cairo</p>
                      <p className="text-xl text-[#FF804B]">•</p>
                      <p className="text-lg font-medium"> Fulltime</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#3F13E40D] p-6 rounded-2xl border-2 border-dashed mt-4 text-left">
                  <div className="flex items-center gap-4">
                    <img src="/PDF.svg" alt="pdf" />
                    <div className="flex flex-col gap-1 ">
                      <p className="text-gray-800 text-lg font-medium">{uploadedFile.name}</p>
                      <div className="flex gap-4 text-gray-400 font-medium">
                        <p>{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                        <p> {formatDateTime(uploadTime)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="mt-3 mb-1">
              <img src="/sucessful.svg" alt="Success" className="mx-auto w-[450px]" />
            </div>
            <p className="text-base text-gray-400">Congratulations, your application has been sent</p>

            <button className="bg-main text-white w-full py-2 mt-4 rounded-lg" onClick={handleBacktoHome}>
              Back To Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplyJobModel;
