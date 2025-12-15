"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TaskStatus({ tasks }: { tasks: any[] }) {
  const completed = tasks.filter((t) => t.status === true).length;
  const pending = tasks.filter((t) => t.status === false).length;

  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ["#4ade80", "#f87171"], 
        borderColor: ["#22c55e", "#ef4444"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#d1d5db",
        },
      },
    },
  };

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
      <h3 className="text-xl font-semibold mb-4">Task Status</h3>

      <div className="w-64 mx-auto">
        <Doughnut data={data} options={options} />
      </div>

      <div className="flex justify-center gap-6 mt-4 text-gray-300 text-sm">
        <p>Completed: {completed}</p>
        <p>Pending: {pending}</p>
      </div>
    </div>
  );
}

