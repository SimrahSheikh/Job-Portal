import * as XLSX from "xlsx";

const DownloadExcel = ({ applications, jobTitle }) => {
  const downloadExcel = () => {
    if (applications.length === 0) {
      alert("No applications available to download.");
      return;
    }

    const data = applications.map((app) => ({
      Name: app.user?.name || "N/A",
      Email: app.user?.email || "N/A",
      Phone: app.user?.phoneNumber || "N/A",
      Education: app.user?.education || "N/A",
      Experience: app.experience ? `${app.experience} years` : "N/A",
      Location: Array.isArray(app.location) ? app.location.join(", ") : "N/A",
      Applied_At: app.appliedAt
        ? new Date(app.appliedAt).toLocaleDateString()
        : "N/A",
      Status: app.status || "N/A",
      Resume: app.resume || "Not Uploaded",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

    XLSX.writeFile(workbook, `Applicants_List_${jobTitle}.xlsx`);
  };

  return (
    <button
      onClick={downloadExcel}
      className="mt-4 px-3 py-1 ml-auto bg-blue-200 border rounded-lg hover:bg-blue-400"
    >
      Download Excel
    </button>
  );
};

export default DownloadExcel;
