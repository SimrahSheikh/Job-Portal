import { Outlet } from "react-router-dom";

import UserNavBar from "../User_Components/UserNavBar";



const UserLayout = () => {
  return (
    <div className="flex h-full ">
      <UserNavBar />
      <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-r from-slate-300 to-slate-500">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
