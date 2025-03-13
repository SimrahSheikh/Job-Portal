import { useEffect, useState } from "react";
import JobCards from "./JobCards";
// import axios from "axios";
import JobPageLoading from "../Loading/JobPageLoading";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/slice/userSlice/postSlice";

export default function JobList() {
  const dispatch = useDispatch();
  const { posts: jobs = [], loading, error } = useSelector((state) => state.post); // Default jobs to an empty array

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return <JobPageLoading />;
  }
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Available Jobs</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 ? (
          <p className="text-center">No jobs available</p>
        ) : (
          jobs.map((job) => (
            <JobCards
              key={job._id}
              id={job._id}
              logo={job.CompanyName.charAt(0)} // Assuming logo is the first letter of the company name
              company={job.CompanyName}
              timePosted={new Date(job.createdAt).toLocaleDateString()}
              title={job.Title}
              type={job.JobType}
              level={job.Experience}
              salary={job.Salary}
              location={Array.isArray(job.Location) ? job.Location.join(", ") : job.Location}
            />
          ))
        )}
      </div>
    </div>
  );
}