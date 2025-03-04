import React, { useEffect, useState } from 'react';
import StatusCard from '../../assets/statusCard.jsx';
import { appliedData } from '../../../data/appliedData.js';

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data
    try {
      setAppliedJobs(appliedData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
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
