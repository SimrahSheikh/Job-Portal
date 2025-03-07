import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Briefcase, Users, ClipboardList } from "lucide-react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export const HrHome = () => {
  const data = {
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "MONTHLY APPLICATIONS",
        data: [32, 34, 30],
        backgroundColor: ["#3399FF", "#FF3399", "#009946"],
        borderWidth: 1,
      },
      {
        label: "MONTHLY HIRING",
        data: [12, 27, 3],
        backgroundColor: ["#33CCFF", "#FF99CC", "#00CC66"],
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
            <p className="text-3xl mt-2">96</p>
          </div>
          <ClipboardList size={48} />
        </div>

        <div className="bg-green-500 p-6 rounded-2xl shadow-lg flex items-center justify-between text-white">
          <div>
            <h2 className="text-xl font-semibold">Total Hires</h2>
            <p className="text-3xl mt-2">42</p>
          </div>
          <Users size={48} />
        </div>

        <div className="bg-yellow-500 p-6 rounded-2xl shadow-lg flex items-center justify-between text-white">
          <div>
            <h2 className="text-xl font-semibold">Open Positions</h2>
            <p className="text-3xl mt-2">8</p>
          </div>
          <Briefcase size={48} />
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};