import React, { forwardRef, useRef } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { XCircle } from "@phosphor-icons/react";
import { FaRegTimesCircle } from "react-icons/fa";

const Covered = React.forwardRef(
  ({ coveredData }: { coveredData: any }) => (
    <div className="container flex flex-col px-3 ">
      <h5 className="font-bold text-[1.7rem] mt-3 ">What's Covered</h5>
      {coveredData?.map((cover: any, index: number) => (
        <div className="flex items-center gap-1">
          <div className="flex w-[35px]">
            <IoMdCheckmarkCircle className="text-[#0F973D] text-[25px]" />
          </div>
          <p className="font-satoshi text-base font-medium leading-6 tracking-tight text-left">
            {cover.description}
          </p>
        </div>
      ))} 
      {/* <h6 className="text-[1rem] font-semibold my-2">50-Minute Scenic Cruise</h6>
    <div className="flex items-center gap-1">
      <div className="flex" style={{ width: "35px" }}>
        <IoMdCheckmarkCircle className="text-[#0F973D] text-[25px]" />
      </div>
      <p className="font-satoshi text-base font-medium leading-6 tracking-tight text-left">
        Experience the excitement of a 50-minute sightseeing cruise around New
        York Harbor. Take in the refreshing sea breeze and soak up breathtaking
        views of the city skyline and iconic landmarks
      </p>
    </div>
    <h6 className="text-[1rem] font-semibold my-2">Live Guided Narration</h6>
    <div className="flex items-center gap-1">
      <div className="flex" style={{ width: "35px" }}>
        <IoMdCheckmarkCircle className="text-[#0F973D] text-[25px]" />
      </div>
      <p className="font-satoshi text-base font-medium leading-6 tracking-tight text-left">
        Commentary by an expert guide throughout the cruise, sharing interesting
        facts and history about the Statue of Liberty and other landmarks you
        might see.
      </p>
    </div>
    <h6 className="text-[1rem] font-semibold my-2">
      Close-Up Views of the Statue of Liberty
    </h6>
    <div className="flex items-center gap-1">
      <div className="flex" style={{ width: "35px" }}>
        <IoMdCheckmarkCircle className="text-[#0F973D] text-[25px]" />
      </div>
      <p className="font-satoshi text-base font-medium leading-6 tracking-tight text-left">
        Commentary by an expert guide throughout the cruise, sharing interesting
        facts and history about the Statue of Liberty and other landmarks you
        might see.
      </p>
    </div>
    <h6 className="text-[1rem] font-semibold my-2">Please Note</h6>
    <div className="flex items-center gap-2 pb-6 border-b">
      <div className="flex w-[35px]">
      
        <XCircle size={35} color="#D42620" weight="fill" className="" />
      </div>
      <p className="font-satoshi text-base font-medium leading-6 tracking-tight text-left">
        This cruise does not include access to Liberty Island or Ellis Island.
        Passengers will remain on the boat throughout the 50-minute tour.
      </p>
    </div> */}
    </div>
  ),
);

export default Covered;
