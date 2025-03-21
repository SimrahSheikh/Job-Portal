import React from "react"; // Add Suspense
import { Link, useLocation } from "react-router-dom";
import { Briefcase, User, LogOut } from "lucide-react";
import {
  List,
  Card,
  ListItem,
  Accordion,
  Typography,
  AccordionBody,
  ListItemPrefix,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";

const UserNavBar = () => {
  const location = useLocation();
  const [open, setOpen] = React.useState(null);
  const { logout } = useAuth();


  const handleOpen = (value) => {
    setOpen(open === value ? null : value);
  };

  const LIST_ITEM_STYLES =
    "select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900";

  return (
    <aside className="h-full w-64 border-r shadow-md flex flex-col py-6 px-3 bg-white">
      <div className="flex items-center justify-center py-4 text-xl font-bold text-gray-700">
        Job Portal
      </div>

      <nav className="flex flex-col justify-between h-full">
        <List className="space-y-2">
          {/* Jobs Section */}
          <Accordion open={open === 1}>
            <ListItem
              selected={open === 1}
              onClick={() => handleOpen(1)}
              className="p-3 select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900"
            >
              <ListItemPrefix>
                <Briefcase size={20} />
              </ListItemPrefix>
              <Typography className="mr-auto font-normal text-inherit">
                Jobs
              </Typography>
              <ChevronDownIcon
                strokeWidth={3}
                className={`ml-auto h-4 w-4 text-gray-500 transition-transform ${open === 1 ? "rotate-180" : "" }`}
              />
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <NavItem
                  text="All Jobs"
                  link="/user/jobs"
                  currentPath={location.pathname}
                  indent={16}
                />
                <NavItem
                  text="Applied Jobs"
                  link="/user/applied-jobs"
                  currentPath={location.pathname}
                  indent={16}
                />
                <NavItem
                  text="Saved Jobs"
                  link="/user/saved-jobs"
                  currentPath={location.pathname}
                  indent={16}
                />
              </List>
            </AccordionBody>
          </Accordion>

          {/* Profile Section */}
          <Accordion open={open === 2}>
            <ListItem
              selected={open === 2}
              onClick={() => handleOpen(2)}
              className="p-3 select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900"
            >
              <ListItemPrefix>
                <User size={20} />
              </ListItemPrefix>
              <Typography className="mr-auto font-normal text-inherit">
                Profile
              </Typography>
              <ChevronDownIcon
                strokeWidth={3}
                className={`ml-auto h-4 w-4 text-gray-500 transition-transform ${open === 2 ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <NavItem
                  text="My Profile"
                  link="/user/profile"
                  currentPath={location.pathname}
                  indent={16}
                />
              </List>
            </AccordionBody>
          </Accordion>
        </List>

        {/* Log Out */}
        <Link
          to={"/login"}
          onClick={() => { localStorage.removeItem("auth-token"); localStorage.removeItem("role"); logout(); }}
          className="flex items-center p-3 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-200 hover:bg-indigo-100"
        >
          <LogOut size={20} />
          <span className="ml-3 text-gray-700 font-medium">Log Out</span>
        </Link>
      </nav>
    </aside>
  );
};

const NavItem = React.memo(({ text, link, currentPath, indent = 0 }) => {
  const isActive = currentPath === link;
  return (
    <ListItem
      className={`px-${indent} py-2 select-none hover:bg-indigo-100 focus:bg-indigo-100 active:bg-indigo-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900`}
    >
      <Link to={link} className="flex items-center p-2">
        <span className="ml-3 text-gray-700 font-medium">{text}</span>
      </Link>
    </ListItem>
  );
});

export default UserNavBar;
