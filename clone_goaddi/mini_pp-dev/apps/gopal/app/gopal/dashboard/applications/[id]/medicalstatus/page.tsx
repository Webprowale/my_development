import KanbanCard from "@/components/kanban/KanbanCard";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <main className="mb-10">
      {/* breadcrumb */}
      <div className="text-sm flex items-center gap-2">
        <Link href={"/gopal/dashboard/applications"} className="text-[#98A2B3]">
          My applications
        </Link>
        <span>
          {" "}
          <CaretRight size={12} />{" "}
        </span>
        <Link href={"#"}>Status</Link>
      </div>
      {/* header */}
      <header className="my-5">
        <h1 className="font-semibold text-3xl mb-2">Status</h1>
        <p className="text-[#647995]">
          Hi, Fuad here are the information about all visa application status
        </p>
      </header>
      {/* status information */}
      <section className="bg-white p-6 rounded flex items-center gap-12">
        {statusData?.length > 0 &&
          statusData.map((data: StatusType, index: number) => (
            <div className="flex flex-col items-start gap-2" key={index}>
              <h2 className="text-[#676E7E] text-xs">{data.header}</h2>
              <p className="capitalize font-semibold">{data.subtitle}</p>
            </div>
          ))}
      </section>

      {/* Kanban Board */}
      <section className="grid grid-cols-5 gap-5 mt-5">
        {KanbanHeader.map((data: KanbanHeaderType, index: number) => (
          <div className="column" key={index}>
            <h3 className="flex items-center justify-center gap-2 bg-white p-2 font-semibold border border-[#E4E7EC]">
              <span>{data.name}</span>
              <span
                className={`${data.bckColor} text-white w-[20px] h-[20px] rounded-full flex items-center justify-center text-xs flex-shrink-0`}
              >
                {data.count}
              </span>
            </h3>

            {/* task list */}
            <div className="flex flex-col gap-4 mt-5">
              <KanbanCard color={data.color} />
              <KanbanCard color={data.color} />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

type StatusType = {
  header: string;
  subtitle: string;
};

type KanbanHeaderType = {
  name: string;
  count: number;
  color: string;
  bckColor: string;
};

const statusData: StatusType[] = [
  {
    header: "Date Submitted",
    subtitle: "2024-01-05",
  },
  {
    header: "Application ID",
    subtitle: "APP-12345",
  },
  {
    header: "Destination Country",
    subtitle: "Canada",
  },
  {
    header: "Medical Services",
    subtitle: "Trinity Western University",
  },
  {
    header: "Consultation Generated",
    subtitle: "System Generated",
  },
  {
    header: "Total Cost",
    subtitle: "₦ 50,000",
  },
];

const KanbanHeader: KanbanHeaderType[] = [
  {
    name: "To do",
    count: 10,
    color: "border-t-[#D42620]",
    bckColor: "bg-[#D42620]",
  },
  {
    name: "On going",
    count: 1,
    color: "border-t-[#0D6EFD]",
    bckColor: "bg-[#0D6EFD]",
  },
  {
    name: "In review",
    count: 1,
    color: "border-t-[#98A2B3]",
    bckColor: "bg-[#98A2B3]",
  },
  {
    name: "On hold",
    count: 1,
    color: "border-t-[#F3A218]",
    bckColor: "bg-[#F3A218]",
  },
  {
    name: "Done",
    count: 1,
    color: "border-t-[#0F973D]",
    bckColor: "bg-[#0F973D]",
  },
];

export default Page;
