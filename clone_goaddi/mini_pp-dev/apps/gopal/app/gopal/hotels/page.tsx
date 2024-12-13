"use client";

import { ActivitiesHeaderInfo } from "../activities/activities-header-info";
import { CiCalendar, CiLocationOn } from "react-icons/ci";

import { PiUsersLight } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { MdVerifiedUser } from "react-icons/md";
import FeaturedHotels from "./components/featured-hotels";
import HotelTipsSection from "./components/HotelTipsSection";
import HotelTopDesitinations from "./components/hotel-topdesitinations";

import FAQs from "./components/faqsHotels";
import { SearchBar } from "../components/page-search";
import { DateSelect } from "../components/page-search/date-select";
import {
  ILocationOptions,
  LocationSelect,
} from "../hotels/components/page-search/location-select";
import { PassengerSelect } from "../hotels/components/page-search/passengers-select";
import React, { useState } from "react";
import { nightsBetweenDates } from "@/utils";
import { useRouter } from "next/navigation";
import { useHotelStore } from "@/store/useHotelStore";

type PassengerTypes = {
  adult: number;
  child: number;
  rooms: number;
};

const HotelsPage = () => {
  const [fromLocation, setFromLocation] = useState<ILocationOptions>();
  const [toLocation, setToLocation] = useState<ILocationOptions>();
  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [returnDate, setReturnDate] = useState<Date>(new Date());
  const [passengers, setPassengers] = useState<PassengerTypes>();
  const router = useRouter();
  const { loading, setLoading } = useHotelStore();

  function handleSearch() {
    setLoading(true);
    // TODO: LOGIC TO CONVERT DATA INTO QUERY STRING
    // console.log(departureDate, returnDate, passengers, fromLocation);

    // this is when the user will lodge and also leave the hotel
    const startDate = departureDate.toISOString().split("T")[0];
    const endDate = returnDate.toISOString().split("T")[0];

    // The number of night(s) between the when they lodge and
    // leave the hotel accomodation
    const nights = nightsBetweenDates(startDate, endDate);

    const searchUrl = `/gopal/hotels/search?destination=${fromLocation?.title}&start=${startDate}&end=${endDate}&adult=${passengers?.adult}&child=${passengers?.child}&rooms=${passengers?.rooms}&nights=${nights}`;

    // push user to this route
    router.push(searchUrl);

    setLoading(false);
  }

  return (
    <div className="space-y-6 mb-8">
      {/* <div className="h-[50px] bg-white text-[#676E7E]"></div> */}
      <section className="header p-4 h-full w-full flex flex-col gap-16">
        <div className="text-white w-2/6">
          <h3 className="font-bold text-2xl mb-2">Hotels</h3>
          <p className="text-xs">
            Unwind and explore. Find your perfect stay - Discover hotels to suit
            your travel style and budget, for a seamless and relaxing start to
            your adventure.
          </p>
        </div>

        <div className=" p-6 bg-primary100 ">
          <SearchBar handleSearch={handleSearch}>
            <div className="grid w-full h-full grid-cols-5 gap-1 z-20">
              <div className="relative grid grid-cols-1 col-span-2 gap-1">
                <LocationSelect
                  setValue={setFromLocation}
                  value={fromLocation}
                  label="Destination"
                  searchPrompt="Start typing to search for cities."
                  apiFor="hotels"
                />
              </div>

              <DateSelect
                setValue={setDepartureDate}
                value={departureDate}
                label="From Date"
              />
              <DateSelect
                setValue={setReturnDate}
                value={returnDate}
                label="To Date"
              />
              <PassengerSelect
                setValue={setPassengers}
                value={passengers}
                label="Guest and Rooms"
              />
            </div>
          </SearchBar>

          {/* <div className="w-full flex justify-between mt-4 mb-4">
            <p className="flex items-center gap-1">
              <MdVerifiedUser />
              <span>We guarantee the best value on your choice</span>
            </p>

            <p className="flex items-center gap-1">
              <span>Provided by </span>
              <img
                src="https://api.blog.shordem.hndwok.com/v1/media/ba3d8344-db20-4527-b7d1-c503c8f923bb.png/"
                alt="flight image"
              />
            </p>
          </div> */}
        </div>
      </section>

      <FeaturedHotels />
      <HotelTipsSection />
      <HotelTopDesitinations />
      <FAQs />
    </div>
  );
};

export default HotelsPage;
