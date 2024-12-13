import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { MyTripType } from "@/interfaces";

const MyTrip = ({
  id,
  name = "Bahamas Family Trip",
  description = "Creating Memories in the Bahamas with my family",
  tag = "Last visited 5 hours ago",
  isAccepted = true,
  peopleCount,
  peopleData,
  tripType,
}: MyTripType) => {
  return (
    <div className="trip border-b flex items-center justify-between px-5 py-10 border-b-[#E4E7EC] last-of-type:border-b-0 last-of-type:border-b-transparent">
      <div className="flex items-start gap-3 w-[70%]">
        <img
          src="/assets/trip-timeline/trip-image.png"
          alt=""
          className="w-[120px] h-[112px] rounded "
        />
        <div className="flex flex-col gap-1 w-[80%]">
          <span className="inline-block w-max capitalize bg-[#F0F2F5] py-2 px-4 text-xs text-[#676E7E] rounded font-medium">
            {tag}
          </span>
          <h3
            className="font-bold text-lg line-clamp-1"
            title={name}
          >
            <Link href={`/gopal/trip/${id}`}>{name}</Link>
          </h3>
          <p className="text-sm text-[#676E7E] line-clamp-2">{description}</p>
        </div>
      </div>

      {isAccepted ? (
        <>
          {/* This element will be shown when a request has been accept or created */}
          <Link
            href={`/gopal/trip/${id}`}
            className="flex items-center border border-[#D0D5DD] p-2 gap-2 rounded"
          >
            {peopleData?.length > 0 && (
              <div className="img-group flex items-center">
                <img
                  src="/assets/trip-timeline/1.png"
                  alt=""
                  className="w-[30px] h-[30px] object-cover"
                />
                <img
                  src="/assets/trip-timeline/2.png"
                  alt=""
                  className="w-[30px] h-[30px] object-cover ml-[-12px]"
                />
                <img
                  src="/assets/trip-timeline/3.png"
                  alt=""
                  className="w-[30px] h-[30px] object-cover ml-[-12px]"
                />
                <img
                  src="/assets/trip-timeline/4.png"
                  alt=""
                  className="w-[30px] h-[30px] object-cover ml-[-12px]"
                />
              </div>
            )}
            {peopleCount > 0 && (
              <span className="text-sm text-[#676E7E] font-medium">
                {peopleCount} people
              </span>
            )}
            <ArrowRight
              size={24}
              className="text-[#343330]"
            />
          </Link>
        </>
      ) : (
        <>
          {/* request actions btns */}
          <div className="flex flex-col gap-2">
            <Button
              variant={"default"}
              className="bg-primary600 text-white hover:bg-primary700 rounded py-2 px-12 text-xs font-medium"
            >
              Accept
            </Button>
            <Button
              variant={"default"}
              className="bg-[#FBEAE9] text-[#9E0A05] hover:bg-[#ffdedc] font-medium rounded py-2 px-12 text-xs "
            >
              Reject
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyTrip;
