import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/post-carousel";
import {
  AirplaneLanding,
  AirplaneTakeoff,
  ArrowRight,
  Bed,
  CalendarBlank,
  Clock,
  User,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import TravellerInformation from "../forms/traveller-information";
import Link from "next/link";
import Actions from "@/components/trip-planner/actions";
// import SplitPay from "@/app/gopal/hotels/bookings/components/payments/split";

type Props = {};

const Review = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
        <div className="md:my-5">
          <h2 className="font-semibold hidden md:block">
            {" "}
            Review and Confirmation
          </h2>
          <p className="text-sm text-slate-500 max-w-sm">
            This allows you to thoroughly examine all the details of your
            planned trip before finalizing your bookings.
          </p>
        </div>

        {/* Flight Information */}
        <div className="w-full mt-4 mb-5 p-4 border border-slate-200 rounded-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold">Flight Information</h3>

            <div className="text-sm text-primary600">Flight details</div>
          </div>

          {/* Travellers */}
          <div className="flex items-center gap-2 mt-3">
            <User
              weight="bold"
              size={17}
              className="text-black"
            />
            <div className="text-slate-500 text-[15px] font-normal">
              1 Adult, 2 Children
            </div>
          </div>

          {/* Departure Details */}
          <div className="">
            <div className="flex items-center gap-3 mt-3">
              <div className="inline-flex items-center gap-2 text-black text-sm py-1 px-2 rounded-sm bg-gray-200/70">
                Depart
                <ArrowRight className="text-black" />
              </div>

              <div className="flex items-center text-black text-[15px] font-medium">
                <p className="">
                  LOS - Muritala Muhammed International Airport
                </p>
                <div className="h-4 w-[1px] mx-2 rounded-full bg-gray-500"></div>
                <p className="">Lagos, Nigeria</p>
                <div className="h-4 w-[1px] mx-2 rounded-full bg-gray-500"></div>
                <p className="">0 Stops</p>
              </div>
            </div>

            {/* Trip Duration */}
            <div className="mt-4">
              <div className="flex items-center gap-x-8">
                <TimeEtDate
                  time="08:35"
                  date="Sun, 20 Aug"
                />
                <FlightLoader
                  duration="1h 45m"
                  travelFrom="LOS"
                  travelTo="SIN"
                />
                <TimeEtDate
                  time="08:35"
                  date="Sun, 20 Aug"
                />
              </div>
            </div>
          </div>
          {/* Return Details */}
          <hr className="h-[1px] bg-gray-100 rounded-full my-6" />

          <div className="">
            <div className="flex items-center gap-3 mt-3">
              <div className="inline-flex items-center gap-2 text-black text-sm py-1 px-2 rounded-sm bg-gray-200/70">
                Depart
                <ArrowRight className="text-black" />
              </div>

              <div className="flex items-center text-black text-[15px] font-medium">
                <p className="">
                  LOS - Muritala Muhammed International Airport
                </p>
                <div className="h-4 w-[1px] mx-2 rounded-full bg-gray-500"></div>
                <p className="">Lagos, Nigeria</p>
                <div className="h-4 w-[1px] mx-2 rounded-full bg-gray-500"></div>
                <p className="">0 Stops</p>
              </div>
            </div>

            {/* Trip Duration */}
            <div className="mt-4">
              <div className="flex items-center gap-x-8">
                <TimeEtDate
                  time="08:35"
                  date="Sun, 20 Aug"
                />
                <FlightLoader
                  duration="1h 45m"
                  travelFrom="LOS"
                  travelTo="SIN"
                />
                <TimeEtDate
                  time="08:35"
                  date="Sun, 20 Aug"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <TravellerInformation
            key={1}
            travellerDetails={{
              id: 1,
              traveller: "Adult",
              travellerNum: 1,
            }}
          />
        </div>
      </div>
      <Actions>
        <div className="">
          <p className="text-sm"></p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setOpen(true)}
            className="text-primary600 bg-primary100 rounded hover:bg-primary200 ease-linear duration-150 w-40"
          >
            Split Pay
          </Button>

          <Link href="/gopal/trip-planner/trip-booking-flow?step=payment">
            <Button className="bg-primary600 rounded text-white hover:bg-primary700 ease-linear duration-150 w-40">
              Pay All
            </Button>
          </Link>
        </div>
      </Actions>
      {/* <SplitPay open={open} setOpen={setOpen} /> */}
    </>
  );
};

export default Review;

export const TimeEtDate = ({ time, date }: { time: string; date: string }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Time */}
      <div className="text-xl font-semibold text-black">{time}</div>
      <div className="text-gray-500/90 text-sm  font-medium">{date}</div>
    </div>
  );
};

export const FlightLoader = ({
  duration,
  travelFrom,
  travelTo,
}: {
  duration: string;
  travelFrom: string;
  travelTo: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-between max-w-sm w-full my-1">
      <div className="flex justify-between items-center w-full">
        <AirplaneTakeoff
          size={20}
          weight="bold"
          className="text-gray-600 "
        />
        <div className="text-gray-500 font-medium text-[15px]">
          Duration: {duration}
        </div>
        <AirplaneLanding
          size={20}
          weight="bold"
          className="text-gray-600"
        />
      </div>
      <div className="my-3 w-full">
        <div className="bg-primary100 flex justify-center items-center w-full h-2 rounded-full">
          <div className="bg-primary600 w-28 h-2 rounded-full"></div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="font-semibold text-black">LOS</div>
        <div className="text-gray-500 font-medium text-[15px]">Direct</div>
        <div className="font-semibold text-black">SIN</div>
      </div>
    </div>
  );
};

