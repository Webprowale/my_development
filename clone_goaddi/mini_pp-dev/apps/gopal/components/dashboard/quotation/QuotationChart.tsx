"use client";

import "chart.js/auto";
import { Line } from "react-chartjs-2";
import sourceData from "./sourceData.json";

const QuotationChart = () => {
  return (
    <div className="chart-container">
      <Line
        width={"100%"}
        height={"300px"}
        data={{
          labels: sourceData.map((data) => data.label),
          datasets: [
            {
              label: `${new Date().toLocaleDateString()}`,
              data: sourceData.map((data) => data.amount),
              backgroundColor: "#F56630",
              borderColor: "#F56630",
              pointBackgroundColor: "transparent",
              pointBorderColor: "transparent",
            },
          ],
        }}
        options={{
          elements: {
            line: {
              tension: 0.5,
            },
          },
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: true,
              },
              border: {
                dash: [10, 6],
              },
            },
          },
        }}
      />
    </div>
  );
};

export default QuotationChart;
