import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem("auth-token");

  const lastJobElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    setPage(1); // Reset page to 1 when component mounts
    setJobs([]); // Clear jobs when component mounts
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/hr/getjobs?page=${page}&limit=6`, {
        headers: {
          'authorization-user': `Bearer ${token}`, // Use correct header key
        },
      });
      const activeJobs = response.data.filter(job => job.isActive); // Show only active jobs
      setJobs(prevJobs => {
        const newJobs = activeJobs.filter(job => !prevJobs.some(prevJob => prevJob._id === job._id));
        return [...prevJobs, ...newJobs];
      });
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.put(
        `http://localhost:3000/hr/deleteJobPost/${jobId}`,
        {}, // Empty body for PUT request
        {
          headers: {
            "Content-Type": "application/json",
            'authorization-user': `Bearer ${token}`, // Use correct header key
          },
        }
      );
      setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId)); // Remove deleted job from state
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job. Try again.");
    }
  };

  const viewApplication = (job) => {
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
          {jobs.map((job, index) => {
            if (jobs.length === index + 1) {
              return (
                <div ref={lastJobElementRef} key={job._id}>
                  <div className="rounded-2xl shadow-lg p-4 bg-white">
                    <h2 className="text-xl font-semibold">{job.Title}</h2>
                    <p className="text-gray-600">{job.JobDescription}</p>
                    <p className="mt-2 text-sm">
                      Location: {Array.isArray(job.Location) ? job.Location.join(" / ") : job.Location}
                    </p>
                    <p className="text-sm">Salary: ₹{job.Salary?.toLocaleString("en-IN")}/month</p>

                    {/* View Applicants Button */}
                    <button
                      onClick={() => viewApplication(job)}
                      className="mt-4 px-4 py-2 border rounded-lg text-blue-600 hover:bg-blue-100"
                    >
                      View Applicants
                    </button>

                    {/* Delete Job Post Button */}
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="mt-4 ml-2 px-4 py-2 border rounded-lg text-red-600 hover:bg-red-100"
                    >
                      Delete Job Post
                    </button>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={job._id} className="rounded-2xl shadow-lg p-4 bg-white">
                  <h2 className="text-xl font-semibold">{job.Title}</h2>
                  <p className="text-gray-600">{job.JobDescription}</p>
                  <p className="mt-2 text-sm">
                    Location: {Array.isArray(job.Location) ? job.Location.join(" / ") : job.Location}
                  </p>
                  <p className="text-sm">Salary: ₹{job.Salary?.toLocaleString("en-IN")}/month</p>

                  {/* View Applicants Button */}
                  <button
                    onClick={() => viewApplication(job)}
                    className="mt-4 px-4 py-2 border rounded-lg text-blue-600 hover:bg-blue-100"
                  >
                    View Applicants
                  </button>

                  {/* Delete Job Post Button */}
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="mt-4 ml-2 px-4 py-2 border rounded-lg text-red-600 hover:bg-red-100"
                  >
                    Delete Job Post
                  </button>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default PostedJobs;
