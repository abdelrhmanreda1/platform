import { useState } from "react";

const CreatePostModal = ({ isOpen, onClose, onPost }) => {
  const [postContent, setPostContent] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [documents, setDocuments] = useState([]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    setImages([...images, ...e.target.files]);
  };

  const handleVideoChange = (e) => {
    setVideos([...videos, ...e.target.files]);
  };

  const handleDocumentChange = (e) => {
    setDocuments([...documents, ...e.target.files]);
  };

  const handlePost = () => {
    if (postContent.trim() || images.length > 0 || videos.length > 0 || documents.length > 0) {
      onPost({
        text: postContent,
        images,
        videos,
        documents,
        user: "Mustafa Mahmoud",
        avatar: "/imgprofile.svg",
        timestamp: new Date(),
      });
      setPostContent("");
      setImages([]);
      setVideos([]);
      setDocuments([]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white relative rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 -mt-3 mb-3 text-center">Create Post</h2>
        <img onClick={onClose} src="/close.png" alt="close icon" className="absolute w-6 h-6 top-4 right-4 cursor-pointer" />
        <hr className="bg-gray-500 h-[1px] w-full mb-6 border-0" />

        <div className="flex items-center gap-4 mb-4">
          <img src="/imgprofile.svg" alt="Profile" className="w-12 h-12 rounded-full" />
          <h3 className="font-semibold">Mustafa Mahmoud</h3>
        </div>

        <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} placeholder="Write a post!" className="w-full h-48 p-3 border-2 rounded-sm resize-none focus:outline-none" />

        <div className="mt-4">
          <div className="flex items-center justify-between w-full gap-4">
            <label className="flex items-center gap-2 border px-12 py-2 hover:bg-gray-100 rounded-xl cursor-pointer">
              <img src="/proicons_photo.png" alt="Photo" className="w-6 h-6" />
              Photo
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
            </label>
            <label className="flex items-center gap-2 border px-12 py-2 hover:bg-gray-100 rounded-xl cursor-pointer">
              <img src="/proicons_video.png" alt="Video" className="w-6 h-6" />
              Video
              <input type="file" accept="video/*" multiple className="hidden" onChange={handleVideoChange} />
            </label>
            <label className="flex items-center gap-2 border px-12 py-2 hover:bg-gray-100 rounded-xl cursor-pointer">
              <img src="/ph_article.png" alt="Article" className="w-6 h-6" />
              Document
              <input type="file" accept=".pdf,.doc,.docx" multiple className="hidden" onChange={handleDocumentChange} />
            </label>
          </div>

          <div className="mt-2">
            {images.map((image, index) => (
              <p key={index} className="text-sm text-gray-600">
                Image: {image.name}
              </p>
            ))}
            {videos.map((video, index) => (
              <p key={index} className="text-sm text-gray-600">
                Video: {video.name}
              </p>
            ))}
            {documents.map((document, index) => (
              <p key={index} className="text-sm text-gray-600">
                Document: {document.name}
              </p>
            ))}
          </div>
        </div>

        <div className="flex items-center w-full mt-5">
          <button className="bg-main text-white w-full px-6 py-2 rounded-lg hover:bg-[#223E5D]" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreatePostModal;
