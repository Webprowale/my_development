"use client";

import ActivityCard from "@/components/dashboard/activity/ActivityCard";
import PreferredAirlines from "@/components/dashboard/airlines/PreferredAirlines";
import DashboardOverview from "@/components/dashboard/dashboardOverview/DashboardOverview";
import TripCard from "@/components/dashboard/mytrips/TripCard";
import QuotationCard from "@/components/dashboard/quotation/QuotationCard";
import Reports from "@/components/dashboard/reports/Reports";
import TotalExpenses from "@/components/dashboard/total-expenses/TotalExpenses";
import TravelHistory from "@/components/dashboard/travelhistory/TravelHistory";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "@phosphor-icons/react";
import Link from "next/link";

const TripPlanner = () => {
  return (
    <>
      <div  className="py-[1rem] px-[0.563rem] md:py-[0] md:px-[0]">

      <header className="mb-8 w-full flex gap-[1rem] flex-col md:items-center justify-between md:flex-row">
        <div className="header-text">
          <h1 className="hidden font-semibold text-2xl mb-3 md:block">My Trip Planner</h1>
          <p className="text-[#647995]">
            Hi, Fuad here are the information about all your trip planner
          </p>
        </div>
        <div className="header-actions">
          <Link href={"#"}>
            <Button
              variant={"default"}
              className="bg-primary600 text-white flex items-center gap-2"
            >
              Plan a Trip{" "}
              <PlusCircle
                size={18}
                weight="fill"
              />
            </Button>
          </Link>
        </div>
      </header>

      {/* Make content */}
        <div className="overview-list grid grid-cols-2 md:grid-cols-4 gap-4">
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
        <div className="overview-list grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="w-full md:col-start-1 md:col-end-3 md:row-start-2 md:row-end-3 ">
              <TotalExpenses />
            </div>

            <div className="md:col-start-3 md:col-end-5 md:row-start-2 md:row-end-3 ">
              <TripCard />
            </div>

            <div className="w-full md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-4 ">
              <Reports />
            </div>

            <div className="w-full md:col-start-3 md:col-end-5 md:row-start-3 md:row-end-4 ">
              <PreferredAirlines />
            </div>

            <div className="w-full md:col-start-1 md:col-end-5">
              <TravelHistory headerTitle="Travel History" />
            </div>
        </div>
      </div>

    </>
  );
};

const data = [
  {
    title: "Total Trips Planned",
    number: 56,
    mark: "quotes sent increased by 10.20",
    percent: "+1.01%",
  },
  {
    title: "Amount Spent",
    number: 234000,
    mark: "markups made increased by 3.10 ",
    percent: "+0.49%",
  },
  {
    title: "Approved Request",
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

export default TripPlanner;
