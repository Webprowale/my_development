import DashboardOverview from "@/components/dashboard/dashboardOverview/DashboardOverview";
import TripCard from "@/components/dashboard/mytrips/TripCard";
import QuotationCard from "@/components/dashboard/quotation/QuotationCard";
import TravelHistory from "@/components/dashboard/travelhistory/TravelHistory";
import { IDashOverview } from "@/interfaces";

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

export default function Dashboard() {
  return (
    <main className="dashboard-page py-[1rem] px-[0.563rem] md:py-[0] md:px-[0]">
      <header className="mb-8 ">
        <h1 className="hidden font-semibold text-2xl mb-3 md:block">Dashboard</h1>
        <p className="text-[#647995]">
          Hi, Fuad here are the information about all your quotations
        </p>
      </header>

      <div  className="" > 
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

        <div 
        className="overview-list grid grid-cols-1 py-4 md:grid-cols-4 gap-4"
        >
        <div className="md:col-start-1 md:col-end-3 md:row-start-2 md:row-end-3 ">
            <QuotationCard title="Quotation Analytics" />
          </div>
          <div className="md:col-start-3 md:col-end-5 md:row-start-2 md:row-end-3 ">
            <TripCard />
          </div>
          <div className="md:col-start-1 md:col-end-5 ">
            <TravelHistory headerTitle="Travel History" />
          </div>
        </div>
      </div>

    </main>
  );
}
