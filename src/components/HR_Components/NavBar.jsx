import { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { LogOut, Briefcase, FileText, PlusCircle } from "lucide-react";

const NavBar = () => {
  const location = useLocation();
const handleLogout = () => {}

  return (
    <aside className="h-screen fixed w-64 bg-white border-r shadow-md flex flex-col p-4 transition-all">
     
      <div className="flex items-center justify-center py-4 text-xl font-bold text-gray-700">
        Job Portal
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">

          <NavItem icon={<PlusCircle size={20} />} text="Post New Job" link="/hr/postjob"  currentPath={location.pathname}/>
          <NavItem icon={<Briefcase size={20} />} text="Posted Jobs" link="/hr/postedjobs"  currentPath={location.pathname}/>
          <NavItem icon={<FileText size={20} />} text="Profile" link="/hr/profile"  currentPath={location.pathname}/>
        </ul>
      </nav>
      
      <button onClick={handleLogout} className="flex items-center p-3 rounded-md hover:bg-red-100 transition-all">
        <LogOut size={20} />
        <span className="ml-3 text-gray-700 font-medium">Logout</span>
      </button>
      
      {/* HR Info */}
      {/* <div className="border-t flex items-center p-3">
        <img 
          src="https://ui-avatars.com/api/?name=JH&background=c7d2fe&color=3730a3" 
          alt="HR Avatar" 
          className="w-10 h-10 rounded-md" 
        />
        <div className="ml-3">
          <h4 className="font-semibold text-gray-800">Jhon Wick</h4>
          <span className="text-xs text-gray-600">HR Manager</span>
        </div>
      </div> */}

    </aside>
  );
};

const NavItem = ({ icon, text, link, currentPath }) => {
  const isActive = currentPath === link;
  return (
    <li>
      <Link to={link} className={`flex items-center p-3 rounded-md transition-all ${isActive ? 'bg-indigo-100' : 'hover:bg-indigo-100'}`}>
        {icon}
        <span className="ml-3 text-gray-700 font-medium">{text}</span>
      </Link>
    </li>
  );
};

export default NavBar;
