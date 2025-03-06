import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../HR_Components/NavBar";



const HRLayout = () => {

  return (
    <div className="flex" >
      <NavBar />
      <div className="ml-64 flex-1 flex items-center justify-center bg-gray-100 min-h-screen">
       
        <Outlet />
        </div>
      </div>
   
  );
};

export default HRLayout;
