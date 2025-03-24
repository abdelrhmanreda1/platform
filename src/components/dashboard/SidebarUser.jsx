import { useAuth } from "../../context/AuthContext";
import { useProfileData } from "../../services/apiProfile";

const Sidebardata = () => {
  const { data, isLoading } = useProfileData();

  console.log(data);

  const { role } = useAuth();
  console.log(role);

  return (
    <>
      <div
        className=" bg-white max-w-sm mx-auto overflow-hidden"
        style={{
          boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)",
        }}
      >
        <div className="relative h-32 bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }}>
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
            <img src={data?.data.profilePicture?.secure_url} alt="Profile" className="w-[200px] shadow-sm rounded-full" />
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            {data?.data.firstName} {data?.data.lastName}
          </h2>
          <hr className="bg-[#FF6B35] h-[1px] w-[88%] mx-auto border-0" />
          <div className="flex items-center gap-2 w-[88%] mx-auto mt-4 ">
            <img src="/fluent-mdl2_work.png" alt="icon of developer" />
            {role === "Company" ? <p className="text-lg mt-1">{data?.data.companyName || "companyName"}</p> : <p className="text-lg mt-1">{data?.data.jobTitle || "jobTitle"}</p>}
          </div>
          <div className="flex items-center gap-2 w-[88%] mx-auto mt-4 mb-7 ">
            <img src="/mynaui_location.png" alt="icon of developer" />
            <p className="text-lg mt-1">{data?.data.address || "address"}</p>
          </div>
        </div>
      </div>

      <div
        style={{
          boxShadow: "0 12px 20px rgba(1, 62, 93, 0.4)",
        }}
        className="p-8 bg-white max-w-sm mx-auto mt-6 overflow-hidden"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">On the web</h2>
        <div className="flex items-center gap-14 mt-5 ">
          {role === "Employee" && (
            <a href={data?.data.github || "#"} className="hover:opacity-80">
              <img src="/githup.svg" alt="GitHub" className="w-6 h-6 " />
            </a>
          )}
          {role === "Employee" && (
            <a href={data?.data.twitter || "#"} className="hover:opacity-80">
              <img src="/twitter.svg" alt="Twitter" className="w-10 h-10 " />
            </a>
          )}
          <a href={data?.data.website || "#"} className="hover:opacity-80">
            <img src="/web-icon.svg" alt="Website" className="w-6 h-6" />
          </a>
        </div>
        <hr className="bg-[#FF6B35] h-[1px] w-[80%] mt-8 mb-7 border-0" />
      </div>
    </>
  );
};

export default Sidebardata;
