import { Link } from "react-router-dom";
import { Home, Briefcase, Bookmark, FileText, User } from "lucide-react";

const UserNavBar = () => {
  return (
    <aside className="h-screen w-64 bg-white border-r shadow-md flex flex-col p-4">
      <div className="flex items-center justify-center py-4 text-xl font-bold text-gray-700">
        Job Portal
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {/* <NavItem icon={<Home size={20} />} text="Dashboard" link="/user" /> */}
          <NavItem icon={<Briefcase size={20} />} text="Jobs" link="/jobs" />
          <NavItem icon={<FileText size={20} />} text="Applied Jobs" link="/applied-jobs" />
          <NavItem icon={<Bookmark size={20} />} text="Saved Jobs" link="/saved-jobs" />
          <NavItem icon={<FileText size={20} />} text="Application Status" link="/application-status" />
          <NavItem icon={<User size={20} />} text="Profile" link="/profile" />
        </ul>
      </nav>
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

export default UserNavBar;
