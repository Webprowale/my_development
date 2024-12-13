import React from "react";
import TravelHistory from "./table/TravelHistory";
import DashboardOverview from "@/components/dashboard/dashboardOverview/DashboardOverview";

const TravelHistoryPage = () => {
  return (
    <div
    className="py-[1rem] px-[0.563rem] md:py-[0] md:px-[0]"
    >
      <header className="mb-8 w-full flex items-center justify-between flex-shrink-0">
        <div className="header-text">
          <h1 className="hidden font-semibold text-2xl mb-3 md:block">My Travel History</h1>
          <p className="text-[#647995]">
            Hi, Fuad here are the information about all your travel history
          </p>
        </div>
        <div className="header-actions"></div>
      </header>

      {/* The table for travel history */}
      <div className="overview-list grid w-full grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
        {data?.map((overview: any, index: number) => (
          <DashboardOverview
            key={index}
            title={overview.title}
            value={overview.number}
            mark={overview.mark}
            percent={overview.percent}
          />
        ))}


      </div>
      <div  className="overview-list grid w-full grid-cols-1 md:grid-cols-4 gap-4 flex-shrink-0">
      <div className="w-full md:col-start-1 md:col-end-5 flex-shrink-0">
          <TravelHistory headerTitle="Travel History" />
        </div>
      </div>
    </div>
  );
};

const data = [
  {
    title: "Total quotation sent",
    number: 56,
    mark: "quotes sent increased by 10.20",
    percent: "+1.01%",
  },
  {
    title: "Total Markups Made",
    number: 234000,
    mark: "markups made increased by 3.10 ",
    percent: "+0.49%",
  },
  {
    title: "Accepted Requests",
    number: 20,
    mark: "accepted requests increased by 2.56",
    percent: "-0.91%",
  },
  {
    title: "Denied Requests",
    number: 2,
    mark: "denied requests increased by 7.20",
    percent: "+1.51%",
  },
];

export default TravelHistoryPage;
