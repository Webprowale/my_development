"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ArrowLeft, X } from "@phosphor-icons/react";
import ReportItem from "./ReportItem";
import { ReportType } from "@/interfaces";

// This modal will show when a report group has been selected on the UI
const SubgroupContainer = ({
  subGroups,
  close,
}: {
  subGroups: any;
  close: () => void;
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const postId = params.get("reportpost");

  const goBack = () => {
    router.push(`/gopal?reportpost=${postId}`, { scroll: false });
  };

  return (
    <div className="bg-white w-full md:w-[50%] h-auto  max-h-[95vh] p-6 rounded overflow-auto scrollbar-thin">
      <header className="relative z-10 mb-5 flex items-center justify-between">
        <ArrowLeft
          size={28}
          weight="bold"
          className="cursor-pointer"
          onClick={() => goBack()}
        />
        <X
          size={28}
          weight="bold"
          className="cursor-pointer"
          onClick={() => {
            close();
          }}
        />
        <img
          src="/assets/modal-lines.svg"
          className="absolute left-0 right-0 top-0 w-full -z-[1]"
          alt=""
        />
      </header>
      {/* reasons list */}
      <div className="relative z-10 flex flex-col gap-1 mb-4">
        <h2 className="font-semibold text-xl mb-1">
          {subGroups?.title || "Hate Speech"}
        </h2>
        <p className="text-sm text-[#647995] w-full md:w-[68%]">
          {subGroups?.subtitle || "Something is here"}
        </p>
      </div>
      <section className="flex flex-col gap-4">
        {subGroups &&
          subGroups?.groups?.map((report: ReportType, index: number) => (
            <ReportItem
              key={index}
              id={report.id}
              title={report.title}
              subtitle={report.subtitle}
              report={true}
            />
          ))}
      </section>
    </div>
  );
};
export default SubgroupContainer;
