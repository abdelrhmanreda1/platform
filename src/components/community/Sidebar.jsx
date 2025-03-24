const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "suggestions", icon: "/iconuser3.svg", label: "Suggestions" },
    { id: "friendRequests", icon: "/iconuser2.svg", label: "Friend Requests" },
    { id: "allFriends", icon: "/iconuser4.svg", label: "All Friends" },
    { id: "following", icon: "/iconuser1.svg", label: "Following" },
  ];

  return (
    <aside className="w-64 sm:w-72 p-4 border-l border-r border-gray-400 bg-white h-full">
      <ul className="space-y-4 mt-10">
        {tabs.map((tab) => (
          <li key={tab.id} className={`flex items-center p-2 rounded-sm justify-between gap-3 cursor-pointer font-semibold text-gray-700 hover:bg-gray-200 transition-colors duration-200 ${activeTab === tab.id ? "bg-gray-200" : ""}`} onClick={() => setActiveTab(tab.id)}>
            <div className="flex items-center gap-3">
              <img src={tab.icon} alt={tab.label} className="w-6" />
              <p>{tab.label}</p>
            </div>
            <span className="text-2xl font-normal">&gt;</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
