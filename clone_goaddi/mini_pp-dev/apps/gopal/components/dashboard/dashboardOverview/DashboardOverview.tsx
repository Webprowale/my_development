import React from "react";
import { IDashOverview } from "@/interfaces";
import { addCommasToNumber } from "@/utils";
import { CurrencyNgn } from "@phosphor-icons/react";
import { Switch } from "@/components/switch";

const DashboardOverview = ({ title, value, mark, percent }: IDashOverview) => {
  return (
    <div className="overview min-h-[250px] flex flex-col justify-between relative p-4 bg-white overflow-hidden">
      <h3 className="font-medium text-[15px]">{title}</h3>
      <h3 className="font-medium text-2xl mt-auto flex items-center gap-1">
        {value}
      </h3>
      <div className="overview-data gap-[0.5rem]  flex flex-row flex-wrap items-center justify-between text-[#647995] text-[12px] mt-2">
        <p 
        className="md:w-[50%]"
        >{mark}</p>
        <span className="percent bg-[#E7F6EC] text-[#036B26] rounded p-1 font-semibold text-[11px]">
          {percent}
        </span>
      </div>
      {/* <img
        src="/assets/dashboard-card.svg"
        alt="beehive image"
        className="absolute top-3 right-2"
      /> */}
             <div 
        className="absolute top-3 right-2"

       >
       <Switch />
       </div>
    </div>
  );
};

export default DashboardOverview;
