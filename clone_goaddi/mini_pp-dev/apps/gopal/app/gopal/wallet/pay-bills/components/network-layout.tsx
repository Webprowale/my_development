"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useLink } from "@/hooks/useLink";
import BackArrow from "../../assets/svg/back-arrow.svg";

const NetworkLayout = ({
  title,
  data,
  children,
}: {
  title: string;
  data: { icon: string; title: string }[];
  children: React.ReactNode;
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const { link, handleClick } = useLink("");

  return (
    <>
      <div className="h-max rounded bg-white">
        <div className="flex flex-col p-4 mt-5">
          <Link
            href="wallet?tab=pay-bills"
            className="flex items-center space-x-2"
          >
            <Image src={BackArrow} alt="backarrow alt" />
            <p className="text-primary600 text-sm">Back</p>
          </Link>
          <p className="font-bold text-xs mt-2">{title}</p>

          <div className="flex items-center space-x-3 mt-8 bg-white">
            {data.map((value, index) => (
              <div
                key={index}
                onClick={() => {
                  handleClick(value.title);
                  setIsSelected(true);
                }}
                className={`flex flex-col justify-between border w-[150px] h-[120px] rounded p-4 ${value.title === link ? "border border-primary600 text-primary600 bg-primary200" : ""}`}
              >
                <div className="flex items-start rounded justify-between">
                  <Image src={value.icon} alt="glo alt" />
                  <input
                    type="radio"
                    checked={value.title === link}
                    className="h-5 w-5"
                  />
                </div>
                <p className="text-xs font-bold">{value.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="rounded bg-white mt-5 w-full h-max px-4 py-6">
          {children}
        </div>
      )}
    </>
  );
};

export default NetworkLayout;
