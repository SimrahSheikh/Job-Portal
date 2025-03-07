import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function JobCards({ id, logo, company, timePosted, title, type, level, salary, location }) {
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();
  const pagelocation = useLocation();
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    const checkSavedAndApplied = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/saved-jobs/check?job_id=${id}`, {
          headers: {
            "authorization-user": 'Bearer ' + token,
          }
        });
        setSaved(response.data.saved);
        const apply = await axios.get(`http://localhost:3000/user/profile/appliedjobs/check?jobId=${id}`, {
          headers: {
            "authorization-user": 'Bearer ' + token,
          }
        });
        setApplied(apply.data.applied);
      } catch (error) {
        console.log(error);
      }
    };
    checkSavedAndApplied();
  }, [id]);

  const handleOpenClick = () => {
    navigate(`/user/jobs/${id}`);
  };

  const calculateTimeAgo = (timePosted) => {
    const now = new Date();
    const postedDate = new Date(timePosted);
    const diffTime = Math.abs(now - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths} months ago`;
    }
  };
  const timeAgo = calculateTimeAgo(timePosted);

  const saveJob = async () => {
    try {
      if (pagelocation.pathname === '/user/saved-jobs' || (pagelocation.pathname === '/user/jobs' && saved)) {
        await axios.delete(`http://localhost:3000/api/saved-jobs/remove?job_id=${id}`, {
          headers: {
            "authorization-user": 'Bearer ' + token,
          }
        });
        setSaved(false);
      } else {
        await axios.post('http://localhost:3000/api/saved-jobs/save', {
          job_id: id,
        }, {
          headers: {
            "authorization-user": 'Bearer ' + token,
          },
        });
        setSaved(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-sm p-5 bg-white shadow-lg rounded-2xl border transition-transform transform hover:scale-105 duration-300">
      {/* Company Logo and Save Button */}
      <div className="flex justify-between items-center">
        <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full font-bold">
          {logo}
        </div>
        <button className="p-1 border rounded-lg" onClick={saveJob}>
          <span className="text-gray-600">
            {saved ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
            )}
          </span>
        </button>
      </div>

      {/* Company Name and Date */}
      <p className="text-gray-500 text-sm mt-3">
        {company} <span className="text-gray-400">· {timeAgo}</span>
      </p>

      {/* Job Title */}
      <h2 className="text-xl font-semibold mt-2">{title}</h2>

      {/* Job Tags */}
      <div className="flex gap-2 mt-3">
        <span className="px-3 py-1 text-sm bg-gray-200 rounded-lg">{type}</span>
        <span className="px-3 py-1 text-sm bg-gray-200 rounded-lg">{level} years</span>
      </div>

      {/* Salary & Location */}
      <p className="text-lg font-semibold mt-4">{salary.toLocaleString()} per annum</p>
      <p className="text-gray-500 text-sm">{location}</p>

      {/* Apply Button */}
      {applied ?
        <div className='mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 text-center'>
          Applied
        </div> : <button onClick={handleOpenClick} className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
          {pagelocation.pathname === '/user/saved-jobs' ? "Continue" : "Open"}
        </button>}
    </div>
  );
}

export default JobCards;
