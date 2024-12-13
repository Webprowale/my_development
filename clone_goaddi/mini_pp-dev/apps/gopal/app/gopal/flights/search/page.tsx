"use client";

import React, { useEffect, useState } from "react";
import PageHeader, { SearchBar } from "../../components/page-search";
import { Flex } from "@/components/ui/flex";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import DateCarousel from "../components/date-carousel";
import FlightsResultCard from "../components/flight-result-card";
import {
  ILocationOptions,
  LocationSelect,
} from "../../components/page-search/location-select";
import { DateSelect } from "../../components/page-search/date-select";
import { PassengerSelect } from "../../components/page-search/passengers-select";
import { FiSearch } from "react-icons/fi";
import { useSearchParams, usePathname } from "next/navigation";
import { searchFlights } from "@/axios/endpoints/flights.endpoint";
import ResultFilter from "@/components/ResultFilter";
import { useMediaQuery } from "react-responsive";

const FilterFlights = () => {
  const pathName = usePathname();
  const [flightResults, setFlightResults] = useState([]);
  const [fromLocation, setFromLocation] = useState<any>();
  const [toLocation, setToLocation] = useState<any>();
  const [departureDate, setDepartureDate] = useState<any>();
  const [returnDate, setReturnDate] = useState<any>();
  const [passengers, setPassengers] = React.useState<string>("");

  const tripType = useSearchParams().get("triptype") ?? "";
  const cabin = useSearchParams().get("cabin") ?? "";
  const from = useSearchParams().get("from") ?? "";
  const to = useSearchParams().get("to") ?? "";
  const departDate = useSearchParams().get("departDate") ?? "";
  const returnnDate = useSearchParams().get("returnDate") ?? "";
  const adults = useSearchParams().get("adults") ?? "";
  const childs = useSearchParams().get("childs") ?? "";
  const infants = useSearchParams().get("infants") ?? "";

  function handleSearch() {
    // TODO: LOGIC TO CONVERT DATA INTO QUERY STRING
    console.log(
      fromLocation,
      toLocation,
      departureDate,
      returnDate,
      passengers,
    );
  }

  useEffect(() => {
    // console.log(params);
    // setDepartureDate(departDate);
    // setReturnDate(returnnDate);
    // setFromLocation(from);
    // setToLocation(to);

    const searchFlight = async () => {
      const flightsResult = await searchFlights({
        tripType: "S",
        fromCity: from,
        toCity: to,
        departDate,
        returnDate: "",
        adults: "1",
        childs: "0",
        infants: "0",
        cabinClass: "Y",
      });
      console.log(flightsResult.data[0].results);
      setFlightResults(flightsResult.data[0].results);
    };

    searchFlight();
  }, []);
  function handleSwap() {
    setToLocation(fromLocation);
    setFromLocation(toLocation);
  }

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  return (
    <main className="w-auto mb-8 space-y-6 filter_flights">
      <PageHeader
        pageTitle={"Search Result"}
        backgroundImage="/assets/flight/filter-bg.png"
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
      </PageHeader>

      <DateCarousel />

      <section className="relative grid w-auto grid-cols-12 gap-x-4">
        <div className="relative w-auto col-span-12">
          <Flex between>
            <div className="grid gap-1">
              <h3 className="text-base font-bold">Top Flights</h3>
              <p className="text-sm">
                Prioritizing affordability and ease 🎯💡
              </p>
            </div>

            <h3 className="text-base font-bold">Showing 40 Flight Results</h3>
          </Flex>

          <section className="relative w-full h-auto mt-4 space-y-3">
            {/* {Array(7)
              .fill(1)
              .map((_, index) => (
                <FlightsResultCard key={index} />
              ))} */}

            {flightResults.length &&
              flightResults?.map((f: any, index) => {
                const flight = f.onewaydata[0];
                return (
                  <FlightsResultCard
                    // flightResults={flightResults}
                    flight={flight}
                    key={index}
                  />
                );
              })}
          </section>
        </div>

        {/* TODO: FILTER COMPONENT */}
        <div className="sticky w-auto h-screen col-span-3 top-11">
          <Flex className="justify-end">
            <Button
              asChild
              className="capitalize bg-white border border-neutral-300 text-text"
            >
              <Flex gap={1}>
                <Icons.sortIcon />
                <p>sort by: All</p>
              </Flex>
            </Button>
          </Flex>

          <section className="w-full h-[500px] relative bg-white mt-5">
            <ResultFilter
              onChange={(recentUpdatedData: any) => {
                console.log({ ResultFilter: recentUpdatedData });
              }}
              schema={[
                {
                  name: "Stops",
                  data: [
                    "Any number of stop",
                    "Nonstop only",
                    "1 Stop",
                    "2 Stops",
                  ],
                  schemaType: "SelectMultipleTabs",
                },
                {
                  name: "Price Range",
                  schemaType: "minmax",
                  data: [], //
                },
                {
                  name: "Cabin",
                  data: [
                    { id: "1", label: "Economy", value: "40" },
                    { id: "2", label: "Premium Economy", value: "50" },
                    { id: "3", label: "Business Class", value: "120" },
                    { id: "4", label: "First Class", value: "10" },
                  ],
                  schemaType: "RadioTabs",
                },
                {
                  name: "Airlines",
                  data: [
                    { id: "1", label: "All", value: "" },
                    { id: "2", label: "Air Canada", value: "₦ 1,193,383.00" },
                    { id: "3", label: "Air China", value: "₦ 1,193,383.00" },
                    {
                      id: "4",
                      label: "Alaska Airlines",
                      value: "₦ 1,193,383.00",
                    },
                    {
                      id: "5",
                      label: "ANA (All Nippon Airways)",
                      value: "₦ 1,193,383.00",
                    },
                    {
                      id: "6",
                      label: "Austrian Airlines",
                      value: "1,193,383.00",
                    },
                  ],
                  schemaType: "SelectCheckBoxTabs",
                },
              ]}
            />
          </section>
        </div>
      </section>
    </main>
  );
};

export default FilterFlights;

function convertToDateObject(formattedDateString: string) {
  if (formattedDateString) {
    // Step 1: Parse the formatted date string into components
    const [year, month, day] = formattedDateString.split("-").map(Number);

    // Step 2: Construct a new Date object with these components
    const date = new Date(year, month - 1, day); // Month is 0-based, so subtract 1

    // Step 3: Retrieve day of the week, month name, and time
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      date.getDay()
    ];
    const monthName = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][date.getMonth()];
    const time = date.toLocaleTimeString("en-US", { hour12: false });

    // Step 4: Format into the desired date string format
    return `${dayOfWeek} ${monthName} ${day} ${year} ${time} GMT${date.getTimezoneOffset() > 0 ? "-" : "+"}${Math.abs(
      date.getTimezoneOffset() / 60,
    )
      .toString()
      .padStart(
        2,
        "0",
      )}${(date.getTimezoneOffset() % 60).toString().padStart(2, "0")}`;
  }
}
