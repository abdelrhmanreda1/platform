import { useState } from "react";
import Sidebar from "../components/community/Sidebar";
import ResaubleCardCommunity from "../ui/ResaubleCardCommunity";

const Community = () => {
  const [activeTab, setActiveTab] = useState("suggestions");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const suggestionsData = [
    { name: "Salma Ahmed", img: "/pic.svg" },
    { name: "Salma Ahmed", img: "/pic.svg" },
    { name: "Salma Ahmed", img: "/pic.svg" },
    { name: "Salma Ahmed", img: "/pic.svg" },
    { name: "Salma Ahmed", img: "/pic.svg" },
    { name: "Salma Ahmed", img: "/pic.svg" },
    { name: "Salma Ahmed", img: "/pic.svg" },
    { name: "Salma Ahmed", img: "/pic.svg" },
  ];

  const friendRequestsData = [
    { name: "Loro Ali", img: "/pic.svg" },
    { name: "Ali Ahmed", img: "/sarah-brown.svg" },
    { name: "Salma Ahmed", img: "/vicky-brown.svg" },
    { name: "Ali Ahmed", img: "/sarah-brown.svg" },
    { name: "Salma Ahmed", img: "/vicky-brown.svg" },
    { name: "Ali Ahmed", img: "/pic.svg" },
    { name: "Salma Ahmed", img: "/vicky-brown.svg" },
    { name: "Ali Ahmed", img: "/sarah-brown.svg" },
    { name: "Salma Ahmed", img: "/vicky-brown.svg" },
    { name: "Ali Ahmed", img: "/sarah-brown.svg" },
    { name: "Salma Ahmed", img: "/vicky-brown.svg" },
    { name: "Ali Ahmed", img: "/pic.svg" },
    { name: "Salma Ahmed", img: "/vicky-brown.svg" },
    { name: "Loro Ali", img: "/pic.svg" },
    { name: "Ali Ahmed", img: "/sarah-brown.svg" },
    { name: "Salma Ahmed", img: "/vicky-brown.svg" },
  ];

  const recommendedData = [
    { name: "Udacity", img: "/Company-Logo-suggestion.svg" },
    { name: "Udacity", img: "/Company-Logo-suggestion.svg" },
    { name: "Udacity", img: "/Company-Logo-suggestion.svg" },
    { name: "Udacity", img: "/Company-Logo-suggestion.svg" },
  ];

  const allFriendsData = [
    { name: "Loro Ali", img: "/pic.svg" },
    { name: "Ali Ahmed", img: "/sarah-brown.svg" },
    { name: "Salma Ahmed", img: "/vicky-brown.svg" },
    { name: "Ali Ahmed", img: "/sarah-brown.svg" },
    { name: "Salma Ahmed", img: "/vicky-brown.svg" },
    { name: "Ali Ahmed", img: "/pic.svg" },
    { name: "Salma Ahmed", img: "/vicky-brown.svg" },
    { name: "Ali Ahmed", img: "/sarah-brown.svg" },
    { name: "Salma Ahmed", img: "/vicky-brown.svg" },
    { name: "Ali Ahmed", img: "/sarah-brown.svg" },
    { name: "Salma Ahmed", img: "/vicky-brown.svg" },
    { name: "Ali Ahmed", img: "/pic.svg" },
    { name: "Salma Ahmed", img: "/vicky-brown.svg" },
    { name: "Loro Ali", img: "/pic.svg" },
    { name: "Ali Ahmed", img: "/sarah-brown.svg" },
    { name: "Salma Ahmed", img: "/vicky-brown.svg" },
  ];

  const followingData = [
    { name: "Loro Ali", img: "/nomad-company.svg" },
    { name: "Ali Ahmed", img: "/nomad-company.svg" },
    { name: "Salma Ahmed", img: "/nomad-company.svg" },
    { name: "Ali Ahmed", img: "/nomad-company.svg" },
    { name: "Salma Ahmed", img: "/nomad-company.svg" },
    { name: "Ali Ahmed", img: "/nomad-company.svg" },
    { name: "Salma Ahmed", img: "/nomad-company.svg" },
    { name: "Ali Ahmed", img: "/nomad-company.svg" },
    { name: "Salma Ahmed", img: "/nomad-company.svg" },
    { name: "Ali Ahmed", img: "/nomad-company.svg" },
    { name: "Salma Ahmed", img: "/nomad-company.svg" },
    { name: "Ali Ahmed", img: "/nomad-company.svg" },
    { name: "Salma Ahmed", img: "/nomad-company.svg" },
    { name: "Loro Ali", img: "/nomad-company.svg" },
    { name: "Ali Ahmed", img: "/nomad-company.svg" },
    { name: "Salma Ahmed", img: "/nomad-company.svg" },
  ];

  const tabs = [
    { id: "suggestions", label: "Suggestions" },
    { id: "friendRequests", label: "Friend Requests" },
    { id: "allFriends", label: "All Friends" },
    { id: "following", label: "Following" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "suggestions":
        return (
          <>
            <div className="flex items-center justify-between mt-3 md:mt-9 mx-4 md:mx-0">
              <h2 className="text-[17px] md:text-2xl font-semibold text-gray-800">People with similar interests</h2>
              <button className="text-blue-600 underline text-base md:text-lg font-medium">See All</button>
            </div>
            <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7 mb-6">
              {suggestionsData.map((suggestion, index) => (
                <ResaubleCardCommunity key={index} name={suggestion.name} img={suggestion.img} primaryLabel="Add" secondaryLabel="Delete" primary={true} />
              ))}
            </div>

            <div className="flex items-center justify-between mt-9 mx-4 md:mx-0">
              <h2 className="text-[17px] md:text-2xl font-semibold text-gray-800">Recommended for you</h2>
              <button className="text-blue-600 underline text-base md:text-lg font-medium">See All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7 mb-6">
              {recommendedData.map((item, index) => (
                <ResaubleCardCommunity key={index} name={item.name} img={item.img} primaryLabel="Follow" secondaryLabel="Delete" primary={true} />
              ))}
            </div>
          </>
        );
      case "friendRequests":
        return (
          <>
            <div className="flex items-center justify-between mt-3 md:mt-9 mx-4 md:mx-0">
              <h2 className="text-[17px] md:text-2xl font-semibold text-gray-800">Friend Requests</h2>
              <button className="text-blue-600 underline text-base md:text-lg font-medium">See All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7 mb-6">
              {friendRequestsData.map((request, index) => (
                <ResaubleCardCommunity key={index} name={request.name} img={request.img} primaryLabel="Accept" secondaryLabel="Reject" primary={true} />
              ))}
            </div>
          </>
        );
      case "allFriends":
        return (
          <>
            <div className="flex items-center justify-between mt-3 md:mt-9 mx-4 md:mx-0">
              <h2 className="text-[17px] md:text-2xl font-semibold text-gray-800">All Friends</h2>
              <button className="text-blue-600 underline text-base md:text-lg font-medium">See All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7 mb-6">
              {allFriendsData.map((friend, index) => (
                <ResaubleCardCommunity key={index} name={friend.name} img={friend.img} secondaryLabel="Unfriend" />
              ))}
            </div>
          </>
        );
      case "following":
        return (
          <>
            <div className="flex items-center justify-between mt-3 md:mt-9 mx-4 md:mx-0">
              <h2 className="text-[17px] md:text-2xl font-semibold text-gray-800">Following</h2>
              <button className="text-blue-600 underline text-base md:text-lg font-medium">See All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7 mb-6">
              {followingData.map((follow, index) => (
                <ResaubleCardCommunity key={index} name={follow.name} img={follow.img} secondaryLabel="Unfollow" />
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full gap-4  md:w-[88%] mx-auto">
      <div className="hidden lg:block min-h-screen">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      <div className="flex-1 py-3 lg:p-6 w-full">
        <div className="lg:hidden grid grid-cols-2 pb-4 border-b border-gray-200 px-5 gap-2 mb-4 justify-center">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${activeTab === tab.id ? "bg-main text-white shadow-md" : "text-gray-700 hover:bg-gray-100 hover:shadow-sm"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Community;
