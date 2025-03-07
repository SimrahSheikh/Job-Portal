import React, { useEffect, useState } from 'react';
import StatusCard from '../../assets/statusCard.jsx';
import axios from 'axios';
import Cookies from 'universal-cookie';

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cookies = new Cookies();
  const token = cookies.get("user-token") || localStorage.getItem("auth-token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/profile/appliedjobs/myjob', {
          headers: {
            "authorization-user": 'Bearer ' + token,
          },
        });
        setAppliedJobs(response.data);
        // console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Applied Jobs</h2>
      {appliedJobs.length === 0 ? (
        <p className="text-center">No applied jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appliedJobs.map((job) => (
            <StatusCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
