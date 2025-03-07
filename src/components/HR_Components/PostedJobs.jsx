import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/hr/getjobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  const viewApplication = async (job) => {
    navigate(`/hr/applications/${job._id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Posted Jobs</h1>

      {loading && <p className="text-gray-500">Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && jobs.length === 0 ? (
        <p className="text-gray-500">No jobs posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <div key={job._id} className="rounded-2xl shadow-lg p-4 bg-white">
              <h2 className="text-xl font-semibold">{job.Title}</h2>
              <p className="text-gray-600">{job.JobDescription}</p>
              <p className="mt-2 text-sm">
                Location:{" "}
                {Array.isArray(job.Location)
                  ? job.Location.join(" / ")
                  : job.Location}
              </p>
              <p className="text-sm">
                Salary: ₹{job.Salary?.toLocaleString("en-IN")}/month
              </p>
              <button
                onClick={() => viewApplication(job)}
                // onClick={() => navigate(`/hr/applications`)}
                className="mt-4 px-4 py-2 border rounded-lg text-blue-600 hover:bg-blue-100"
              >
                View Applicants
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostedJobs;
