"use client";

import { useState, useEffect } from "react";
import {
  Carousel as ImageCarousel,
  CarouselApi as ImageCarouselApi,
  CarouselContent as ImageCarouselContent,
  CarouselItem as ImageCarouselItem,
  CarouselNext as ImageCarouselNext,
  CarouselPrevious as ImageCarouselPrevious,
} from "@/components/ui/post-carousel";
import { FaClock } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// import { Button } from "@/components/ui/button";
import Button from "@/components/goui/button";
import SectionLayout from "../../app/gopal/activities/components/section";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function FeatureActivities() {
  const [mapi, msetApi] = useState<CarouselApi>();
  const [mcurrent, msetCurrent] = useState(0);
  const [mcount, msetCount] = useState(1);

  useEffect(() => {
    if (!mapi) {
      return;
    }
    msetCount(mapi.scrollSnapList().length);
    msetCurrent(mapi.selectedScrollSnap() + 4);

    mapi.on("select", () => {
      // console.log("current");
      msetCurrent(mapi.selectedScrollSnap() + 4);
    });
  }, [mapi]);

  const handleChangeCarousel = (index: number) => {
    if (!mapi) {
      return null;
    }

    if (index === 0) {
      mapi?.scrollTo(index + 4);
    } else {
      mapi?.scrollTo(index * 4);
    }
  };

  return (
    <Carousel setApi={msetApi}>
      <CarouselContent>
        {[...new Array(6)].map((_, index) => (
          <CarouselItem key={index} className="basis-1/3">
            <div className="">
              <div className="relative py-2">
                <ImageCarousel className="h-full">
                  <ImageCarouselContent className="h-full">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <ImageCarouselItem key={index}>
                        <img
                          src={"/assets/hotel.png"}
                          alt=""
                          className="h-52 w-full object-cover rounded-t-sm"
                        />
                      </ImageCarouselItem>
                    ))}
                  </ImageCarouselContent>

                  <div className="flex absolute bottom-2 left-0 right-0 justify-center scale-90">
                    <div className="flex md:gap-8 gap-8 bg-white/20 backdrop-blur-md px-2 py-px rounded-sm">
                      <ImageCarouselPrevious />
                      <ImageCarouselNext />
                    </div>
                  </div>
                </ImageCarousel>

                <div className=" border rounded-b-sm">
                  <div className="px-3 py-3">
                    <div className="flex justify-between items-center w-full text-xs">
                      <div className="flex item-center align-center gap-1">
                        <div className="bg-gray-100 w-6 h-6 flex items-center justify-center rounded-full">
                          <img
                            alt=""
                            src="/assets/MapPin.svg"
                            className=" w-5  p-1"
                          />
                        </div>
                        <span className="text-slate-950 font-medium mt-[4px] text-[11px] text-nowrap">
                          Melbourne, Australia
                        </span>
                      </div>
                      <span className="flex item-center gap-1">
                        <img src="/assets/Star.svg" alt="" className="w-3" />
                        <span className="mt-1">8.5 (436)</span>
                      </span>
                    </div>

                    <div className="flex text-start w-full text-[13px] font-bold mt-2 ">
                      Colosseum Underground and Arena Floor Tour
                    </div>
                  </div>

                  <hr className="bg-gray-300" />

                  <div className="-[1px]  py-1 px-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-x-2 w-1/3 text-xs">
                        <span className="font-small text-gray-500 ">From</span>
                        <span className="font-semibold text-[9px] inline-flex items-center">
                          {" "}
                          <del>N</del> 123,450.00
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-x-[2px] text-xs items-center font-small text-gray-500">
                        <span>
                          <FaClock />
                        </span>
                        <span>3hr</span>
                      </div>
                    </div>
                    <Button className="w-full py-1 my-2 text-sm">View</Button>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* <div className="flex w-full justify-center my-4 py-4">
          <div className=" absolute -bottom-14  my-12">
            <div className="w-full flex flex-row space-x-2 items-center">
              <CarouselPrevious>
                <IoIosArrowBack size={20} color="black" />
              </CarouselPrevious>
              {[...new Array(mcount / 1)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleChangeCarousel(index)}
                  className={`w-3 h-3 rounded-full ${index === mcurrent - 1 ? "bg-blue-300" : "bg-gray-300"}`}
                ></button>
              ))}
              <CarouselNext>
                <IoIosArrowForward size={20} />
              </CarouselNext>
            </div>
          </div>
        </div> */}
    </Carousel>
  );
}

export default FeatureActivities;
