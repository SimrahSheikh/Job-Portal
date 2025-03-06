// StatusCard.js
import React from 'react';

const StatusCard = ({ job }) => {
  console.log(job);
  return (
    <div key={job._id} className="max-w-sm p-5 bg-white shadow-lg rounded-2xl border">
      {/* Company Logo and Save Button */}
      <div className="flex justify-between items-center">
        <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full font-bold">
        {job.jobDetails.CompanyName.charAt(0)}
        </div>
      </div>

      {/* Company Name and Date */}
      <p className="text-gray-500 text-sm mt-3">
        {job.jobDetails.CompanyName} <span className="text-gray-400">· {job.timePosted}</span>
      </p>

      {/* Job Title */}
      <h2 className="text-xl font-semibold mt-2">{job.jobDetails.Title}</h2>

      {/* Job Tags */}
      <div className="flex gap-2 mt-3">
        <span className="px-3 py-1 text-sm bg-gray-200 rounded-lg">{job.jobDetails.JobType}</span>
        <span className="px-3 py-1 text-sm bg-gray-200 rounded-lg">{job.jobDetails.Experience} years</span>
      </div>

      {/* Salary & Location */}
      <p className="text-lg font-semibold mt-4">{job.jobDetails.Salary} per Annum</p>
      <p className="text-gray-500 text-sm">{job.location}</p>

      {/* Job Status */}
      <p className="mt-3">
        <strong>Status:</strong> 
        <span className={`ml-1 px-2 py-1 text-sm rounded-lg ${getStatusClass(getStatusName(job.status))}`}>
          {getStatusName(job.status)}
        </span>
      </p>
    </div>
  );
};

// Function to determine the status class based on the job status
const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'applied':
      return 'bg-blue-200 text-blue-800';
    case 'interview':
      return 'bg-orange-200 text-orange-800';
    case 'rejected':
      return 'bg-red-200 text-red-800';
    case 'accepted':
      return 'bg-green-200 text-green-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};
const getStatusName = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'Applied';
    case 'in review':
      return 'Interview';
    case 'rejected':
      return 'Rejected';
    case 'accepted':
      return 'Accepted';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

export default StatusCard;