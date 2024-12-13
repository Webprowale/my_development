"use client";

import {
  AirplaneLanding,
  AirplaneTakeoff,
  CurrencyNgn,
  FilmSlate,
  ForkKnife,
  SuitcaseRolling,
  Usb,
  X,
} from "@phosphor-icons/react";
import { Button } from "../ui/button";
import Image from "next/image";
import { addCommasToNumber } from "@/utils";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { SelectedFlightType } from "@/interfaces";

const SelectedFlight = () => {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <section className="grid grid-cols-[97%_3%] bg-white w-full h-full">
      <div className="main w-full">
        {/* flight info */}
        <section className="p-4 flex items-center justify-between">
          {/* airline details */}
          <div className="airline flex items-center gap-3">
            <Image
              src={"/assets/american-airlines.svg"}
              width={24}
              height={24}
              alt=""
              className="object-contain"
            />
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-xl">American Airlines</h3>
              <p className="text-[#676E7E] text-sm flex items-center gap-2">
                <span>AA-829</span>
                <span>&bull;</span>
                <span className="inline-block text-xs py-1 px-2 text-white bg-primary900 rounded">
                  First class
                </span>
              </p>
            </div>
          </div>

          {/* flight route */}
          <div className="flex items-center gap-6">
            <div className="time flex flex-col items-end">
              <h4 className="font-semibold text-xl">08:25</h4>
              <p className="text-sm text-[#676E7E]">Sun, 20 Aug</p>
            </div>
            <div className="flight">
              <div className="flex items-center justify-between">
                <AirplaneTakeoff
                  size={20}
                  weight="bold"
                  className="text-[#475367]"
                />
                <span className="text-[#676E7E]">Duration: 24h 45m</span>
                <AirplaneLanding
                  size={20}
                  weight="bold"
                  className="text-[#475367]"
                />
              </div>
              <div className="h-[8px] rounded-full bg-primary100 flex items-center justify-center w-[320px] my-2">
                <div className="h-[8px] rounded-full bg-primary600 w-[140px]"></div>
              </div>
              <div className="flex items-center justify-between text-sm text-primary1100">
                <span className="font-medium">LOS</span>
                <span className="text-[#676E7E]">Direct</span>
                <span className="font-medium">LAX</span>
              </div>
            </div>
            <div className="time">
              <h4 className="font-semibold text-xl">09:25</h4>
              <p className="text-sm text-[#676E7E]">Sun, 20 Aug</p>
            </div>
          </div>

          {/* flight price */}
          <h3 className="font-bold text-2xl flex items-center">
            <span>
              <CurrencyNgn
                size={23}
                weight="bold"
              />
            </span>
            <span>{addCommasToNumber(1234450)}</span>
          </h3>
        </section>
        {/* flight facilites */}
        <section className="border-y border-y-[#E4E7EC] p-4">
          <p className="flex items-center gap-4 text-[#647995] font-medium">
            <span>Facilities:</span>
            <span className="flex items-center gap-1">
              <SuitcaseRolling
                size={18}
                className="text-[#475367]"
                weight="bold"
              />
              Baggage: 20kg, Cabin Baggage: 8kg
            </span>
            <span className="flex items-center gap-1">
              <FilmSlate
                size={18}
                className="text-[#475367]"
                weight="bold"
              />
              In flight entertainment
            </span>
            <span className="flex items-center gap-1">
              <ForkKnife
                size={18}
                className="text-[#475367]"
                weight="bold"
              />
              In flight meal
            </span> 
            <span className="flex items-center gap-1">
              <Usb
                size={18}
                className="text-[#475367]"
                weight="bold"
              />
              USB Port
            </span>
          </p>
        </section>
        {/* flight details */}
        <div className="flex items-center gap-4 py-2">
          <Link
            href={`${currentPath}?flightdetails=open`}
            className="bg-transparent hover:bg-transparent text-primary600 py-2 px-4 font-semibold rounded text-sm"
          >
            Flight details
          </Link>
          <Link
            href={`${currentPath}?pricedetails=open`}
            className="bg-transparent hover:bg-transparent text-primary600 py-2 px-4 font-semibold text-sm rounded"
          >
            Price details
          </Link>
        </div>
      </div>
      {/* Cancel button */}
      <div className="bg-red-100 text-red-600 hover:bg-red-200 ease-linear duration-150 grid place-items-center min-h-full w-full cursor-pointer">
        <X
          size={22}
          weight="bold"
        />
      </div>
    </section>
  );
};

export default SelectedFlight;
