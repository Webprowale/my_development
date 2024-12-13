"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Buildings,
  CalendarBlank,
  MapPin,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import React, { useEffect, useState } from "react";
import { addDays, format, parse } from "date-fns";
import { object } from "zod";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "../calender-range/DatePickerWithRange";
import { useTripStore } from "@/store/useTripStore";
import { DestinationSelect } from "@/app/gopal/components/page-search/destination-select";

const TripInput = ({ open }: { open: () => void }) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [isValid, setIsValid] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const { createTripDetails, setCreateTripDetails } = useTripStore();

  const selectCount = (id: number) => {
    const result = demoCountries.filter((item) => item.id === id);
    console.log(result);

    if (result.length > 0) {
      // @ts-ignore
      setSelectedCountry(result[0]); // Set first object from filtered array
    } else {
      setSelectedCountry(null); // Set to null if no object found
    }
  };

  // this convert from and to date for the API
  const convertDate = (data: string) => {
    const formattedDate = format(data, "dd-MM-yyyy");

    return formattedDate;
  };

  const clearInput = () => {
    setIsValid(false);
    setSelectedCountry(null);
    setDate({
      from: undefined,
      to: undefined,
    });
  };

  useEffect(() => {
    try {
      // if the date is not empty
      if (typeof date?.from === "object" && typeof date?.to === "object") {
        setIsValid(true);
      }
      // if the date is empty
      // @ts-ignore
      if (date?.from === "" && date?.to === "") {
        setIsValid(false);
      }
      // if the date is empty
      if (date === undefined) {
        setIsValid(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [date]);

  return (
    <section className="trip-input w-full md:w-[60%] relative z-10 bg-white p-2 rounded grid grid-cols-3 gap-2">
      <div className="city">
        <Popover
          open={isInputOpen}
          onOpenChange={setIsInputOpen}
        >
          <PopoverTrigger asChild>
            <div className="city-trigger flex items-center gap-2 bg-[#F9FAFB] border border-[#E4E7EC] px-4 py-8 rounded cursor-pointer">
              <MapPin
                size={28}
                className="text-[#667185]"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-[#647995] text-sm">Where to?</h3>
                <p className="font-black capitalize text-[#647995]">
                  {/* @ts-ignore */}
                  {selectedCountry?.cityName || "Select a country"}
                </p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-[500px] p-4"
            align="start"
          >
            <div className="w-full bg-white">
              <header className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-[#647995]">Please select a city</h3>
              </header>

              {/* search field */}
              <Input className="min-h-[55px] rounded w-full block" />

              {/* Search result */}
              <div className="flex flex-col gap-2 mt-8 overflow-auto h-[200px] scrollbar-none relative">
                {demoCountries.map((count: any, index: number) => (
                  <CityResult
                    id={count.id}
                    city={count.cityName}
                    country={count.country}
                    selectCountry={selectCount}
                    key={index}
                    closePop={setIsInputOpen}
                  />
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="start">
        <Popover>
          <PopoverTrigger asChild>
            <div className="city-trigger flex items-center gap-2 bg-[#F9FAFB] border border-[#E4E7EC] px-4 py-8 rounded cursor-pointer">
              <CalendarBlank
                size={28}
                className="text-[#667185]"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-[#647995] text-sm">Start Date</h3>
                <p className="font-black capitalize text-[#647995]">
                  {date?.from ? format(date.from, "LLL dd, y") : "Enter Date"}
                </p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto"
            align="start"
          >
            <Calendar
              initialFocus
              mode="range"
              //@ts-ignore
              defaultMonth={date?.from}
              fromMonth={new Date()}
              //@ts-ignore
              selected={date}
              //@ts-ignore
              onSelect={setDate}
              numberOfMonths={2}
              captionLayout="dropdown-buttons"
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="end">
        <Popover>
          <PopoverTrigger asChild>
            <div className="city-trigger flex items-center gap-2 bg-[#F9FAFB] border border-[#E4E7EC] px-4 py-8 rounded cursor-pointer">
              <CalendarBlank
                size={28}
                className="text-[#667185]"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-[#647995] text-sm">End Date</h3>
                <p className="font-black capitalize text-[#647995]">
                  {/* {`${date?.to}` || "Enter Date"} */}
                  {date?.to ? format(date.to, "LLL dd, y") : "Enter Date"}
                </p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto"
            align="start"
          >
            <Calendar
              initialFocus
              mode="range"
              //@ts-ignore
              defaultMonth={new Date()}
              //@ts-ignore
              selected={date}
              //@ts-ignore
              onSelect={setDate}
              numberOfMonths={2}
            />
            {/* <DatePickerWithRange /> */}
          </PopoverContent>
        </Popover>
      </div>

      <Button
        variant={"default"}
        className="hover:bg-primary700 rounded col-span-3"
        onClick={() => {
          setCreateTripDetails({
            destination: selectedCountry?.cityName,
            startDate: convertDate(String(date.from)),
            endDate: convertDate(String(date.to)),
          });

          open();
        }}
        disabled={!isValid}
      >
        Create a trip
      </Button>
    </section>
  );
};

const CityResult = ({
  id,
  city,
  country,
  selectCountry,
  closePop,
}: {
  id: number;
  city: string;
  country: string;
  selectCountry: (id: number) => void;
  closePop?: (value: boolean) => void;
}) => {
  return (
    <div
      className="flex items-center gap-4 cursor-pointer hover:bg-primary100 rounded p-2"
      onClick={() => {
        selectCountry(id);
        closePop(false);
      }}
    >
      <Buildings
        size={20}
        weight="fill"
        className="text-[#667185]"
      />
      <div className="text">
        <h3 className="font-black text-[#1D2433]">{city}</h3>
        <p className="text-sm text-[#676E7E]">{country}</p>
      </div>

      <div className="flag ml-auto">
        <Image
          src={"/assets/usa.svg"}
          width={50}
          height={30}
          className="w-[50px] h-[30px]"
          alt=""
        />
        <p className="text-sm text-[#676E7E] mt-1">US</p>
      </div>
    </div>
  );
};

const demoCountries = [
  {
    id: 1,
    cityName: "Los Angeles",
    country: "USA",
  },
  {
    id: 2,
    cityName: "Lagos",
    country: "NGN",
  },
  {
    id: 3,
    cityName: "Lagos",
    country: "PORTUGAL",
  },
  {
    id: 4,
    cityName: "Zurich",
    country: "GER",
  },
];
export default TripInput;
