import { useState } from "react";

const ViewDetail = ({ application, onBack }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(application.user?.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="relative flex-grow mt-0 flex justify-center items-center w-full">
      <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4">
        <div className="bg-white overflow-hidden shadow rounded-lg border w-full max-w-2xl">
          <div className="px-4 py-5 sm:px-6 flex justify-center items-center">
            <h3 className="text-xl leading-6 font-extrabold text-gray-900 text-center">
              {application.user?.name}
            </h3>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              {[
                {
                  label: "Email",
                  value: (
                    <div className="flex items-center gap-2">
                      <span>{application.user?.email}</span>
                      <button
                        onClick={handleCopy}
                        className="text-blue-500 hover:underline"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  ),
                },
                { label: "Phone", value: application.user?.phoneNumber },
                { label: "Education", value: application.user?.education },
                { label: "Skills", value: application.skills?.join(", ") || "N/A" },
                { label: "Experience", value: `${application.experience} years` },
                { label: "Location", value: application.location?.join(" / ") || "N/A" },
                {
                  label: "Applied At",
                  value: application.appliedAt
                    ? new Date(application.appliedAt).toLocaleDateString()
                    : "N/A",
                },
                { label: "Status", value: application.status },
              ].map((item, index) => (
                <div
                  key={index}
                  className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt className="text-sm font-medium text-gray-500">{item.label}</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {item.value}
                  </dd>
                </div>
              ))}

              {/* Resume Section */}
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Resume</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {application.resume ? (
                    <div className="flex gap-x-4">
                      <a
                        href={application.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </a>
                      <a href={application.resume} download className="text-blue-500 hover:underline">
                        Download
                      </a>
                    </div>
                  ) : (
                    "Not Uploaded"
                  )}
                </dd>
              </div>

              {/* Cover Letter Section */}
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Cover Letter</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {application.coverLetter}
                </dd>
              </div>
            </dl>
          </div>

          {/* Back Button */}
          <div className="px-4 py-4 flex justify-center">
            <button
              onClick={onBack}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;
