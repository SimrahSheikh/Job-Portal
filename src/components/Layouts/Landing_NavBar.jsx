import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const Landing_NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className="bg-sky-300 p-4 shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white text-xl font-bold">
            Job Portal
          </Link>
          <Link to="/premium" className="text-white text-sm hidden md:block">
            Go Premium
          </Link>
        </div>

        <ul className="md:flex md:space-x-6 absolute md:static bg-sky-300 w-full left-0 top-16 md:w-auto transition-all">
          <li>
            <Link to="/login" className="block p-3 text-white hover:bg-sky-400">
              Login
            </Link>
          </li>

          {/* Employer Dropdown */}
          <li
            className="relative group"
            ref={dropdownRef}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="block p-3 text-white hover:bg-sky-400 w-full md:w-auto">
              Employers ▼
            </button>

            {/* Dropdown List */}
            <ul
              className={`absolute left-0 bg-white text-black shadow-md rounded-md overflow-hidden w-48 z-50 ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <Link
                  to="/login-hr"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/premium"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};
