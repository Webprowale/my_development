"use client";
import React, { useState } from "react";

import { PlusCircle, Trash } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import GoButton, { GoAuthButton } from "@/components/goui/button";

// import PassengerModal from "../passenger-modal";
import Actions from "@/components/trip-planner/actions";
import Link from "next/link";
import TravellerInformation from "../forms/traveller-information";

type Props = {};
interface Traveler {
  id: number;
  traveller: string;
  travellerNum: number;
}

const TripBookingFlow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [travellers, setTravellers] = useState<Traveler[]>([
    { id: 1, traveller: "Adult", travellerNum: 1 },
  ]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleAddTraveler = (traveller: string, travellerNum: number) => {
    const newTraveler: Traveler = {
      id: travellers.length + 1,
      traveller,
      travellerNum: travellerNum,
    };
    setTravellers([...travellers, newTraveler]);
  };

  return (
    <>
      <div>
        {/* Traveller Information */}
        <div className="my-5 ">
          <div className="">
            <h2 className="font-semibold ">Traveller Information</h2>
            <p className="text-sm text-slate-500 font-medium max-w-sm">
              We need your details to confirm bookings and send you important
              trip updates
            </p>
          </div>
          <TravellerInformation
          key={1}
              travellerDetails={{'id':0,'traveller':'Somepeeps','travellerNum':0}}
            />
          {travellers.map((traveller,index) => (
            <TravellerInformation

              key={traveller.id+1}
              travellerDetails={{...traveller,'travellerNum':index+1}}
typeOfCardColorClass='bg-[#E7F6EC] text-[#04802E]'
            />
          ))}

         

          <Button
          onClick={()=>{
            handleAddTraveler('Some Quaku',travellers.length+1)
          }}
            // onClick={openModal}
            className="mt-1 w-full text-black bg-gray-100 inline-flex gap-2 py-2 items-center rounded-sm h-12 hover:bg-gray-200"
          >
            Add another traveller <PlusCircle size={18} />
          </Button>

          <div className="mt-10">
            <h4 className="text-black font-semibold">Add discount code</h4>
            <div className="mt-3">
              <label htmlFor="discount" className="text-sm w-full relative">
                Discount Code
                <span className="text-red-600 absolute -top-px -right-1.5 text-xs">
                  *
                </span>
              </label>

              <div className="flex gap-2">
                <Input
                  id="discount"
                  type="text"
                  className={cn(
                    "h-12 border border-gray-400 focus:border-2 focus:border-primary600 rounded-sm text-sm mt-px w-full",
                  )}
                  placeholder="Enter discount code"
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // autoFocus={label === "First Name" ? true : false}
                />
                <GoButton className="font-medium text-sm px-14 bg-primary100 border-primary100  text-primary600 hover:text-white hover:bg-primary600">
                  Apply
                </GoButton>
              </div>
            </div>
          </div>
        </div>

        {/* <PassengerModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleAddTraveler={handleAddTraveler}
        /> */}
      </div>
      {/* Continue  */}
      <Actions>
        <div className="">
          <p className="text-sm">
            By clicking "Continue", you confirm that you have read and agree to
            the GoPaddi{" "}
            <span className="text-primary600">
              booking terms and conditions.
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/gopal/trip-planner/trip-booking-flow?step=review">
            <Button className="bg-primary600 rounded text-white hover:bg-primary700 ease-linear duration-150 w-40">
              Continue
            </Button>
          </Link>
        </div>
      </Actions>
    </>
  );
};

export default TripBookingFlow;

const tripbooking = [
  {
    id: "1",
    name: "Traveller Information",
    href: "",
  },
  {
    id: "2",
    name: "Review and Confirmation",
    href: "",
  },
  {
    id: "3",
    name: "Secure Payment",
    href: "",
  },
  {
    id: "4",
    name: "Booking Confirmation",
    href: "",
  },
];
