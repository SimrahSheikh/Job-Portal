import React, { useEffect, useState } from 'react';
import StatusCard from '../../assets/statusCard.jsx';

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
             
        //write your API call here
        // const response = await fetch('http://localhost:5173/applied-jobs/jobs'); // Replace with your API endpoint
        // if (!response.ok) {
        //   throw new Error('Failed to fetch applied jobs');
        // }
        // const data = await response.json();
        // setAppliedJobs(data);
        //dummy data.

        const demoData = [
          {
            "id": 1,
            "title": "Frontend Developer",
            "company": "Tech Solutions Inc.",
            "appliedDate": "2023-09-15T10:00:00Z",
            "status": "Applied"
          },
          {
            "id": 2,
            "title": "Backend Developer",
            "company": "Innovatech",
            "appliedDate": "2023-09-20T14:30:00Z",
            "status": "Interview"
          },
          {
            "id": 3,
            "title": "Full Stack Developer",
            "company": "WebCorp",
            "appliedDate": "2023-09-25T09:15:00Z",
            "status": "Rejected"
          },
          {
            "id": 4,
            "title": "Data Scientist",
            "company": "Data Insights",
            "appliedDate": "2023-09-30T11:45:00Z",
            "status": "Accepted",
            "logo": "https://images.unsplash.com/photo-1553835973-dec43bfddbeb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            "id": 5,
            "title": "UI/UX Designer",
            "company": "Creative Minds",
            "appliedDate": "2023-10-01T08:00:00Z",
            "status": "Applied",
            "logo": "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }
        ]
        setAppliedJobs(demoData)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
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
