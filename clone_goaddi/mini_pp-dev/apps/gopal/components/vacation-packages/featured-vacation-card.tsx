"use client";
import {
  Carousel as ImageCarousel,
  CarouselApi as ImageCarouselApi,
  CarouselContent as ImageCarouselContent,
  CarouselItem as ImageCarouselItem,
  CarouselNext as ImageCarouselNext,
  CarouselPrevious as ImageCarouselPrevious,
} from "@/components/ui/post-carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  AirplaneTilt,
  Bed,
  Bus,
  CalendarBlank,
  ForkKnife,
  Heart,
  Star,
} from "@phosphor-icons/react";
import { naira } from "@/utils/money";
import GoButton from "@/components/goui/button";
import Link from "next/link";

interface IVacationPackageCardProps {
  d: any;
  key: number;
}

export function VacationPackageCard({ d, key }: IVacationPackageCardProps) {
  const { push } = useRouter();

  const { name, days, image } = d;

  const iconClass = "text-lg text-gray-500";

  return (
    <div key={key} className="flex w-auto h-auto">
      <div className="relative flex flex-col gap-2 border-2 border-gray-100 rounded max-w-[250px] bg-white w-full">
        <div className="max-w-[250px] w-full">
          <ImageCarousel className="h-full">
            <ImageCarouselContent className="h-full">
              {Array.from({ length: 5 }).map((_, index) => (
                <ImageCarouselItem key={index}>
                  <AspectRatio
                    ratio={7 / 5}
                    className="w-full relative object-cover"
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="h-52 w-full object-cover rounded-t-sm"
                    />
                  </AspectRatio>
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

          <div className="absolute capitalize backdrop-blur-lg bg-[#FFFFFF33] tracking-wide w-8 h-8 inline-flex justify-center items-center top-4 right-4 rounded-full text-white">
            <Heart size={16} weight="bold" className="text-white" />
          </div>
        </div>

        <div className="px-2.5 w-[250px]">
          <div className="font-semibold  ">{name}</div>
          <div className="text-sm flex justify-between mt-1">
            <div className="flex items-center text-gray-500 gap-1">
              <CalendarBlank weight="fill" size={14} />
              <div className="text-xs">{days} Days</div>
            </div>
            <div className="flex items-center text-gray-500">
              <Star weight="fill" size={14} className="text-yellow-500" />
              <div className="text-xs">8.5 (436)</div>
            </div>
          </div>
          <hr className="h-[1px] w-full bg-gray-100 mt-2 mb-2.5 rounded-full" />

          <div className="">
            <div className="font-medium text-black text-[14px]">
              {" "}
              {naira(2450000)}{" "}
              <span className="text-gray-500 text-xs">per person</span>
            </div>
          </div>

          {/* <div className="space-y-[6px]">
          <Flex gap={2}>
            <Icons.calender />
            <p className="text-date-text">May 6th - 14th</p>
          </Flex>
          .

      

          <h1 className="text-lg font-semibold">NGN 10,000</h1>
        </div> */}

          <div className="flex justify-between py-3">
            <Link href="/gopal/vacation-packages/search-results/A">
            <GoButton>See Package</GoButton>
            </Link>

            <div className="flex items-center gap-2">
              <AirplaneTilt className={iconClass} />

              <Bus className={iconClass} />

              <Bed className={iconClass} />

              <ForkKnife className={iconClass} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
