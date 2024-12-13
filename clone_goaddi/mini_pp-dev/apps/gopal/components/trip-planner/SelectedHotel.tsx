"use client";

import {
  AirplaneLanding,
  AirplaneTakeoff,
  CurrencyNgn,
  FilmSlate,
  ForkKnife,
  MapPin,
  SuitcaseRolling,
  Usb,
  X,
  Star,
  Bed,
  Wine,
  SwimmingPool,
  CalendarBlank,
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

const SelectedHotel = () => {
  const currentPath = usePathname();
  const router = useRouter();
  return (
    <section className="grid grid-cols-[22%_75%_3%] bg-white w-full h-full rounded overflow-hidden">
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
            <h3 className="font-bold text-xl">Riviera Resort, Lekki</h3>
            <p className="text-[#647995]">
              18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki
              Phase1
            </p>
            <div className="flex items-center gap-3 text-sm text-[#676E7E]">
              <span className="text-primary600 flex items-center gap-1 font-semibold cursor-pointer">
                <MapPin size={18} weight="bold" />
                Show in Map
              </span>
              <span className="flex items-center gap-1">
                <Star weight="fill" className="text-[#F4B93E]" />
                8.5 (436)
              </span>
              <span className="flex items-center gap-1">
                <Bed weight="fill" className="text-[#c3c3c4]" />
                King size room
              </span>
            </div>
          </div>

          {/* Hotel Price */}
          <div className="right flex flex-col gap-1 items-end">
            <h3 className="font-bold text-2xl flex items-center">
              <span>
                <CurrencyNgn size={23} weight="bold" />
              </span>
              <span>{addCommasToNumber(11234450)}.00</span>
            </h3>
            <p className="text-sm">
              Total Price: NGN{" "}
              <span className="font-medium">{addCommasToNumber(560000)}</span>
            </p>
            <p className="text-sm flex items-center gap-1">
              <span>1 room</span>
              <span>x</span>
              <span>10 nights incl.taxes</span>
            </p>
          </div>
        </section>
        {/* flight facilites */}
        <section className="border-y border-y-[#E4E7EC] p-4 flex items-center justify-between">
          <p className="flex items-center gap-4 text-[#647995] font-medium">
            <span>Facilities:</span>
            <span className="flex items-center gap-1">
              <SwimmingPool
                size={18}
                className="text-[#475367]"
                weight="bold"
              />
              Pool
            </span>
            <span className="flex items-center gap-1">
              <Wine size={18} className="text-[#475367]" weight="bold" />
              Bar
            </span>
          </p>

          {/* check in dates */}
          <div className="checkin flex items-center gap-2">
            <p className="text-sm flex items-center gap-2 text-[#647995] font-medium">
              <CalendarBlank size={18} className="text-[#475367]" />
              <span>Check In: 20-04-2024</span>
            </p>
            <p className="text-sm flex items-center gap-2 text-[#647995] font-medium">
              <CalendarBlank size={18} className="text-[#475367]" />
              <span>Check Out: 29-04-2024</span>
            </p>
          </div>
        </section>
        {/* flight details */}
        <div className="flex items-center gap-4 py-2">
          <div
            onClick={() =>
              router.push(`${currentPath}?hoteldetails=open`, { scroll: false })
            }
            className="bg-transparent hover:bg-transparent text-primary600 py-2 px-4 font-semibold text-sm rounded cursor-pointer"
          >
            Hotel details
          </div>
          <div
            onClick={() => router.push(`${currentPath}?pricedetails=open`)}
            className="bg-transparent hover:bg-transparent text-primary600 py-2 px-4 font-semibold text-sm rounded cursor-pointer"
          >
            Price details
          </div>
          <div
            onClick={() => router.push(`${currentPath}?flightdetails=open`)}
            className="bg-transparent hover:bg-transparent text-primary600 py-2 px-4 font-semibold text-sm rounded ml-auto cursor-pointer"
          >
            Edit details
          </div>
        </div>
      </div>
      {/* Cancel button */}
      <div className="bg-red-100 text-red-600 hover:bg-red-200 ease-linear duration-150 grid place-items-center min-h-full w-full cursor-pointer">
        <X size={22} weight="bold" />
      </div>
    </section>
  );
};

export default SelectedHotel;
