import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut,  Briefcase, FileText, PlusCircle } from "lucide-react";

const NavBar = () => {
  const [expanded, setExpanded] = useState(true);
  const navWidth = screen.width;
  console.log(navWidth);
  
  return (
    <aside className="h-screen fixed w-64 bg-white border-r shadow-md flex flex-col p-4 transition-all">
      {/* Company Name */}
      <div className="flex items-center justify-center py-4 text-xl font-bold text-gray-700">
        Job Portal
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">

          <NavItem icon={<PlusCircle size={20} />} text="Post New Job" link="/hr/postjob" />
          <NavItem icon={<Briefcase size={20} />} text="Posted Jobs" link="/hr/postedjobs" />
          <NavItem icon={<LogOut size={20} />} text="Logout" link="/logout" />
        </ul>
      </nav>
      
      {/* HR Info */}
      <div className="border-t flex items-center p-3">
        <img src="https://ui-avatars.com/api/?name=JH&background=c7d2fe&color=3730a3" 
             alt="HR Avatar" className="w-10 h-10 rounded-md" />
        <div className="ml-3">
          <h4 className="font-semibold text-gray-800">Jhon Wick</h4>
          <span className="text-xs text-gray-600">HR Manager</span>
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, text, link }) => {
  return (
    <li>
      <Link to={link} className="flex items-center p-3 rounded-md hover:bg-indigo-100 transition-all">
        {icon}
        <span className="ml-3 text-gray-700 font-medium">{text}</span>
      </Link>
    </li>
  );
};

export default NavBar;
