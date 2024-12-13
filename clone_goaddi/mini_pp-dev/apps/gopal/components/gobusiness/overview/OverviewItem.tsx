"use client";

import { CaretRight, Receipt } from "@phosphor-icons/react";
import Image from "next/image";

type Props = {
  title: string;
  value: number;
  icon: string;
  breakdown: any;
};
const OverviewItem = ({ title, value, icon, breakdown }: Props) => {
  return (
    <div className="p-4 bg-white rounded">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-bold text-[#676E7E]">{title}</h3>
          <p className="text-[2.5rem] text-black font-bold">{value}</p>
        </div>
        <Image
          src={icon}
          width={64}
          height={64}
          alt=""
        />
      </div>
      <hr className="mb-3 mt-4" />

      {/* The breakdown */}
      <div className="breakdown flex flex-col gap-3">
        {breakdown?.map((data: any, index: number) => (
          <div
            className="flex items-center justify-between w-full text-[#676E7E]"
            key={index}
          >
            <div className="flex items-center gap-1">
              {data?.icon}
              <h4 className="text-sm">{data?.title}</h4>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <span className="font-bold text-[#676E7E]">{data?.value}</span>
              <CaretRight
                size={18}
                weight="light"
                className="text-[#676E7E]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewItem;
