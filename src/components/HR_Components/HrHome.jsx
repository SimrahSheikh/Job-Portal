import React from 'react'
import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export const HrHome = () => {
  
  const chartRef = useRef(null);

  const data = {
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "MONTHLY HIRING",
        data: [12, 27, 3],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", 
        color : "black"
      },
      title: {
        display: true,
        text: "Monthly Hiring Data",
        color : "black"
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex" >
      <NavBar />
      <div className="ml-64 flex-1 flex items-center justify-center bg-gray-100 min-h-screen">
        <h2 className="text-xl font-semibold mb-4"></h2>
        <div className="Bar Graph justify-centre">
          <Bar ref={chartRef} data={data} options={options} />
        
    </div>
    </div>
    </div>
  )
};
