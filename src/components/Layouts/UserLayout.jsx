import { Outlet } from "react-router-dom";

import UserNavBar from "../User_Components/UserNavBar";



const UserLayout = () => {
  return (
    <div className="flex h-screen">
      <UserNavBar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
