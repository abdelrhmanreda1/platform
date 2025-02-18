import { useEffect, useState } from "react";
import { FaTimes, FaComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

const PostItemUser = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeSincePost, setTimeSincePost] = useState("Just now");
  const [likes, setLikes] = useState(post.likes || []);
  const [hearts, setHearts] = useState(post.hearts || []);
  const [claps, setClaps] = useState(post.claps || []);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const maxLength = 207;
  const reducedText = post.text.length > maxLength ? post.text.slice(0, maxLength) + "..." : post.text;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const postTime = new Date(post.timestamp);
      const diffInSeconds = Math.floor((now - postTime) / 1000);

      if (diffInSeconds < 60) {
        setTimeSincePost("Just now");
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        setTimeSincePost(`${minutes} minute${minutes > 1 ? "s" : ""} ago`);
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        setTimeSincePost(`${hours} hour${hours > 1 ? "s" : ""} ago`);
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        setTimeSincePost(`${days} day${days > 1 ? "s" : ""} ago`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [post.timestamp]);

  const handleLikeClick = () => {
    setLikes((prev) => (prev.includes("User1") ? prev.filter((u) => u !== "User1") : [...prev, "User1"]));
  };

  const handleHeartClick = () => {
    setHearts((prev) => (prev.includes("User1") ? prev.filter((u) => u !== "User1") : [...prev, "User1"]));
  };

  const handleClapClick = () => {
    setClaps((prev) => (prev.includes("User1") ? prev.filter((u) => u !== "User1") : [...prev, "User1"]));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { user: "User1", text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src={post.avatar} alt="Profile" className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="font-semibold text-sm">{post.user}</h3>
            <p className="text-xs text-gray-500">{timeSincePost}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <BsThreeDots className="text-gray-500 cursor-pointer" />
          <FaTimes className="cursor-pointer text-gray-500 text-[20px]" />
        </div>
      </div>

      <p className="mt-4 text-base">
        {isExpanded ? post.text : reducedText}
        {post.text.length > maxLength && (
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-[#8D8A8A] font-medium hover:underline ml-2">
            {isExpanded ? "see less" : "see more"}
          </button>
        )}
      </p>

      <div className="mt-4">
        {post.images?.map((image, index) => (
          <img key={index} src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} className="w-full mx-auto max-w-xs  h-[360px] object-contain rounded-lg mb-2" />
        ))}

        {post.videos?.map((video, index) => (
          <video key={index} controls className="w-full max-w-xs rounded-lg mb-2">
            <source src={URL.createObjectURL(video)} type={video.type} />
            Your browser does not support the video tag.
          </video>
        ))}

        {post.documents?.map((doc, index) =>
          doc.type === "application/pdf" ? (
            <iframe key={index} src={URL.createObjectURL(doc)} className="w-full h-[500px] mb-2 border" title={`Document ${index}`} />
          ) : (
            <p key={index} className="text-sm text-gray-600">
              Document: {doc.name}
            </p>
          )
        )}
      </div>

      <div className="flex items-center gap-2 my-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLikeClick}>
          <img src="/like.png" alt="like" />
          <span className="text-[#8D8A8A]">{likes.length}</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleHeartClick}>
          <img src="/heart.png" alt="heart" />
          <span className="text-[#8D8A8A]">{hearts.length}</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleClapClick}>
          <img src="/roofing.png" alt="roofing" />
          <span className="text-[#8D8A8A]">{claps.length}</span>
        </div>
        <div className="flex items-center gap-2 ml-7 cursor-pointer" onClick={() => setShowComments(!showComments)}>
          <img src="/message.png" alt="message" />
          <span className="text-[#8D8A8A]">{comments.length} Comments</span>
        </div>
      </div>

      {showComments && (
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <input type="text" placeholder="Write a comment..." className="w-full p-2 border rounded-lg" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            <button onClick={handleAddComment} className="p-2 bg-blue-500 text-white rounded-lg">
              <FaComment />
            </button>
          </div>
          <div className="mt-2">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <img src={post.avatar} alt="Profile" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="text-sm font-semibold">{comment.user}</p>
                  <p className="text-sm text-gray-700">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostItemUser;
