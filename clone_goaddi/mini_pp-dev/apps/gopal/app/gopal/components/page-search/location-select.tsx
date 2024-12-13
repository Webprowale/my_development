"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Icons } from "@/components/icons";
import { Flex } from "@/components/ui/flex";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { searchAirports } from "@/axios/endpoints/flights.endpoint";
import { getHotelDestinations } from "@/axios/endpoints/hotel.endpoint";

export interface ILocationOptions {
  value: string;
  label: string;
  code: string;
  cityCountry: string;
  airportWithCode: string;
  flag?: string;
}

interface PropTypes {
  setValue: React.Dispatch<
    React.SetStateAction<ILocationOptions | FlightLocations | any | undefined>
  >;
  label?: string;
  placeholder?: string;
  apiFor?: "hotels" | "flights" | "activities";
  value: ILocationOptions | undefined | any;
  searchPrompt?: string;
  classNames?: string;
}

export interface IAirports {
  code: string;
  label: string;
  value: string;
}

type FlightLocations = {
  id: string;
  country: string;
  title: string;
};

// const locations: ILocationOptions[] = [
//   {
//     location: "El Calafate, Argentina",
//     airport: "El Calafate",
//     id: 0,
//     flag: "",
//   },
//   {
//     location: "Lagos, Nigeria",
//     airport: "Muritala Muhammed",
//     id: 1,
//     flag: "",
//   },
//   {
//     location: "El Calafate, Argentina",
//     airport: "El Calafate",
//     id: 2,
//     flag: "",
//   },
//   {
//     location: "Lagos, Nigeria",
//     airport: "Muritala Muhammed",
//     id: 3,
//     flag: "",
//   },
// ];

export function LocationSelect({
  setValue,
  value,
  label,
  apiFor,
  placeholder,
  searchPrompt,
  classNames,
}: PropTypes) {
  const [isFetching, setIsFetching] = React.useState(false);
  const [locationList, setLocationList] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");

  async function handleContentFocus(search: string) {
    //     TODO: Logic to fetch locations
    setSearch(search);

    switch (apiFor) {
      case "flights":
        // Perform action for Flights
        setIsFetching(true);
        const results = await searchAirports({
          search,
        });

        console.log("Results", results.data[0].airports);
        console.log("Value", value);

        setIsFetching(false);
        setLocationList(results.data[0].airports ?? []);
        break;
      default:
        // Default action
        console.log("No option selected");
    }
  }

  return (
    <div className={cn("relative", classNames)}>
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <PopoverTrigger asChild>
          <Flex
            gap={1}
            role="button"
            className="border border-neutral400 rounded pl-5 w-full h-[86px] md:max-w-[900px] md:h-full max-h-[100px] bg-gray-100"
          >
            <Icons.location />
            <Flex
              col
              className="items-start"
            >
              <p className="text-xs font-medium capitalize label text-text-secondary">
                {label || "from"}
              </p>
              {value && value.code && apiFor === "flights" ? (
                <Flex col className="items-start">
                  <h3 className="text-sm font-bold text-text-secondary">
                    {value?.cityCountry}
                  </h3>
                  <p className="text-xs font-medium capitalize text-text-secondary">
                    {value?.airportWithCode}
                  </p>
                </Flex>
              ) : (
                <h3 className="text-sm font-bold text-text-secondary">
                  {placeholder || "Select City"}
                </h3>
              )}
            </Flex>
          </Flex>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          // onOpenAutoFocus={handleContentFocus}
          className="p-2 w-[400px] -mt-[100px]"
        >
          <Command className="space-y-2">
            <p className="text-sm font-medium text-text-secondary">
              {searchPrompt || "Start typing to search for airports or cities."}
            </p>
            <CommandInput
              value={search}
              onValueChange={(search) => handleContentFocus(search)}
              className="p-3 rounded-[4px] border-[2px] border-primary"
              placeholder="Enter name of city or airport"
            />
            <CommandList>
              <CommandEmpty>
                {isFetching ? "fetching locations.." : "No location found."}
              </CommandEmpty>

              {/* list of Flights */}
              {apiFor === "flights" && (
                <CommandGroup className="p-0">
                  {locationList.map((location: any) => {
                    const [cityCountry, airportWithCode] =
                      // @ts-ignore
                      location?.value?.split(" - ");
                    return (
                      <CommandItem
                        // @ts-ignore
                        value={location?.value}
                        // @ts-ignore
                        key={location?.code}
                        className="mt-2"
                        onSelect={() => {
                          //   TODO: logic to select location to state

                          setValue({
                            // @ts-ignore
                            ...location,
                            cityCountry,
                            airportWithCode,
                          });

                          console.log(location);
                          setIsOpen(false);
                        }}
                      >
                        <Flex between className="w-full">
                          <Flex gap={3}>
                            <Icons.flightLocation />

                            <Flex col className="items-start">
                              <h3 className="font-bold text-text">
                                {cityCountry}
                              </h3>
                              <p className="text-sm font-medium text-text-secondary">
                                {airportWithCode}
                              </p>
                            </Flex>
                          </Flex>

                          <Flex col className="items-start">
                            {/* <Image
                        src={"/assets/usa.svg"}
                        width={50}
                        height={30}
                        className="w-[50px] h-[30px]"
                        alt=""
                      /> */}
                            <p className="text-text-secondary">US</p>
                          </Flex>
                        </Flex>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

{
  /* <Image
                        src={"/assets/usa.svg"}
                        width={50}
                        height={30}
                        className="w-[50px] h-[30px]"
                        alt=""
                      /> */
}
