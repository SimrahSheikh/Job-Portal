import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../HR_Components/NavBar";



const HRLayout = () => {

  return (
    <div className="flex" >
      <NavBar />
      <div className="ml-64 flex-1 flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-300 to-slate-500">
       
        <Outlet />
        </div>
      </div>
   
  );
};

export default HRLayout;
