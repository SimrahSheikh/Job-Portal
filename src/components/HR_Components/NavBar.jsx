import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Briefcase, FileText, PlusCircle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside className="h-screen fixed w-64 bg-white border-r shadow-md flex flex-col p-4 transition-all">
      {/* Company Name */}
      <div className="flex items-center justify-center py-4 text-xl font-bold text-gray-700">
        Job Portal
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          <NavItem
            icon={<Home size={20} />}
            text="Home"
            link="/hr/home"
            currentPath={location.pathname}
          />
          <NavItem
            icon={<PlusCircle size={20} />}
            text="Post New Job"
            link="/hr/postjob"
            currentPath={location.pathname}
          />
          <NavItem
            icon={<Briefcase size={20} />}
            text="Posted Jobs"
            link="/hr/postedjobs"
            currentPath={location.pathname}
          />
          <NavItem
            icon={<FileText size={20} />}
            text="Profile"
            link="/hr/profile"
            currentPath={location.pathname}
          />
        </ul>
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center p-3 rounded-md hover:bg-red-100 transition-all"
      >
        <LogOut size={20} />
        <span className="ml-3 text-gray-700 font-medium">Logout</span>
      </button>
    </aside>
  );
};

const NavItem = ({ icon, text, link, currentPath }) => {
  const isActive = currentPath === link;
  return (
    <li>
      <Link
        to={link}
        className={`flex items-center p-3 rounded-md transition-all ${
          isActive ? "bg-indigo-100" : "hover:bg-indigo-100"
        }`}
      >
        {icon}
        <span className="ml-3 text-gray-700 font-medium">{text}</span>
      </Link>
    </li>
  );
};

export default NavBar;
