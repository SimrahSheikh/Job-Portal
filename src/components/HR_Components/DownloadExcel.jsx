import * as XLSX from "xlsx";

const exportExcelFile = (data, fileName, sheetName) => {
  if (!data || data.length === 0) return;

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);
};

const exportToExcel = (applications, jobId) => {
  if (!applications || applications.length === 0) return;

  const data = applications.map((app) => ({
    Name: app.user?.name || "N/A",
    Email: app.user?.email || "N/A",
    Phone: app.user?.phoneNumber || "N/A",
    Education: app.user?.education || "N/A",
    Experience: app.experience ? `${app.experience} years` : "N/A",
    Location: Array.isArray(app.location) ? app.location.join(" / ") : "N/A",
    Skills: Array.isArray(app.skills) ? app.skills.join(", ") : "N/A",
    "Applied At": app.appliedAt
      ? new Date(app.appliedAt).toLocaleDateString()
      : "N/A",
    Status: app.status || "N/A",
    Resume: typeof app.resume === "string" ? app.resume : "Not Uploaded",
  }));

  exportExcelFile(data, `applications_${jobId}.xlsx`, "Applications");
};

export { exportExcelFile, exportToExcel };
