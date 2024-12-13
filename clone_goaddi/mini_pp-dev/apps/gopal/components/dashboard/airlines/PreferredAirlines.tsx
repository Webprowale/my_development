import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "@phosphor-icons/react";
import { Bar } from "react-chartjs-2";
import chartData from "./data.json";

const PreferredAirlines = () => {
  return (
    <div className="airlines p-6 rounded h-full bg-white">
      <header className="flex items-center justify-between mb-6">
        <div className="left-header">
          <h2 className="font-medium">Preffered Airlines</h2>
        </div>
        {/*  */}
        <div className="right-header">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 py-2 px-4 border rounded hover:bg-gray-100">
              <SlidersHorizontal size={15} />
              Filter
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Class</DropdownMenuItem>
              <DropdownMenuItem>Type</DropdownMenuItem>
              <DropdownMenuItem>Amount</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* chart container */}
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
                backgroundColor: ["#0D6EFD"],
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

export default PreferredAirlines;
