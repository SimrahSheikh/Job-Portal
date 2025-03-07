import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import Breadcrumbs from "./Breadcrumbs";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("user-token") || localStorage.getItem("auth-token");

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/hr/getjobsById/${id}`);
        setJob(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleCoverLetterChange = (event) => {
    setCoverLetter(event.target.value);
  };

  const submitApplication = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("resume", selectedFile);
    formData.append("experience", Number(experience));
    formData.append("location", JSON.stringify([location]));
    formData.append("coverLetter", coverLetter);
    formData.append("hrId", job.HRId);

    try {
      await axios.post(`http://localhost:3000/user/profile/application/${id}`, formData, {
        headers: {
          "authorization-user": 'Bearer ' + token,
          "Content-Type": "multipart/form-data",
        }
      });
    } catch (error) {
      console.error(error);
      // alert("An error occurred while submitting your application");
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!job) {
    return <div className="text-center text-gray-500 mt-10 text-lg">Job not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      {/* Breadcrumbs */}
      <Breadcrumbs jobTitle={job.Title} />

      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900">{job.Title}</h1>
        <p className="text-gray-500 text-sm mt-1">{job.CompanyName} · {new Date(job.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="bg-gray-100 p-5 rounded-lg shadow-sm mb-6">
        <p className="text-lg font-semibold text-gray-800">Salary: {job.Salary.toLocaleString()} per annum</p>
        <p className="text-gray-600">Location: {job.Location.join(", ")}</p>
      </div>

      <p className="text-gray-700 leading-relaxed mb-6">{job.JobDescription}</p>

      {/* Job Information */}
      <div className="bg-gray-50 p-5 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Job Details</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p><span className="font-semibold">Type:</span> {job.JobType}</p>
          <p><span className="font-semibold">Experience:</span> {job.Experience} years</p>
          <p><span className="font-semibold">Start Date:</span> {new Date(job.createdAt).toLocaleDateString()}</p>
          <p><span className="font-semibold">Last Date:</span> {new Date(job.LastDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Application Form */}
      <div className="bg-gray-100 p-5 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Apply Now</h2>
        <form onSubmit={submitApplication}>
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
            <label className="block text-gray-700 font-medium mb-1">Experience</label>
            <select name="experience" value={experience} onChange={handleExperienceChange} className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-gray-400 focus:outline-none">
              <option value="">Select Experience</option>
              <option value="0">0-1 years</option>
              <option value="1">1-3 years</option>
              <option value="3">3-5 years</option>
              <option value="5">5+ years</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Preferred Location</label>
            <select name="location" value={location} onChange={handleLocationChange} className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-gray-400 focus:outline-none">
              <option value="">Select Location</option>
              {job.Location.map((loc, index) => (
                <option key={index} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Cover Letter</label>
            <textarea
              name="coverLetter"
              value={coverLetter}
              onChange={handleCoverLetterChange}
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
