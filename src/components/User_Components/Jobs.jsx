import { useEffect, useState, useRef, useCallback } from "react";
import JobCards from "./JobCards";
import axios from "axios";
import JobPageLoading from "../Loading/JobPageLoading";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastJobElementRef = useCallback(node => {
    // console.log("Last Job Element Ref");
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        // console.log("Visible");
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/hr/getjobs?page=${page}&limit=6`);
        setJobs(prevJobs => {
          const newJobs = response.data.filter(job => !prevJobs.some(prevJob => prevJob._id === job._id));
          return [...prevJobs, ...newJobs];
        });
        setHasMore(response.data.length > 0);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (loading && page === 1) {
    return <JobPageLoading />;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Available Jobs</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => {
          if (jobs.length === index + 1) {
            return (<>
              <div ref={lastJobElementRef}>
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
                /></div></>
            );
          } else {
            return (<>
              {/* <div>{index+2}</div > */}
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
              /></>
            );
          }
        })}
      </div>
      {loading && <JobPageLoading />}
    </div >
  );
}