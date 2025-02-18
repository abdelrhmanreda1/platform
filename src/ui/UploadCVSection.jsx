import { useState } from "react";

const UploadCVSection = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileUpload(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    onFileUpload(null); // إزالة الملف من المكون الأصلي
  };

  return (
    <div className="relative">
      <input type="file" id="cv-upload" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />

      <label htmlFor="cv-upload" className={`block w-full p-12 border-2 border-dashed rounded-lg cursor-pointer ${file ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}`}>
        {file ? (
          <div className="text-center">
            <p className="text-blue-600 font-semibold">{file.name}</p>
            <p className="text-gray-500 text-sm">
              {(file.size / 1024).toFixed(2)} Kb,{" "}
              {new Date(file.lastModified).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <button type="button" onClick={handleRemoveFile} className="mt-5 text-red-500 hover:text-red-700 text-sm">
              Remove file
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500">Drag & drop your CV here or click to upload</p>
            <p className="text-gray-400 text-sm">Supported formats: PDF, DOC, DOCX</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default UploadCVSection;
