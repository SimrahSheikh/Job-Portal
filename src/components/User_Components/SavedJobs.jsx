import { useState, useEffect } from "react";
import axios from "axios";
import JobCards from "./JobCards";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/saved-jobs", {
          headers: {
            "authorization-user": 'Bearer ' + token,
          }
        });
        // console.log(response.data[0]);
        setSavedJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [savedJobs]);

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
        {savedJobs.map((job) => (
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
            location={Array.isArray(job.Location) ? job.Location.join(", ") : job.Location} // Handle location as array or string
          />
        ))}
      </div>
    </div>
  );
};

export default SavedJobs;
