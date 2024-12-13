import Link from "next/link";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import chartData from "./data.json";

const Reports = () => {
  return (
    <div className="reports bg-white p-6 h-full rounded">
      <header className="flex items-center justify-between mb-6">
        <h2 className="font-medium">Reports</h2>
        <Link
          href={"/dashboard/trip-planner"}
          className="inline-block text-[14px] rounded py-3 px-4 bg-primary600 hover:bg-primary700 ease duration-150 text-white font-medium"
        >
          Read Report
        </Link>
      </header>

      <div className="chart-container w-full h-[300px]">
        <Bar
          width={"100%"}
          height={"200px"}
          data={{
            labels: chartData.map((data) => data?.label),
            datasets: [
              {
                label: "Trips",
                data: chartData.map((data) => data?.amount),
                backgroundColor: ["#FFBD00", "#0D6EFD"],
                barThickness: 48,
                borderRadius: 4,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                border: {
                  display: false,
                },
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: true,
                  drawTicks: false,
                },
                border: {
                  display: false,
                  dash: [10, 6],
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Reports;
