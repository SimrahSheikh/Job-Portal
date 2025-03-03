import { jobListings } from "../../../data/demoData";
import JobCards from "./JobCards";

export default function JobList() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
      {jobListings.map((job) => (
        <JobCards 
          id={job.id} 
          logo={job.logo} 
          company={job.company} 
          timePosted={job.timePosted} 
          title={job.title} 
          type={job.type} 
          level={job.level} 
          salary={job.salary} 
          location={job.location} 
        />
      ))}
    </div>
  );
}
