import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";

const ProfileLayout = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ProfileLayout;
