"use client";

import { useState, useEffect } from "react";

import { CaretUpDown, Check, CheckCircle } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

type Props = { expanded: boolean };

const Switch = ({ expanded }: Props) => {
  return (
    <div className="w-full">
      <SwitchBox expanded={expanded} />
    </div>
  );
};

export default Switch;

const frameworks = [
  {
    value: "gopal",
    label: "GoPal",
    image: "gopal.png",
    account: "Admin Account",
  },
  {
    value: "gofamily",
    label: "GoFamily",
    image: "gofamily.png",
    account: "Member Account",
  },
  {
    value: "gobusiness",
    label: "GoBusiness",
    image: "gobusiness.png",
    account: "Member Account",
  },
  {
    value: "goschool",
    label: "GoSchool",
    image: "goschool.png",
    account: "Member Account",
  },
];

export function SwitchBox({ expanded }: { expanded: boolean }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("gopal");

  const handleSelect = (currentValue: string) => {
    // Find the framework object with the matching value
    const selectedFramework = frameworks.find(
      (framework) => framework.value === currentValue
    );

    if (selectedFramework) {
      setValue(currentValue);
    } else {
      console.error(`Framework with value '${currentValue}' not found.`);
    }

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="rounded-sm bg-gray-100 flex m-3 p-2.5 cursor-pointer">
          <img
            src="/assets/gopal.png"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-40 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4 ">
              <h4 className="font-semibold text-nowrap">GoPal</h4>
              <span className="text-xs text-slate-400 text-nowrap">
                Admin Account
              </span>
            </div>
            <CaretUpDown size={20} />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={`${expanded ? "w-[220px]" : "w-fit"} bg-gray-100 p-0`}
      >
        {frameworks?.map((framework) => {
          const { image, value, label, account } = framework;
          return (
            <div
              key={value}
              className=" bg-white flex items-center m-2 p-2.5 cursor-pointer"
            >
              <img
                src={`/assets/${image}`}
                alt=""
                className="w-10 h-10 rounded-md"
              />
              <div
                className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-40 ml-3" : "w-0"}
          `}
              >
                <div className="leading-4 ">
                  <h4 className="font-semibold text-nowrap">{label}</h4>
                  <span className="text-xs text-slate-400 text-nowrap">
                    {account}
                  </span>
                </div>
              </div>
              {framework.value === "gopal" ? (
                <CheckCircle
                  size={25}
                  weight="fill"
                  className="text-green-700"
                />
              ) : (
                ""
              )}
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
