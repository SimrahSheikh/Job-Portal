// import { useState, useEffect } from 'react';

// const PostedJobs = () => {
//   const [jobs, setJobs] = useState([]);
//     // setJobs([{
//     //     title: "Web Dev",
//     //     description: "This is a job description",
//     //     salary:"30000",
//     //     location: "New York",
        
//     // }])
// //   const fetchJobs = async () => {
// //     try {
// //       const response = await fetch('/api/hr/jobs');
// //       const data = await response.json();
// //       setJobs(data);
// //     } catch (error) {
// //       console.error('Error fetching jobs:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchJobs();
// //   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Posted Jobs</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {jobs.map((job) => (
//           <div key={job.id} className="rounded-2xl shadow-lg p-4 bg-white">
//             <h2 className="text-xl font-semibold">{job.title}</h2>
//             <p className="text-gray-600">{job.description}</p>
//             <p className="mt-2 text-sm">Location: {job.location}</p>
//             <p className="text-sm">Salary: {job.salary}</p>
//             <button className="mt-4 px-4 py-2 border rounded-lg text-blue-600 hover:bg-blue-100">
//               View Applicants
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PostedJobs;

import { useState, useEffect } from 'react';

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);

  // Dummy job data for testing
  useEffect(() => {
    setJobs([
      {
        id: 1,
        title: "Frontend Developer",
        description: "Develop and maintain UI components using React.",
        salary: "₹50,000/month",
        location: "Bangalore",
      },
      {
        id: 2,
        title: "Backend Developer",
        description: "Work with Node.js and databases to build APIs.",
        salary: "₹60,000/month",
        location: "Mumbai",
      },
      {
        id: 3,
        title: "UI/UX Designer",
        description: "Create engaging user experiences and design layouts.",
        salary: "₹45,000/month",
        location: "Remote",
      },
    ]);
  }, []);

  // Uncomment this part when connecting to backend
  /*
  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/hr/jobs'); // Replace with actual API endpoint
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  */

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Posted Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="rounded-2xl shadow-lg p-4 bg-white">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.description}</p>
              <p className="mt-2 text-sm">Location: {job.location}</p>
              <p className="text-sm">Salary: {job.salary}</p>
              <button className="mt-4 px-4 py-2 border rounded-lg text-blue-600 hover:bg-blue-100">
                View Applicants
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostedJobs
