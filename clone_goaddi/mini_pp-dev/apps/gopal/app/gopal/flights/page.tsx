"use client";

import React, { useState } from "react";
import FaqAccordion from "@/components/ui/faq-accordion";
import SectionLayout from "@/components/ui/section-layout";
import Tips from "@/components/ui/tips-carousel";
import { faqList, tips } from "./components/dummy";
import PageSearch, { SearchBar } from "../components/page-search";
import { FeaturedFlightCard } from "./components/featured-flight-card";
import {
  ILocationOptions,
  LocationSelect,
} from "../components/page-search/location-select";
import { DateSelect } from "../components/page-search/date-select";
import { PassengerSelect } from "../components/page-search/passengers-select";
import { Flex } from "@/components/ui/flex";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useMediaQuery } from 'react-responsive'

const Flights = () => {
  const [fromLocation, setFromLocation] = useState<ILocationOptions>();
  const [toLocation, setToLocation] = useState<ILocationOptions>();
  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [returnDate, setReturnDate] = useState<Date>(new Date());
  const [passengers, setPassengers] = React.useState<string>("");
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const router = useRouter();

  async function handleSearch() {
    // TODO: LOGIC TO CONVERT DATA INTO QUERY STRING
    console.log(
      fromLocation,
      toLocation,
      departureDate,
      returnDate,
      passengers,
    );

    if (fromLocation && toLocation) {
      router.push(
        `/gopal/flights/search?triptype=S&cabin=Y&from=${fromLocation.value}&to=${toLocation.value}&departDate=${formatDateString(departureDate)}&returnDate=&adults=1&childs=0&infants=0}`,
      );
    }
  }

  function handleSwap() {
    setToLocation(fromLocation);
    setFromLocation(toLocation);
  }

  return (
    <main className="mb-8 space-y-6">
      <PageSearch
        pageTitle={"flight"}
        pageDescription={
          "Navigate your journey with ease - Find the perfect flight to suit your travel needs and embark on your next adventure hassle-free."
        }
        backgroundImage="/assets/flight/flight-background.png"
        tabComponent={<FlightTabs />}
      >
       <SearchBar handleSearch={handleSearch}>
          <div className=" w-full h-full flex flex-col gap-1 md:grid md:grid-cols-5 md:gap-1">
            <div className="flex gap-[0.5rem] flex-col relative md:grid md:grid-cols-2 md:col-span-2 md:gap-1">
              <Icons.switchBtn
                onClick={handleSwap}
                className="hidden md:block absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              />
             {/* <div className="w-[100%] h-[100%]"> */}
             <LocationSelect
                setValue={setFromLocation}
                value={fromLocation}
                apiFor="flights"
                label="from"
              />
             {/* </div> */}
            {/* <div className="w-[100%]"> */}
            <LocationSelect
                setValue={setToLocation}
                value={toLocation}
                apiFor="flights"
                label="to"
              />
            {/* </div> */}
            </div>
        

{
  isDesktopOrLaptop?// react responsive was a last resort to seprate the desktop from the mobile view cause of use of grid
  <>
  <DateSelect setValue={setDepartureDate} value={departureDate} />
            <DateSelect
              setValue={setReturnDate}
              value={returnDate}
              label="Return Date"
            /></>:
            <div className="flex gap-[0.5rem] md:hidden">
            <DateSelect setValue={setDepartureDate} value={departureDate} />
            <DateSelect
              setValue={setReturnDate}
              value={returnDate}
              label="Return Date"
            />
            </div>

}
            
            <PassengerSelect setValue={setPassengers} value={passengers} />
          </div>
        </SearchBar>
      </PageSearch>

      <SectionLayout
        title={"Featured Flights from Lagos"}
        description={"Find your perfect flight and get ready to jet set! ✈️"}
      >
        <div className=" w-full flex flex-wrap gap-[1.25rem] justify-center items-center md:grid md:grid-cols-4 md:gap-2">
          {Array(10)
            .fill(1)
            .map((index) => (
              <FeaturedFlightCard key={index} />
            ))}
        </div>
      </SectionLayout>

      <Tips
        tipsList={tips}
        sectionTitle={"Travel Tips"}
        sectionSubtitle={"Tips for comfortable and eligible flights ✈️"}
      />

      <FaqAccordion faqList={faqList} />
    </main>
  );
};

const FlightTabs = () => {
  return (
    <Flex
      gap={2}
      className="w-[100%] h-[80px] top-[-79px] absolute left-0 md:w-auto p-3 font-semibold text-white capitalize rounded-t bg-white/20 md:-top-16 md:h-[unset]"
      //
    >
      <div
        className={cn(
          "w-[100%] text-center p-2 px-3  rounded hover:text-primary md:w-[unset]",
          true && "bg-white text-primary",
        )}
      >
        one way
      </div>
      <div className="w-[100%] p-2 px-3  text-center rounded hover:text-primary md:w-[unset]">round trip</div>
      <div className=" w-[100%] p-2 px-3   text-center rounded hover:text-primary md:w-[unset]">multi city</div>
    </Flex>
  );
};

export default Flights;

function formatDateString(dateString: Date) {
  // Step 1: Parse the date string into a Date object
  const date = new Date(dateString);

  // Step 2: Extract the year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1 and pad with 0 if necessary
  const day = String(date.getDate()).padStart(2, "0"); // Pad with 0 if necessary

  // Step 3: Format the date into YYYY-MM-DD
  return `${year}-${month}-${day}`;
}
