import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePDF } from "react-to-pdf";
import Lottie from "react-lottie";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AirplaneInFlight,
  ArrowRight,
  Buildings,
  Chair,
  Info,
  Printer,
  Package
} from "@phosphor-icons/react";
import React from "react";
import {
  ActivitiesConfirmationCard,
  Flights,
  Hotels,
  VacationPacageCardForConfirmation,
} from "@/components/trip-planner/bookings/confirmation";
import congrats from "@/animations/lotties/congrats.json";

type Props = {};

const Confirmation = (props: Props) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: congrats,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    eventListeners: [
      {
        eventName: "complete",
        callback: () => {
          console.log("the animation completed:");
        },
      },
      {
        eventName: "loopComplete",
        callback: () => {
          console.log("the animation completed:");
        },
      },
    ],
  };

  return (
    <div ref={targetRef} className="">
      <div className="max-w-[630px] mx-auto">
        {!animationComplete ? (
          <div className="absolute flex justify-center top-10 items-center ">
            <Lottie
              speed={2000}
              options={defaultOptions}
              height={500}
              width={600}
            />
          </div>
        ) : null}
        <div className="text-center mt-3 mb-1">
          <h2 className="font-semibold">
            Congratulations! Your trip booking is confirmed!
          </h2>
          <p className="text-xs">
            Congratulations! You've officially booked your trip.
          </p>
        </div>
        <div className="my-3 flex justify-center items-center">
          <img
            src="/assets/payment-options/bags.svg"
            className="w-80 h-full"
            alt=""
          />
        </div>
        <p className="text-sm text-center font-medium">
          Great news, Your booking for your flight, hotel, and activities is
          confirmed! We're processing everything now, and you'll receive a
          confirmation email shortly containing all the details.
        </p>
            <br />
        <hr className="border-t border-gray-200 h-1 my-2" />
        <br />

        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold text-[15px]">
            Here's a quick rundown:
          </div>
          <div
            onClick={() => toPDF()}
            className="inline-flex gap-2 items-center text-sm leading-7 font-medium text-primary600 underline cursor-pointer hover:underline"
          >
            <Printer className="text-primary600" size={18} weight="fill" />
            Print Itinerary
          </div>
        </div>

        <div className="inline-flex gap-2 items-center text-sm leading-7 font-medium text-black mb-2">
          <Package className="text-black" size={18} weight="bold" />
          Vacation Package
        </div>

        {/* <Flights
          bookingId="L98SZAY"
          PNR="5TYW56"
          ETicketNum="123456742URY7"
          price="NGN 100,000.00"
          departure="Lagos - Singapore"
          depart=" LOS - Muritala Muhammed International Airport"
          departDate="Web May 01"
          departTime="08:00 - 10:00"
          departDuration="2Hrs 38mins"
          departAirline="American Airlines"
          layover="Gnassingbé Eyadéma International Airport (LFW)"
          layoverDate="  Web May 01"
          layoverTime="08:00 - 10:00"
          layoverDuration="2Hrs 38mins"
          layoverAirline="American Airlines"
          finalDestination="Singapore Changi Airport (SIN)"
        /> */}

        <VacationPacageCardForConfirmation 
                  bookingId="L98SZAY"
                  PNR="5TYW56"
                  price="NGN 100,000.00"
                  departure="Lagos - Singapore"
        />


        <div className="mb-10"></div>
      </div>
    </div>
  );
};

export default Confirmation;

export const CodeCard = ({
  code,
  title,
  type,
}: {
  code: string;
  title: string;
  type: string;
}) => {
  return (
    <div>
      <div className="max-w-52 w-full overflow-hidden border-r-[4px] border-b-[4px] border-primary300 rounded-2xl">
        <div className="max-w-52 w-full border-b-[4px] border-r-[6px] border-white rounded-full">
          <div className="w-48 rounded-2xl text-center">
            <div className="flex justify-center items-center bg-primary700 text-[12px] text-primary200 h-[36px] rounded-tr-2xl">
              {title}
            </div>
            <div className="bg-primary100 text-primary900 py-1.5 text-lg font-lg font-semibold">
              {code}
            </div>
            <div className="bg-primary700 flex justify-center items-center text-primary200 text-[11px] h-[36px] rounded-br-xl rounded-bl-2xl">
              <div className="inline-flex gap-1 items-center">
                <AirplaneInFlight
                  size={14}
                  weight="fill"
                  className="text-primary200"
                />
                {type}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const data = [
  {
    code: "4R6U98",
    title: "PNR CODE",
    type: "FLIGHT",
  },
  {
    code: "HK-1234",
    title: "HOTEL BOOKING ID",
    type: "HOTEL",
  },
  {
    code: "AC-5678",
    title: "ACTIVITY BOOKING ID",
    type: "ACTIVITY",
  },
];
