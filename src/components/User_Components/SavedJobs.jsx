import { savedData } from "../../../data/savedData";
import JobCards from "./JobCards";

const SavedJobs = () => {
    return (
      <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Available Jobs</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedData.map((job) => (
          <JobCards
            key={job.id}
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
    </div>
    );
  };
  
  export default SavedJobs;
  