const HotelInformation = ({
  hotelName,
  hotelAddress,
  checkIn,
  checkOut,
  roomName,
  room,
  nights,
  guests,
}: any) => {
  return (
    <div className="flex">
      <div className="flex gap-3 items-start">
        <ImageCarousel />

        <div className="flex flex-col gap-1">
          <div className="font-semibold text-black text-lg">{hotelName}</div>
          <div className="font-medium text-black text-sm max-w-sm mb-1">
            {hotelAddress}
          </div>
          <div className="flex items-center gap-3 flex-wrap text-sm">
            <div className="inline-flex gap-2 items-center">
              <CalendarBlank
                weight="bold"
                size={18}
                className="text-gray-600"
              />{" "}
              <span className="text-gray-600">Check In: {checkIn}</span>
            </div>
            <div className="inline-flex gap-2 items-center">
              <CalendarBlank
                weight="bold"
                size={18}
                className="text-gray-600"
              />{" "}
              <span className="text-gray-600">Check In: {checkOut}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap text-sm mt-1">
            <div className="inline-flex gap-2 items-center">
              <Bed
                weight="fill"
                size={18}
                className="text-gray-600"
              />{" "}
              <span className="text-gray-600">{roomName}</span>
            </div>
            <div className="inline-flex gap-2 items-center">
              <User
                weight="bold"
                size={18}
                className="text-gray-600"
              />{" "}
              <span className="text-gray-600">{guests}</span>
            </div>
          </div>
          <div className="font-medium text-gray-600 mt-1">
            {room} room x {nights} nights incl. taxes
          </div>
        </div>
      </div>
    </div>
  );
};
const ActivityInformation = ({
  activityName,
  activityAddress,
  date,
  time,
  day,
  guests,
}: any) => {
  return (
    <div className="flex">
      <div className="flex gap-3 items-start">
        <ImageCarousel />

        <div className="flex flex-col gap-1">
          <div className="font-semibold text-black text-[18px]">
            {activityName}
          </div>
          <div className="font-medium text-black text-sm max-w-sm mb-1">
            {activityAddress}
          </div>
          <div className="flex items-center gap-3 flex-wrap text-sm">
            <div className="inline-flex gap-2 items-center">
              <CalendarBlank
                weight="bold"
                size={18}
                className="text-gray-600"
              />{" "}
              <span className="text-gray-600">{date}</span>
            </div>
            <div className="inline-flex gap-2 items-center">
              <Clock
                weight="bold"
                size={18}
                className="text-gray-600"
              />{" "}
              <span className="text-gray-600">{time}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap text-sm mt-1">
            <div className="inline-flex gap-2 items-center">
              <User
                weight="bold"
                size={18}
                className="text-gray-600"
              />{" "}
              <span className="text-gray-600">{guests}</span>
            </div>
          </div>
          <Button className="bg-primary900 rounded-md hover:text-primary800 px-2 text-xs h-7 mt-2 text-white font-medium w-fit">
            Day {day}
          </Button>
        </div>
      </div>
    </div>
  );
};

const ImageCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <div className="hotel-gallery relative self-center w-[200px]">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        // @ts-ignore
        onMouseLeave={plugin.current.play}
        className="w-full h-full"
      >
        <CarouselContent className="h-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="h-full w-full"
            >
              <img
                src={"/assets/hotel.png"}
                alt=""
                className="rounded h-full max-h-full"
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
    // <div className="rounded-sm relative  w-[300px] h-[300px]">
    //   <Carousel
    //     opts={{
    //       loop: true,
    //     }}
    //     plugins={[plugin.current]}
    //     onMouseEnter={plugin.current.stop}
    //     onMouseLeave={plugin.current.play}
    //     className="w-[300px]  rounded-sm relative h-full"
    //   >
    //     <CarouselContent className="bg-primary100">
    //       <CarouselItem className="flex justify-center max-h-[4s00px] items-center bg-gray-100/70">
    //         <Image
    //           fill
    //           className="rounded-[4px] w-full object-cover max-h-[300px] object-top"
    //           src="/assets/trip-planner/fountain.jpg"
    //           alt=""
    //         />
    //       </CarouselItem>
    //       <CarouselItem className="flex justify-center max-w-[4s00px] items-center bg-gray-100/70">
    //         <Image
    //           fill
    //           className="rounded-[4px] w-full object-cover max-h-[300px] object-top"
    //           src="/assets/trip-planner/gallery.jpg"
    //           alt=""
    //         />
    //       </CarouselItem>
    //     </CarouselContent>
    //     {/* Next & Previous Button */}
    //     <div className="absolute bottom-4 flex justify-center w-48">
    //       <div className="flex md:gap-8 gap-6 bg-white/20 backdrop-blur-md px-2 py-px rounded-sm">
    //         <CarouselPrevious />
    //         <CarouselNext />
    //       </div>
    //     </div>
    //   </Carousel>
    // </div>
  );
};
