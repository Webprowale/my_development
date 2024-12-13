"use client";

import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import doughData from "./dough.json";

const ActivityDonut = () => {
  return (
    <div className="w-full h-full">
      <Doughnut
        data={{
          labels: doughData.map((data) => data.label),
          datasets: [
            {
              label: "Value",
              data: doughData.map((data) => data.value),
              backgroundColor: ["#40B869", "#F7D394", "#E26E6A"],
              //@ts-ignore
              cutout: "80%",
              circumference: 180,
              rotation: 270,
            },
          ],
        }}
        options={{
          aspectRatio: 2,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: {
                boxHeight: 10,
                boxWidth: 10,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ActivityDonut;
