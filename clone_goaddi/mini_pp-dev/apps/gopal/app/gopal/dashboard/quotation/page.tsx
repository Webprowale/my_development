import ActivityCard from "@/components/dashboard/activity/ActivityCard";
import DashboardOverview from "@/components/dashboard/dashboardOverview/DashboardOverview";
import QuotationCard from "@/components/dashboard/quotation/QuotationCard";
import TravelHistory from "@/components/dashboard/travelhistory/TravelHistory";
import { Button } from "@/components/ui/button";
import BrandModal from "@/components/dashboard/modal/BrandModal";
import Link from "next/link";
import { PlusCircle } from "@phosphor-icons/react/dist/ssr";
import { Suspense } from "react";

const Quotation = () => {
  return (
    <div className="py-[1rem] px-[0.563rem]">
      <header className="mb-8 w-full flex flex-col gap-[1rem] md:flex-row md:items-center justify-between">
        <div className="header-text">
          <h1 className="font-semibold text-2xl mb-3 n hidden md:block ">Quotation</h1>
          <p className="text-[#647995]">
            Hi, Fuad here are the information about all your quotations
          </p>
        </div>
        <div className="header-actions">
          <Link href={`/dashboard/quotation?brandModal=open`}>
            <Button className="bg-primary600 text-white flex items-center gap-2">
              Add brand name & logo{" "}
              <PlusCircle
                size={18}
                weight="fill"
              />
            </Button>
          </Link>
        </div>
      </header>
      <div  className=" md:py-[0] md:px-[0]" > 
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
        <div className="py-4 overview-list grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-start-1 md:col-end-3 md:row-start-2 md:row-end-3 ">
            <QuotationCard title="Quotation Analytics" />
          </div>

          <div className="md:col-start-3 md:col-end-5 md:row-start-2 md:row-end-3 ">
            <ActivityCard />
          </div>

          <div className="md:col-start-1 md:col-end-5">
            <TravelHistory headerTitle="Travel History" />
          </div>
        </div>
        <Suspense>
          <BrandModal
            title="Add brand name and logo"
            paragraph="Incorporate your designated brand name and logo into your quotation to reinforce brand identity and enhance recognition."
          />
        </Suspense>
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

export default Quotation;
