import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Briefcase, Users, ClipboardList } from "lucide-react";
import axios from "axios";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export const HrHome = () => {
  const [monthsApplications, setMonthsApplications] = React.useState([]);
  const [monthsHireStatus, setMonthsHireStatus] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/hr/hr-dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        const data = response.data;

        // Log the response data to see the structure
        console.log("Response data:", data);

        if (data && data.monthsApplications && data.monthsHireStatus) {
          setLoading(false);
          setMonthsApplications(data.monthsApplications);
          setMonthsHireStatus(data.monthsHireStatus);
        } else {
          throw new Error("The data structure is not as expected");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Prepare data for the chart
  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ], // All months dynamically shown
    datasets: [
      {
        label: "MONTHLY APPLICATIONS",
        data: monthsApplications,  // From the backend response
        backgroundColor: ["#3399FF", "#FF3399", "#009946", "#00CCFF", "#FF6600", "#FF0000", "#66FF00", "#0066FF", "#FF0066", "#33FF66", "#6600FF", "#FF33FF"],
        borderWidth: 1,
      },
      {
        label: "MONTHLY HIRING",
        data: monthsHireStatus,  // From the backend response
        backgroundColor: ["#33CCFF", "#FF99CC", "#00CC66", "#FFCC33", "#00FFCC", "#FF6666", "#66CCFF", "#FF66CC", "#33FF99", "#CCFF33", "#FF33CC", "#99CCFF"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Hiring Data",
        color: "black",
      },
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome Home !!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full max-w-6xl">
        <div className="bg-blue-500 p-6 rounded-2xl shadow-lg flex items-center justify-between text-white">
          <div>
            <h2 className="text-xl font-semibold">Total Applications</h2>
            <p className="text-3xl mt-2">{monthsApplications.reduce((a, b) => a + b, 0)}</p> {/* Sum of all applications */}
          </div>
          <ClipboardList size={48} />
        </div>

        <div className="bg-green-500 p-6 rounded-2xl shadow-lg flex items-center justify-between text-white">
          <div>
            <h2 className="text-xl font-semibold">Total Hires</h2>
            <p className="text-3xl mt-2">{monthsHireStatus.reduce((a, b) => a + b, 0)}</p> {/* Sum of all hires */}
          </div>
          <Users size={48} />
        </div>

        <div className="bg-yellow-500 p-6 rounded-2xl shadow-lg flex items-center justify-between text-white">
          <div>
            <h2 className="text-xl font-semibold">Open Positions</h2>
            <p className="text-3xl mt-2">8</p> {/* Static for now */}
          </div>
          <Briefcase size={48} />
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg">
        {loading ? (
          <p>Loading data...</p>
        ) : (monthsApplications.length > 0 && monthsHireStatus.length > 0) ? (
          <Bar data={data} options={options} />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};