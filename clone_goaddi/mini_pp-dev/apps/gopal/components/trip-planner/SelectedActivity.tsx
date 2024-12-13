"use client";

import {
  CurrencyNgn,
  MapPin,
  X,
  Star,
  CalendarBlank,
  Clock,
} from "@phosphor-icons/react";
import { Button } from "../ui/button";
import Image from "next/image";
import { addCommasToNumber } from "@/utils";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/post-carousel";

const SelectedActivity = () => {
  const currentPath = usePathname();

  return (
    <section className="grid grid-cols-[23%_74%_3%] bg-white w-full h-full rounded overflow-hidden">
      {/* carousel */}
      <div className="hotel-gallery relative ml-4 self-center py-4">
        <Carousel className="w-full h-full">
          <CarouselContent className="h-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <img
                  src={"/assets/hotel.png"}
                  alt=""
                  className="rounded w-full h-full max-h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex absolute bottom-5 left-0 right-0 justify-center ">
            <div className="flex md:gap-8 gap-8 bg-white/20 backdrop-blur-md px-2 py-px rounded-sm">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
        </Carousel>
      </div>
      <div className="main w-full">
        {/* flight info */}
        <section className="p-4 flex items-center justify-between">
          {/* Hotel details */}
          <div className="left w-[55%] max-w-[60%] flex flex-col gap-1">
            <h3 className="font-bold text-xl">The Museum of Modern Art</h3>
            <p className="text-[#647995] text-sm">
              Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2
              cafes & The modern restaurant
            </p>
            <div className="flex items-center gap-3 text-sm text-[#676E7E]">
              <span className="text-primary600 flex items-center gap-1 font-semibold cursor-pointer">
                <MapPin
                  size={18}
                  weight="bold"
                />
                Melbourne, Australia
              </span>
              <span className="flex items-center gap-1">
                <Star
                  weight="fill"
                  className="text-[#F4B93E]"
                />
                8.5 (436)
              </span>
              <span className="flex items-center gap-1">
                <Clock
                  className="text-[#344054]"
                  weight="bold"
                />
                1 Hour
              </span>
            </div>
          </div>

          {/* Hotel Price */}
          <div className="right flex flex-col gap-1 items-end">
            <h3 className="font-bold text-2xl flex items-center">
              <span>
                <CurrencyNgn
                  size={23}
                  weight="bold"
                />
              </span>
              <span>{addCommasToNumber(11234450)}.00</span>
            </h3>
            <p className="text-sm">10:30 AM on Mar 19</p>
            <p className="text-sm text-primary600 font-medium underline underline-offset-2 flex items-center gap-1 cursor-pointer">
              Change time
            </p>
          </div>
        </section>
        {/* flight facilites */}
        <section className="border-y border-y-[#E4E7EC] p-4 flex items-center justify-between">
          <p className="flex items-center gap-3 text-[#647995] font-medium">
            <span>What's Included:</span>
            <span className="flex items-center gap-1">
              Admission to the Empire State Building Pool
            </span>
            <Link
              href={"#"}
              className="flex items-center gap-1 text-primary600 font-semibold"
            >
              See more
            </Link>
          </p>

          {/* check in dates */}
          <div className="checkin flex items-center gap-2">
            <p className="py-2 px-2 bg-[#0A369D] text-white rounded text-xs tracking-wide">
              Day 1 (Activity 1)
            </p>
          </div>
        </section>
        {/* flight details */}
        <div className="flex items-center gap-4 py-2">
          <Link
            href={`${currentPath}?activitydetail=open`}
            className="bg-transparent hover:bg-transparent text-primary600 py-2 px-4 font-semibold text-sm rounded"
          >
            Activity details
          </Link>
          <Link
            href={`${currentPath}?pricedetails=open`}
            className="bg-transparent hover:bg-transparent text-primary600 py-2 px-4 font-semibold text-sm rounded"
          >
            Price details
          </Link>
          <Link
            href={`${currentPath}?flightdetails=open`}
            className="bg-transparent hover:bg-transparent text-primary600 py-2 px-4 font-semibold text-sm rounded ml-auto"
          >
            Edit details
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

export default SelectedActivity;
