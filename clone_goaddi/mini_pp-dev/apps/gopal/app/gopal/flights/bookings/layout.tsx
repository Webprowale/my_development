"use client";
import React, { ReactNode, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import BookTitle from "../../trip-planner/trip-booking-flow/components/title";
import PriceDetails from "../components/price-details";
import { useMediaQuery } from "react-responsive";
import { Progress } from "@/components/ui/progress";

const TravelBookingLayout = ({ children }: any) => {
  const mode = useSearchParams();

  const currentStep = mode.get("step");

  const isActiveStep = (stepHref: string) => {
    const currentStepIndex = tripbooking.findIndex(
      (step) => step.href === currentStep,
    );
    const targetStepIndex = tripbooking.findIndex(
      (step) => step.href === stepHref,
    );
    return targetStepIndex < currentStepIndex;
  };
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  return (
    <div className="bg-white w-full rounded-sm ">
      <div className="flex justify-between items-start">
        <div className="flex max-w-6xl w-full flex-col pl-4 pr-2 py-4 border-r border-r-gray-200 h-full">
         <div className="flex items-start justify-between  md:block">
         <div className="">
            <BookTitle title={!isDesktopOrLaptop?'Traveller Information':''}/>
          </div>

          <div className="mt-4">
            {
              isDesktopOrLaptop?
              <div className="flex border border-slate-200 rounded-md w-fit">
              {tripbooking?.map((booking) => {
                const { id, name, href } = booking;

                const active = isActiveStep(href);
                return (
                  <Link
                    href={`/gopal/flights/bookings?step=${href}`}
                    className="p-3"
                  >
                    <div className="flex items-center gap-2">
                      {active ? (
                        <div className="text-xs rounded-full text-[9px] bg-primary600 w-5 h-5 flex justify-center items-center">
                          <Check size={12} className="text-white" />
                        </div>
                      ) : (
                        <div className="text-xs rounded-full text-[9px] border-gray-600 border w-5 h-5 flex justify-center items-center">
                          {id}
                        </div>
                      )}
                      <p
                        className={cn(
                          "text-xs font-semibold",
                          active ? "text-primary600" : "text-black",
                        )}
                      >
                        {name}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>:''
            }

            <div 
            // style={{'border':'1px solid red',}}
             className="w-[100px] translate-y-[-30px] md:hidden	">
            <p>
              Step 1 out of 3
            </p>
            <Progress
            // status={'pending'}
            value={30} 
            className="h-[10px] mt-[8px] " />
            </div>
          </div>
         </div>

          <Suspense>{children}</Suspense>
        </div>
        <div className="hidden md:block">{currentStep !== "confirmation" ? <PriceDetails /> : null}</div>
      </div>
    </div>
  );
};

export default TravelBookingLayout;

const tripbooking = [
  {
    id: "1",
    name: "Traveller Information",
    href: "information",
  },
  {
    id: "2",
    name: "Review and Confirmation",
    href: "review",
  },
  {
    id: "3",
    name: "Secure Payment",
    href: "payment",
  },
  {
    id: "4",
    name: "Booking Confirmation",
    href: "confirmation",
  },
];
