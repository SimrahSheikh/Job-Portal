import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Briefcase, FileText, PlusCircle } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login"); 
  };

  return (
    <aside className="h-screen fixed w-64 bg-white border-r shadow-md flex flex-col p-4 transition-all">
     
      <div className="flex items-center justify-center py-4 text-xl font-bold text-gray-700">
        Job Portal
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          <NavItem icon={<PlusCircle size={20} />} text="Post New Job" link="/hr/postjob" />
          <NavItem icon={<Briefcase size={20} />} text="Posted Jobs" link="/hr/postedjobs" />
          <NavItem icon={<FileText size={20} />} text="Profile" link="/hr/profile" />
        </ul>
      </nav>
      
      <button onClick={handleLogout} className="flex items-center p-3 rounded-md hover:bg-red-100 transition-all">
        <LogOut size={20} />
        <span className="ml-3 text-gray-700 font-medium">Logout</span>
      </button>
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
