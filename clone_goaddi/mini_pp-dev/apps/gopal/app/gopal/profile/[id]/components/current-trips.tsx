"use client";
import Image from "next/image";
import React from "react";
import { ArrowRight, ShareFat, Video } from "@phosphor-icons/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/trend-carousel";
import { trendingData } from "@/data/trending";
import Autoplay from "embla-carousel-autoplay";
import Button from "@/components/goui/button";

type Props = {};

const CurrentTrips = (props: Props) => {
  return (
    <div className="bg-white w-full px-4 py-4 rounded-sm m relative">
      <h4 className="font-semibold md:text-sm text-xs">Current Trips</h4>

      {/* <CurrentTripCarousel trendingData={trendingData} /> */}
      {/* 
      <div className="flex justify-end w-full mt-5">
        <div className="text-primary600 flex justify-end items-center gap-1">
          <p className="text-sm font-semibold text-primary600">Show more</p>
          <ArrowRight weight="bold" className="text-primary600" />
        </div>
      </div> */}
      <div className="bg-white p-4 w-full text-center">
        <div className="flex items-center justify-center">
          <img
            src="/Chill.svg"
            alt=""
          />
        </div>
        <h2 className="font-[600] translate-y-[-20px]">No Trips yet!</h2>
      </div>
    </div>
  );
};

export default CurrentTrips;

export const CurrentTripCarousel = ({ trendingData }: any) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      // @ts-ignore
      onMouseLeave={plugin.current.play}
      className="w-full"
    >
      <CarouselContent>
        {trendingData.map((trend: any) => {
          const { firstName, lastName, avatar, images, desc } = trend;

          function setIsOpen(arg0: boolean) {
            throw new Error("Function not implemented.");
          }

          return (
            <CarouselItem key={firstName}>
              <div className="relative">
                <div className="flex relative flex-col gap-2 p-4 border-2 border-gray-100 mt-4">
                  <div>
                    <img
                      src="/assets/current_trip.png"
                      alt="current trip image"
                      className="w-full"
                    ></img>
                    <div className="absolute capitalize backdrop-blur-lg bg-[#FFFFFF33] tracking-wide py-2 px-6 top-4 right-4  m-6 rounded text-white px-8 py-2">
                      <span className="text-xs">Paris</span>
                    </div>
                  </div>
                  <div className="font-bold">Bahamas Family Trip</div>
                  <div className="flex flex-row justify-between text-base">
                    <span>19th April 2024</span>
                    <span className="text-base text-gray-500">5 days</span>
                  </div>
                  <Button className="w-full">View</Button>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="flex  absolute -top-2 right-10 ">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};
