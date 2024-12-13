import { X } from "@phosphor-icons/react";
import Image from "next/image";
import { ReportList } from "./data";
import { ReportType } from "@/interfaces";
import ReportItem from "./ReportItem";

// This is the first modal that shows when the modal is active on the page
const ParentgroupsContainer = ({
  setSelectedOption,
  close,
}: {
  setSelectedOption: any;
  close: () => void;
}) => {
  return (
    <div className="bg-white w-full md:w-[50%] h-[70vh] md:h-auto md:max-h-[95vh] p-6 rounded overflow-auto scrollbar-thin">
      <header className="relative z-10 mb-8">
        <Image
          src={`/assets/modal-report.svg`}
          width={70}
          height={70}
          className="mb-4"
          alt=""
        />

        <h2 className="font-semibold text-xl mb-2">Report Post</h2>
        <p className="text-sm text-[#647995] w-full md:w-[68%]">
          Help us keep our community safe and respectful
        </p>

        <X
          size={24}
          weight="bold"
          className="absolute right-0 top-[10px] cursor-pointer"
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
      <section className="flex flex-col gap-4">
        {ReportList.map((report: ReportType, index: number) => (
          <ReportItem
            key={index}
            id={report.id}
            title={report.title}
            subtitle={report.subtitle}
            setValue={setSelectedOption}
          />
        ))}
      </section>
    </div>
  );
};

export default ParentgroupsContainer;
