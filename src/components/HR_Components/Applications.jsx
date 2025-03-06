import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Applications = () => {
  const { jobId } = useParams(); // Get jobId from route
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(); // Track selected application
  const [jobTitle, setJobTitle] = useState(""); // Track job title

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/hr/applications/${jobId}`
        );
        setApplications(response.data.applications);
        setJobTitle(response.data.jobTitle); // Set job title
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Application Title: {jobTitle}</h1>
      {selectedApplication ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white overflow-hidden shadow rounded-lg border w-full max-w-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-center">
              <h3 className="text-lg font-bold text-gray-900 text-center">
                {selectedApplication.userId?.name}
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between">
                    {selectedApplication.userId?.email}
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(
                          selectedApplication.userId?.email
                        )
                      }
                      className="text-blue-500 hover:underline"
                    >
                      Copy
                    </button>
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {selectedApplication.userId?.phoneNumber}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Education
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {selectedApplication.userId?.education}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Experience
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {selectedApplication.experience} years
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Location
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {selectedApplication.location?.join(" / ")}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Applied At
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(
                      selectedApplication.appliedAt
                    ).toLocaleDateString()}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {selectedApplication.status}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="px-4 py-4 flex justify-center">
              <button
                onClick={() => setSelectedApplication(null)}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((application) => (
            <div
              key={application._id}
              className="rounded-2xl shadow-lg p-4 bg-white"
            >
              <h2 className="text-xl font-semibold">
                <strong>{application.userId?.name}</strong>
              </h2>
              <p className="text-gray-600">
                Experience: {application.experience} years
              </p>
              <p className="text-gray-600">
                Education: {application.userId?.education}
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
      )}
    </div>
  );
};

export default Applications;
