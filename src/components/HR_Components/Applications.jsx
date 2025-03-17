import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { exportToExcel } from "./DownloadExcel";
import ViewDetail from "./ViewDetail";

const Applications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/hr/applications/${jobId}`);
        setApplications(response.data.applications);
        setJobTitle(response.data.jobTitle);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Failed to load applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  if (loading) return <p className="text-gray-500">Loading applications...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 w-full flex flex-col min-h-screen">
      {selectedApplication ? (
        <ViewDetail application={selectedApplication} onBack={() => setSelectedApplication(null)} />
      ) : (
        <div className="relative w-full">
        <div className="flex justify-between items-center w-full py-4 px-4 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold">
            Application Title:{" "}
            <span className="text-blue-600">{jobTitle}</span>
          </h1>
          <button
            onClick={() => exportToExcel(applications, jobId)}
            className="px-4 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-500"
          >
            Download in Excel
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-6">
          {applications.map((application) => (
            <div
              key={application._id}
              className="rounded-2xl shadow-lg p-4 bg-white w-full md:w-auto"
            >
              <h2 className="text-xl font-semibold">
                <strong>
                  {application.user?.name || "No Name Available"}
                </strong>
              </h2>
              <p className="text-gray-600">
                Experience: {application.experience || "0" } years
              </p>
              <p className="text-gray-600">
                Skills: {application.skills?.join(", ") || "N/A"}
              </p>
              <p className="text-gray-600">
                Email: {application.user?.email || "N/A"}</p>
              <p className="text-gray-600">
                Location: {application.location?.join(" / ") || "N/A"}
              </p>
              <button
                onClick={() => setSelectedApplication(application)}
                className="mt-4 px-4 py-2 border rounded-lg text-blue-600 hover:bg-blue-100"
              >
                View More Detail
              </button>
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
};

export default Applications;