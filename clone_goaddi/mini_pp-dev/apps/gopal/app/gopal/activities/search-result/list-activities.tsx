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
import { ActivitiesType } from "./activities";
import { truncateText, truncateTextWithOutDottedLine } from "@/utils/truncateText";

function ListActivities({
  searchLocation,
  activityName,
  featureImage,
  description,
  duration,
  adultPrice,
  searchId,
  activityCode,
}: ActivitiesType) {
  function removeHTMLTags(str: string) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = str;
    return tempElement.textContent || tempElement.innerText || "";
  }
  const descriptionText = removeHTMLTags(description);

  return (
    <section className="grid grid-cols-[35%_65%_0%] bg-white w-full p-6 h-[280px] rounded overflow-hidden">
      {/* carousel */}

      <ImageCarousel>
        <ImageCarouselContent className="h-full">
          {Array.from({ length: 2 }).map((_, index) => (
            <ImageCarouselItem key={index}>
              <img
                src={featureImage}
                alt=""
                className="h-[233px] w-full object-cover rounded-sm"
              />

              {/* <div className="absolute top-3 right-2 m-2 p-1 text-white backdrop-blur-lg bg-[#FFFFFF33]/10 rounded-full">
                <Heart size={25} />
              </div> */}
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

      <div className="flex flex-col w-full">
        <div className="flex items-start justify-between px-4">
          <div className="w-4/6">
            <h6 className="font-bold text-black">{activityName}</h6>
            <p className="text-[#1D2433]">
              {truncateTextWithOutDottedLine(descriptionText, 350)}{" "}
              <Link
                href={`/gopal/activities/details?destination=${searchLocation}searchId=${searchId}&activity-code=${activityCode}&price=${adultPrice}`}
                className="bg-transparent hover:bg-transparent text-primary600 py-2 font-semibold text-sm rounded"
              >
                Read more...
              </Link>
            </p>
          </div>

          {/* Price */}
          <div className="w-2/6 pl-24">
            <p className="text-gray-500">From</p>
            <h3 className="text-medium flex items-center">
              <span>
                <CurrencyNgn size={30} weight="bold" />
              </span>
              <span className="font-bold text-3xl">
                {adultPrice.toLocaleString()}
              </span>
            </h3>
          </div>
        </div>

        <div className="p-4 justify-content-center flex items-center gap-3 text-sm text-[#676E7E]  w-full">
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activityName)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary600 flex items-center gap-1 font-semibold cursor-pointer"
          >
            <MapPin size={18} weight="bold" />
            {searchLocation}
          </Link>
          {/* <span className="flex items-center gap-1">
            <Star weight="fill" className="text-[#F4B93E]" />
            8.5 (436)
          </span>
          <span className="flex items-center gap-1">
            <Bed weight="fill" className="text-[#344054]" />
            King size room
          </span> */}
        </div>

        {/* <hr />
        <div className="px-4 py-2">
          <p className="grid grid-flow-col items-center text-[#647995] font-sm">
            <span className="">What's Included:</span>
            <span className="w-full">
              Admission to the Empire State Building
              <Link
                href={``}
                className="bg-transparent hover:bg-transparent text-primary600 py-2 px-4 font-semibold text-sm rounded"
              >
                See more
              </Link>
            </span>
          </p>
        </div> */}
        <hr />
        <div className="flex justify-end p-2">
          <Link
            href={`/gopal/activities/details?destination=${searchLocation}searchId=${searchId}&activity-code=${activityCode}&price=${adultPrice}`}
          >
            <Button className="px-12">View</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ListActivities;
