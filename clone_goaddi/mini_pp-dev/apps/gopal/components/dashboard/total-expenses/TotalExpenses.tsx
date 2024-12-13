"use client";
import { CaretDown } from "@phosphor-icons/react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import sourceData from "./sourceData.json";

const TotalExpenses = () => {
  return (
    <div className="bg-white p-6 rounded h-full">
      <header className="flex items-center justify-between mb-9">
        <h2 className="font-medium">Total Expenses</h2>

        <div className="custom-dropdown relative">
          <select
            id="time"
            className="bg-[#F0F2F5] text-[14px] py-2 px-4 pr-8 appearance-none rounded"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <CaretDown
            size={20}
            className="absolute top-[50%] translate-y-[-50%] right-2"
          />
        </div>
      </header>

      <div className="chart-container">
        <Line
          width={"100%"}
          height={"300px"}
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: `Vacation Packages`,
                data: sourceData.map((data) => data.vac),
                backgroundColor: "#1671D9",
                borderColor: "#1671D9",
                pointBackgroundColor: "transparent",
                pointBorderColor: "transparent",
              },
              {
                label: `Flight`,
                data: sourceData.map((data) => data.flight),
                backgroundColor: "#F3A218",
                borderColor: "#F3A218",
                pointBackgroundColor: "transparent",
                pointBorderColor: "transparent",
              },
              {
                label: `Hotel`,
                data: sourceData.map((data) => data.hotels),
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
                display: true,
                labels: {
                  boxHeight: 10,
                  boxWidth: 10,
                },
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
    </div>
  );
};

export default TotalExpenses;
