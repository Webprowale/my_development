"use client";
import GoButton from "@/components/goui/button";
import PostAvatar from "@/components/posts/dairy-post/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/trend-carousel";
import { trendingData } from "@/data/trending";
import { ArrowRight } from "@phosphor-icons/react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";

type Props = {};

const Trending = (props: Props) => {
  return (
    <div className="bg-white w-full px-4 py-4 rounded-sm m relative">
      <h4 className="font-semibold md:text-sm text-xs">Trending Now</h4>

      <TrendCrousel trendingData={trendingData} />
      <div className="flex justify-end w-full mt-5">
        <div className="text-primary600 flex justify-end items-center gap-1">
          <p className="text-sm font-semibold text-primary600">See all</p>
          <ArrowRight
            weight="bold"
            className="text-primary600"
          />
        </div>
      </div>
    </div>
  );
};

export default Trending;

export const TrendCrousel = ({ trendingData }: any) => {
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
          console.log({ trend });
          return (
            <CarouselItem key={firstName}>
              <div className="mt-2.5">
                <PostAvatar
                  firstName={firstName}
                  lastName={lastName}
                  avatar={avatar}
                  size="small"
                />
                <div className="flex items-start gap-3 max-h-[100px] mt-3">
                  <div className="">
                    <div className="relative w-[100px] h-[100px] rounded-sm">
                      <Image
                        src={images[0]}
                        className="object-cover rounded-sm w-[100px] h-[100px]"
                        fill
                        alt={desc}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between h-[100px]">
                    <p className="text-[13px]">{desc.substring(0, 106)}...</p>
                    <GoButton>See Post</GoButton>
                  </div>
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
