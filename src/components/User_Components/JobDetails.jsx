import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { jobListings } from "../../../data/demoData";
import Breadcrumbs from "./Breadcrumbs";

const JobDetails = () => {
  const { id } = useParams();
  const job = jobListings.find((job) => job.id === parseInt(id));
  const [selectedFile, setSelectedFile] = useState(null);

  if (!job) {
    return <div className="text-center text-gray-500 mt-10 text-lg">Job not found</div>;
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      {/* Breadcrumbs */}
      <Breadcrumbs jobTitle={job.title} />

      {/* Job Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900">{job.title}</h1>
        <p className="text-gray-500 text-sm mt-1">{job.company} · {job.timePosted}</p>
      </div>

      {/* Job Details */}
      <div className="bg-gray-100 p-5 rounded-lg shadow-sm mb-6">
        <p className="text-lg font-semibold text-gray-800">{job.salary}</p>
        <p className="text-gray-600">{job.location}</p>
      </div>

      <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>

      {/* Job Information */}
      <div className="bg-gray-50 p-5 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Job Details</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p><span className="font-semibold">Type:</span> {job.type}</p>
          <p><span className="font-semibold">Level:</span> {job.level}</p>
          <p><span className="font-semibold">Start Date:</span> {job.startDate}</p>
          <p><span className="font-semibold">Last Date:</span> {job.expireDate}</p>
        </div>
      </div>

      {/* Application Form */}
      <div className="bg-gray-100 p-5 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Apply Now</h2>
        <form>
          <div className="mb-4">
            <input
              type="file" id="upload"
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="upload" className="block font-medium mb-1 cursor-pointer bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
              Upload Resume
            </label>
            {selectedFile && (
              <p className="mt-2 text-gray-700">{selectedFile.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Cover Letter</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-gray-400 focus:outline-none"
              rows="5"
              placeholder="Write your cover letter..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobDetails;
