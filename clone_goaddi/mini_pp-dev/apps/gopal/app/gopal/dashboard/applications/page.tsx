"use client";

import DashboardTabs from "@/components/dashboard/DashboardTabs";
import Flight from "./HotelsTab";
import HotelsTab from "./HotelsTab";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ActivityTab from "./ActivityTab";
import VisaTab from "./VisaTab";
import FlightTab from "./FlightsTab";
import VacationTab from "./VacationTab";
import StudyTab from "./StudyTab";
import ImmigrationTab from "./ImmigrationTab";
import MedicalTab from "./MedicalTab";
import { useMediaQuery } from "react-responsive";

const Page = () => {
  const mode = useSearchParams();
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  return (
    <>
      <main className="dashboard-page mb-10">
        
        {
          isDesktopOrLaptop?
          <header className="">
          <h1 className="font-semibold text-2xl mb-3">Dashboard</h1>
          <p className="text-[#647995]">
            Hi, Fuad here are the information about all your quotations
          </p>
        </header>:''
        }
        {/* Page tabs */}
        <div className="border-y-[#E4E7EC] border-y-[1px]  bg-white  my-[unset] md:bg-[unset] md:border-y-[0px] md:py-[0] md:my-8"
        
        >
          <DashboardTabs tabList={links} />
        </div>

        <Suspense>
          {mode.get("tab") === "flight" && <FlightTab />}
          {mode.get("tab") === "hotel" && <HotelsTab />}
          {mode.get("tab") === "study" && <StudyTab />}
          {mode.get("tab") === "immigration" && <ImmigrationTab />}
          {mode.get("tab") === "medical" && <MedicalTab />}
          {mode.get("tab") === "activity" && <ActivityTab />}
          {mode.get("tab") === "vacation" && <VacationTab />}
          {mode.get("tab") === "visa" && <VisaTab />}
        </Suspense>
      </main>
    </>
  );
};

const links = [
  {
    id: 1,
    name: "Flight Bookings",
    tabName: "flight",
    notification: 0,
  },
  {
    id: 2,
    name: "Hotel Bookings",
    tabName: "hotel",
    notification: 0,
  },
  {
    id: 3,
    name: "Activity Bookings",
    tabName: "activity",
    notification: 0,
  },
  {
    id: 4,
    name: "Vacation Bookings",
    tabName: "vacation",
    notification: 0,
  },
  {
    id: 5,
    name: "Study Bookings",
    tabName: "study",
    notification: 0,
  },
  {
    id: 6,
    name: "Visa Bookings",
    tabName: "visa",
    notification: 0,
  },
  {
    id: 7,
    name: "Immigration Bookings",
    tabName: "immigration",
    notification: 2,
  },
  {
    id: 8,
    name: "Medical Bookings",
    tabName: "medical",
    notification: 0,
  },
];

export default Page;
