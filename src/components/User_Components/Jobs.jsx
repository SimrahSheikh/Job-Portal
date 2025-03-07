import { useEffect, useState } from "react";
import JobCards from "./JobCards";
import axios from "axios";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/hr/getjobs");
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Available Jobs</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
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
        ))}
      </div>
    </div>
  );
}
