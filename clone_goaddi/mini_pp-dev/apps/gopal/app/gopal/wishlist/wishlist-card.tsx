import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel as ImageCarousel,
  CarouselApi as ImageCarouselApi,
  CarouselContent as ImageCarouselContent,
  CarouselItem as ImageCarouselItem,
  CarouselNext as ImageCarouselNext,
  CarouselPrevious as ImageCarouselPrevious,
} from "@/components/ui/post-carousel";
import { addCommasToNumber } from "@/utils";
import { Clock } from "@phosphor-icons/react";
import {
  Bed,
  CalendarBlank,
  CurrencyNgn,
  Heart,
  MapPin,
  RoadHorizon,
  Star,
  SwimmingPool,
  Wine,
  X,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import router from "next/router";

const WishlistCard = () => {
  return (
    <div className="border-[1px] p-0 border-[#E4E7EC] rounded-sm">
      <section className="grid grid-cols-[22%_74%_4%] bg-white w-full h-full rounded overflow-hidden">
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
        <div className="main w-[5/6] items-center !mx-4">
          {/* flight info */}
          <section className="p-4 flex items-center justify-between">
            {/* Hotel details */}
            <div className="left w-[55%] max-w-[60%] flex flex-col gap-1">
              <p className="flex items-center justify-center gap-1 rounded-[50px] w-[99px] bg-[#F0F2F5] py-[6px] px-[16px]">
                <span>
                  {" "}
                  <RoadHorizon color="#101928" />
                </span>
                <span>Activity </span>
              </p>
              <h3 className="font-bold text-xl">The Museum of Modern Art</h3>

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
                  <Clock className="text-[#344054]" />1 hr
                </span>
              </div>
            </div>

            {/* Hotel Price */}
            <div className="right flex flex-col gap-1 items-end"></div>
          </section>
          {/* flight facilites */}
          <section className="border-y border-y-[#E4E7EC] p-4 flex items-center justify-between">
            <p className="flex items-center gap-4 text-[#647995] font-medium">
              <span>Provided by</span>
              <span className="flex items-center gap-1">
                <img src="/assets/iscova.png" />
              </span>
            </p>
          </section>
          {/* flight details */}
          <div className="flex items-center gap-4 p-4">
            <div className="flex gap-2">
              <span className="text-[#676E7E] text-sm font-medium">From</span>
              <h3 className="font-semibold text-xl flex items-center">
                <span>
                  <CurrencyNgn size={23} weight="bold" />
                </span>
                <span>{addCommasToNumber(11234450)}.00</span>
              </h3>
            </div>

            <div className=" ml-auto cursor-pointer">
              <Button>Details & Booking</Button>
            </div>
          </div>
        </div>

        {/* Cancel button */}
        <div className="bg-red-100  text-red-600 hover:bg-red-200 ease-linear duration-150 grid place-items-center min-h-full w-full cursor-pointer">
          <X size={22} weight="bold" />
        </div>
      </section>
    </div>
  );
};

export default WishlistCard;
