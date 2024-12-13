import React from "react";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { IoStar } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { GiSelfLove } from "react-icons/gi";
import { PiCurrencyNgnBold } from "react-icons/pi";
import { Heart, ShareFat } from "@phosphor-icons/react";

type LibertyType = {
  activityName: string;
  departureAndReturn: string;
  adultPrice: number;
  meetUpPoint: string;
}

export default function Liberty({activityName, departureAndReturn, adultPrice, meetUpPoint}: LibertyType) {
  return (
    <div className="container-fluid mt-3 mx-2 py-2">
      <div className="grid sm:grid-cols-12">
        <div className="col-span-8">
          <div className="flex flex-col">
            <h3 className="font-extrabold text-2xl mb-2">{activityName}</h3>
            <p className="text-base font-semibold mb-5">{departureAndReturn}</p>
            <div className="sm:flex">
              <div className="flex-2">
                <div className="border border-gray-500 border-solid sm:p-3 px-6 flex rounded-sm">
                  <Link
                    href={`https://www.google.com/maps/place/${meetUpPoint}`}
                  >
                    <h6 className="text-[1rem] sm:text-nowrap my-auto sm:my-0 text-blue-500 border-e sm:pe-3 items-center p-0 font-semibold border-black border-solid flex-1 sm:flex">
                      <CiLocationOn className="text-[2rem]" />
                      Show in map
                    </h6>
                  </Link>

                  <h6 className="text-[1rem] sm:text-nowrap my-auto sm:my-0 text-gray-500 ps-2 border-e sm:pe-3 items-center p-0 font-semibold border-black border-solid flex-1 sm:flex">
                    <span className="text-yellow-500">
                      <IoStar className="text-[2rem]" />
                    </span>{" "}
                    8.5(436)
                  </h6>
                  <h6 className="text-[0.9rem] sm:text-nowrap my-auto sm:my-0 text-gray-500 sm:pe-3 ps-2 items-center p-0 font-semibold border-black border-solid flex-1 sm:flex">
                    <span className="">
                      <FaClock className="text-[2rem] me-2" />
                    </span>
                    45minutes to 1 hour
                  </h6>
                </div>
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 sm:w-auto w-[100%] text-white font-bold py-2 px-4 rounded-sm sm:ms-2 my-3 sm:my-0">
                Check Avaiability
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex sm:justify-end gap-4">
            <button className="border border-solid border-gray-500 font-semibold hover:text-white flex gap-1 items-center hover:bg-blue-700 py-1.5 px-4  rounded-md">
              <ShareFat size={32} /> Share
            </button>

            <button className="border border-solid border-gray-500  font-semibold hover:text-white flex gap-1 items-center hover:bg-blue-700 py-1.5 px-6  rounded-md">
              <Heart size={32} /> Add to Wishlist
            </button>
          </div>
          <div className="flex sm:justify-end sm:me-8 mt-6">
            <div className="flex">
              <h6 className="text-gray-500 font-semibold text-[1rem]">From</h6>
              <h3 className="flex items-center text-[1.4rem] font-semibold">
                <PiCurrencyNgnBold size={25} className="sm:ms-3" />
                {adultPrice?.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
