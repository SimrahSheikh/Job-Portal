import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../HR_Components/NavBar";


const HRLayout = () => {
//   const isHR = localStorage.getItem("role") === "HR"; // Assume role is stored

//   if (!isHR) return <Navigate to="/login" />; 

  return (
    <div className="flex">
      <NavBar/>
      <div className="ml-64 flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet /> 
      </div>
    </div>
  );
};

export default HRLayout;
