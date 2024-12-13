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
  Heart,
} from "@phosphor-icons/react";
import Image from "next/image";
import { addCommasToNumber } from "@/utils";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Carousel as ImageCarousel,
  CarouselApi as ImageCarouselApi,
  CarouselContent as ImageCarouselContent,
  CarouselItem as ImageCarouselItem,
  CarouselNext as ImageCarouselNext,
  CarouselPrevious as ImageCarouselPrevious,
} from "@/components/ui/post-carousel";

import Button from "@/components/goui/button";

const SelectedActivity = () => {
  const currentPath = usePathname();
  return (
    <section className="grid grid-cols-[35%_65%_0%] bg-white w-full h-full rounded overflow-hidden">
      {/* carousel */}

      <ImageCarousel className="py-4 ml-3">
        <ImageCarouselContent className="h-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <ImageCarouselItem key={index}>
              <img
                src={"/assets/hotel.png"}
                alt=""
                className="h-[200px] w-full object-cover rounded-sm"
              />

              <div className="absolute top-3 right-2 m-2 p-1 text-white backdrop-blur-lg bg-[#FFFFFF33]/10 rounded-full">
                <Heart size={25} />
              </div>
            </ImageCarouselItem>
          ))}
        </ImageCarouselContent>

        <div className="flex absolute bottom-[40px] left-0 right-0 justify-center scale-90">
          <div className="flex md:gap-8 gap-8 bg-white/20 backdrop-blur-md px-2 py-px rounded-sm">
            <ImageCarouselPrevious />
            <ImageCarouselNext />
          </div>
        </div>
      </ImageCarousel>

      <div className="flex flex-col">
        <div className="flex flex-row justify-between px-4 pt-4">
          <div>
            <h6 className="font-bold text-black">
              Colosseum Underground and Arena Floor Tour
            </h6>
            <p className="text-[#1D2433]">
              18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki
              Phase1{" "}
              <span>
                {" "}
                <Link
                  href={`${currentPath}?`}
                  className="bg-transparent hover:bg-transparent text-primary600 py-2 px-4 font-semibold text-sm rounded"
                >
                  Read more
                </Link>
              </span>
            </p>
          </div>

          {/* Price */}
          <div className="grid grid-col gap-2">
            <h3 className="text-medium flex items-center">
              <span>
                <CurrencyNgn size={23} weight="bold" />
              </span>
              <span className="font-bold">
                {addCommasToNumber(11234450)}.00
              </span>
            </h3>
          </div>
        </div>

        <div className="p-4 justify-content-center flex items-center gap-3 text-sm text-[#676E7E]  w-full">
          <span className="text-primary600 flex items-center gap-1 font-semibold cursor-pointer">
            <MapPin size={18} weight="bold" />
            Melbourne, Australia
          </span>
          <span className="flex items-center gap-1">
            <Star weight="fill" className="text-[#F4B93E]" />
            8.5 (436)
          </span>
          <span className="flex items-center gap-1">
            <Bed weight="fill" className="text-[#344054]" />
            King size room
          </span>
        </div>

        <hr />
        <div className="px-4 py-2">
          <p className="grid grid-flow-col items-center text-[#647995] font-sm">
            <span className="">What's Included:</span>
            <span className="w-full">
              Admission to the Empire State Building
              <Link
                href={`${currentPath}?`}
                className="bg-transparent hover:bg-transparent text-primary600 py-2 px-4 font-semibold text-sm rounded"
              >
                See more
              </Link>
            </span>
          </p>
        </div>
        <hr />
        <div className="flex justify-end p-2">
          <Button className="px-12">View</Button>
        </div>
      </div>
    </section>
  );
};

export default SelectedActivity;
