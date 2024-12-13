"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/trend-carousel";
import {
  Airplane,
  AirplaneTakeoff,
  ArrowRight,
  CalendarBlank,
  Timer,
} from "@phosphor-icons/react";
import Link from "next/link";

import { usePathname } from "next/navigation";

const MyTripSlider = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname.startsWith("/gopal/trip-timeline") ? (
        <div className="my-trips-slider w-full bg-white p-4 rounded relative">
          <Carousel>
            <h3 className="bg-primary100 text-primary600 text-xs font-medium rounded py-1 px-3 w-max mb-3">
              My Trip
            </h3>
            <CarouselContent>
              <CarouselItem>
                <Trip />
              </CarouselItem>
              <CarouselItem>
                <Trip />
              </CarouselItem>
              <CarouselItem>
                <Trip />
              </CarouselItem>
              <CarouselItem>
                <Trip />
              </CarouselItem>
            </CarouselContent>
            <div className="flex  absolute top-2 right-10 ">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>

          <Link
            href={"/"}
            className="flex items-center justify-center bg-primary600 text-white font-medium p-2 text-sm mt-7 rounded hover:bg-primary700 ease-linear duration-150"
          >
            Manage Trips
          </Link>
        </div>
      ) : null}
    </>
  );
};

const Trip = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="w-full md:w-[67%]">
          <h2 className="font-bold">Bahamas Family Trip</h2>
          <p className="text-sm text-[#676E7E]">
            Creating Memories in the Bahamas with my family
          </p>
        </div>
        {/* members pictures */}
        <div className="flex items-center w-max">
          <div className="img-group flex items-center">
            <img
              src="/assets/trip-timeline/1.png"
              alt=""
              className="w-[30px] h-[30px] object-cover"
            />
            <img
              src="/assets/trip-timeline/2.png"
              alt=""
              className="w-[30px] h-[30px] object-cover ml-[-12px]"
            />
            <img
              src="/assets/trip-timeline/3.png"
              alt=""
              className="w-[30px] h-[30px] object-cover ml-[-12px]"
            />
            <img
              src="/assets/trip-timeline/4.png"
              alt=""
              className="w-[30px] h-[30px] object-cover ml-[-12px]"
            />
            <div className="grid place-items-center w-[30px] h-[30px] rounded-full bg-primary100 text-primary600 ml-[-12px] text-xs">
              <p>18+</p>
            </div>
          </div>
        </div>
      </div>
      {/* trip details */}
      <div className="details grid grid-cols-1 md:grid-cols-[auto_auto] gap-y-6 gap-x-3 mt-7">
        <div className="airline flex items-center gap-2 w-max">
          <span className="grid place-items-center w-[40px] h-[40px] rounded bg-[#F0F2F5]">
            <Airplane size={20} weight="light" />
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-sm">Airline</h3>
            <p className="text-xs text-[#676E7E]">Sun Airways</p>
          </div>
        </div>
        <div className="airline flex items-center gap-2 w-max">
          <span className="grid place-items-center w-[40px] h-[40px] flex-shrink-0 rounded bg-[#F0F2F5]">
            <AirplaneTakeoff size={20} weight="light" />
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-sm">Departure/Arrival</h3>
            <p className="text-xs text-[#676E7E]">
              Chicago (ORD) - Nassau (NAS)
            </p>
          </div>
        </div>
        <div className="airline flex items-center gap-2 w-max">
          <span className="grid place-items-center w-[40px] h-[40px] rounded bg-[#F0F2F5]">
            <Timer size={20} weight="light" />
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-sm">Duration</h3>
            <p className="text-xs text-[#676E7E]">4 Days</p>
          </div>
        </div>
        <div className="airline flex items-center gap-2 w-max">
          <span className="grid place-items-center w-[40px] h-[40px] rounded bg-[#F0F2F5]">
            <CalendarBlank size={20} weight="light" />
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-sm">Dates</h3>
            <p className="text-xs text-[#676E7E]">March 10th - March 17th</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTripSlider;
