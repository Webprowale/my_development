"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Prop = {
  tabs: string[];
  defaultTab: string;
  onChange: (value: string) => void;
};
export const ScrollToNavBarDetail = ({
  value,
  offset,
}: {
  offset: number;
  value: string;
}) => {
  const element: any = document.getElementById(value);
  if (element) {
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    // const offset = 300;
    const finalPosition = elementPosition - offset;

    window.scrollTo({
      top: finalPosition,
      behavior: "smooth",
    });
  }
};
const NavBar = ({ tabs, defaultTab, onChange }: Prop) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const route = useRouter();
  const handleChange = (value: string) => {
    setSelectedTab(value);
    onChange(value);
  };
  return (
    <div className="flex gap-[1.5rem] text-[1rem] flex-wrap font-[500] border-b-[1px] border-b-[#D0D5DD] ">
      {/* is seltected */}
      {tabs?.map((d, index) => (
        <p
          key={index}
          className={`pb-[0.5rem] relative  cursor-pointer
                    ${selectedTab === d ? "before:h-[3px] text-[#1D2433]  before:w-full before:absolute before:bottom-0 before:left-0 before:bg-primary" : ""}
                    `}
          onClick={() => {
            handleChange(d);
          }}
        >
          {d}
        </p>
      ))}

      {/* <p className={`pb-[0.5rem] relative`}>Hotel Information</p>
            <p className={`pb-[0.5rem] relative`}>Facilities</p>
            <p className={`pb-[0.5rem] relative`}>Rooms</p>
            <p className={`pb-[0.5rem] relative`}>Reviews</p>
            <p className={`pb-[0.5rem] relative`}>FAQs</p>
            <p className={`pb-[0.5rem] relative`}>Policies</p> */}
    </div>
  );
};

export default NavBar;
