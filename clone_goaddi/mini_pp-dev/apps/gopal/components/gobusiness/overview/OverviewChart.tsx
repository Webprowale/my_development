"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { allChartData, productChartData } from "./sourceData";
import { CalendarBlank, CaretDown } from "@phosphor-icons/react";
import { CustomDateModal } from "./CustomDataModal";

const OverviewChart = () => {
  const [currentChart, setCurrentChart] = useState("all");
  const [openCustomDataModal, setOpenCustomDateModal] =
    useState<boolean>(false);

  return (
    <>
      <section className="w-full h-full p-4 md:p-4 flex flex-col min-h-[50vh] md:min-h-[auto]">
        <header className="flex items-start md:items-center flex-col md:flex-row gap-[18px] mb-6">
          {/* <div className="flex w-full md:items-center flex-col md:flex-row gap-[18px]"> */}
          <h2 className="font-bold text-xl">Amount Spent Overtime</h2>
          <ChartToggle chooseValue={setCurrentChart} />
          {/* </div> */}

          <div className="w-[45%] md:w-[15%] ml-auto">
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Year to Date" />
              </SelectTrigger>
              <SelectContent align="end">
                {/* <SelectLabel>Filter</SelectLabel> */}
                <SelectItem value="apple">Year to Date</SelectItem>
                <SelectItem
                  value="banana"
                  className="text-left"
                >
                  Quarter to Date
                </SelectItem>
                <SelectItem value="blueberry">Month to Date</SelectItem>
                <SelectItem value="grapes">Previous Year</SelectItem>
                <SelectItem value="pineapple">Previous Quarter</SelectItem>
                <SelectItem value="pinea">Previous Month</SelectItem>
                {/* <SelectItem value="pine">
              </SelectItem> */}
                <button
                  className="text-xs text-primary600 p-2 rounded hover:bg-primary600 hover:text-white flex items-center gap-2"
                  onClick={() => {
                    setOpenCustomDateModal(true);
                  }}
                >
                  <CalendarBlank size={16} />
                  <span className="">Select Custom Dates </span>
                  <CaretDown size={16} />
                </button>
              </SelectContent>
            </Select>
          </div>
        </header>

        <div className="w-full mt-auto min-h-[300px]">
          {currentChart === "all" && <AllChart />}
          {currentChart === "product" && <ProductChart />}
        </div>
      </section>

      {openCustomDataModal && (
        <CustomDateModal closeDateModal={setOpenCustomDateModal} />
      )}
    </>
  );
};

const ChartToggle = ({
  chooseValue,
}: {
  chooseValue?: (data: string) => void;
}) => {
  const toggleList = [
    {
      id: 0,
      name: "All Requests",
      value: "all",
      isActive: true,
    },
    {
      id: 1,
      name: "Product Requests",
      value: "product",
      isActive: false,
    },
  ];

  const [currentTab, selectCurrentTab] = useState(0);

  return (
    <div className="bg-[#F0F2F5] rounded p-2 w-full md:w-max flex items-center">
      {toggleList.map((data: any, index: number) => (
        <div
          className={`capitalize bg-transparent rounded w-full md:w-max text-center text-xs px-3 cursor-pointer py-2 ${currentTab == data?.id ? "bg-white font-semibold" : "bg-transparent text-[#647995]"}`}
          onClick={() => {
            selectCurrentTab(data.id);
            chooseValue(data?.value);
          }}
        >
          {data.name}
        </div>
      ))}
    </div>
  );
};

// All chart component
const AllChart = () => {
  return (
    <div className="chart-container">
      <Line
        width={"100%"}
        height={"300px"}
        data={{
          labels: allChartData.map((data) => data.label),
          datasets: [
            {
              label: `Expenses`,
              data: allChartData.map((data) => data.expense),
              backgroundColor: "#1671D9",
              borderColor: "#1671D9",
              pointBackgroundColor: "transparent",
              pointBorderColor: "transparent",
            },
            {
              label: `Products`,
              data: allChartData.map((data) => data.products),
              backgroundColor: "#F3A218",
              borderColor: "#F3A218",
              pointBackgroundColor: "transparent",
              pointBorderColor: "transparent",
            },
            {
              label: `Funds`,
              data: allChartData.map((data) => data.funds),
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
              position: "bottom",
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
  );
};

const ProductChart = () => {
  return (
    <div className="chart-container">
      <Line
        width={"100%"}
        height={"300px"}
        data={{
          labels: productChartData.map((data) => data.label),
          datasets: [
            {
              label: `Expenses`,
              data: productChartData.map((data) => data.expense),
              backgroundColor: "#1671D9",
              borderColor: "#1671D9",
              pointBackgroundColor: "transparent",
              pointBorderColor: "transparent",
            },
            {
              label: `Products`,
              data: productChartData.map((data) => data.products),
              backgroundColor: "#F3A218",
              borderColor: "#F3A218",
              pointBackgroundColor: "transparent",
              pointBorderColor: "transparent",
            },
            {
              label: `Funds`,
              data: productChartData.map((data) => data.funds),
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
              position: "bottom",
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
  );
};

export default OverviewChart;
