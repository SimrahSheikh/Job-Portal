import { Link, useLocation } from "react-router-dom";
import { Briefcase, Bookmark, FileText, User } from "lucide-react";

const UserNavBar = () => {
  const location = useLocation();
  // console.log(location.pathname);
  

  return (
    <aside className="h-full w-64 border-r shadow-md flex flex-col p-4">
      <div className="flex items-center justify-center py-4 text-xl font-bold text-gray-700">
        Job Portal
      </div>
 
      <nav className="flex-1">
        <ul className="space-y-2">
          <NavItem icon={<Briefcase size={20} />} text="Jobs" link="/jobs" currentPath={location.pathname} />
          <NavItem icon={<FileText size={20} />} text="Applied Jobs" link="/applied-jobs" currentPath={location.pathname} />
          <NavItem icon={<Bookmark size={20} />} text="Saved Jobs" link="/saved-jobs" currentPath={location.pathname} />
          <NavItem icon={<User size={20} />} text="Profile" link="/profile" currentPath={location.pathname} />
        </ul>
      </nav>
    </aside>
  );
};

const NavItem = ({ icon, text, link, currentPath }) => {
  const isActive = currentPath === link;
  return (
    <li>
      <Link to={link} className={`flex items-center p-3 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-200 ${isActive ? 'bg-indigo-100' : 'hover:bg-indigo-100'}`}>
        {icon}
        <span className="ml-3 text-gray-700 font-medium">{text}</span>
      </Link>
    </li>
  );
};

export default UserNavBar;
