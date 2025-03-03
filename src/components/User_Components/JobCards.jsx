import React from 'react';
import { useNavigate } from 'react-router-dom';

function JobCards({ id, logo, company, timePosted, title, type, level, salary, location }) {
  const navigate = useNavigate();

  const handleOpenClick = () => {
    navigate(`/jobs/${id}`);
  };

  return (
    <div className="max-w-sm p-5 bg-white shadow-lg rounded-2xl border">
      {/* Company Logo and Save Button */}
      <div className="flex justify-between items-center">
        <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full font-bold">
          {logo}
        </div>
        <button className="p-1 border rounded-lg">
          <span className="text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
          </span>
        </button>
      </div>

      {/* Company Name and Date */}
      <p className="text-gray-500 text-sm mt-3">
        {company} <span className="text-gray-400">· {timePosted}</span>
      </p>

      {/* Job Title */}
      <h2 className="text-xl font-semibold mt-2">{title}</h2>

      {/* Job Tags */}
      <div className="flex gap-2 mt-3">
        <span className="px-3 py-1 text-sm bg-gray-200 rounded-lg">{type}</span>
        <span className="px-3 py-1 text-sm bg-gray-200 rounded-lg">{level}</span>
      </div>

      {/* Salary & Location */}
      <p className="text-lg font-semibold mt-4">{salary}</p>
      <p className="text-gray-500 text-sm">{location}</p>

      {/* Apply Button */}
      <button onClick={handleOpenClick} className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
        Open
      </button>
    </div>
  );
}

export default JobCards;
