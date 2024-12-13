"use client";

import {
  OverviewType,
  overviewData,
} from "@/app/gobusiness/dashboard/overview/data";
import OverviewItem from "./OverviewItem";
import Link from "next/link";
import Image from "next/image";

const OverviewGroup = () => {
  return (
    <section
      className="overview w-[95%] md:w-full grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto"
      id="overview"
    >
      {/* an overview item */}
      {overviewData.map((data: OverviewType, index: number) => (
        <OverviewItem
          title={data.title}
          icon={data.icon}
          value={data.value}
          breakdown={data.breakdown}
          key={index}
        />
      ))}
    </section>
  );
};

export default OverviewGroup;
