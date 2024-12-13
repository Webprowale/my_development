"use client";
import { IQuotationType } from "@/interfaces";
import QuotationChart from "./QuotationChart";
import { CaretDown } from "@phosphor-icons/react";

const QuotationCard = ({ title }: IQuotationType) => {
  return (
    <div className="bg-white p-6 rounded h-full">
      <header className="flex items-center justify-between mb-9">
        <h2 className="font-medium">{title}</h2>

        <div className="custom-dropdown relative">
          <select
            id="time"
            className="bg-[#F0F2F5] text-[14px] py-2 px-4 pr-8 appearance-none rounded"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <CaretDown
            size={20}
            className="absolute top-[50%] translate-y-[-50%] right-2"
          />
        </div>
      </header>

      <div className="quotation-chart w-full h-[100%]">
        <QuotationChart />
      </div>
    </div>
  );
};

export default QuotationCard;
