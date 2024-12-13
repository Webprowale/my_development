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
import { MapPin } from "@phosphor-icons/react";
import { useHotelStore } from "@/store/useHotelStore";

export interface ILocationOptions {
  id: string;
  title: string;
  country: string;
}

interface PropTypes {
  setValue: React.Dispatch<
    React.SetStateAction<ILocationOptions | FlightLocations | undefined>
  >;
  label?: string;
  placeholder?: string;
  apiFor?: "hotels" | "flights" | "activities";
  value: ILocationOptions | undefined;
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

export function LocationSelect({
  setValue,
  value,
  label,
  placeholder,
  searchPrompt,
  classNames,
}: PropTypes) {
  const [isFetching, setIsFetching] = React.useState(false);
  const [locationList, setLocationList] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");
  const { destinationList, setDestinationList } = useHotelStore();

  async function handleContentFocus(search: string) {
    try {
      //     TODO: Logic to fetch locations
      setSearch(search);

      // Perform action for Hotels
      setIsFetching(true);
      const response = await getHotelDestinations({ search });
      console.log(response);

      if (response.success) {
        setIsFetching(false);
        setDestinationList(response.data[0].destinations);
      }

      // If the search word is not passed
      if (response.success == false) {
        setDestinationList([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={cn("relative", classNames)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Flex
            gap={1}
            role="button"
            className="border border-neutral400 rounded pl-5 w-full max-w-[900px] h-full max-h-[100px] bg-gray-100"
          >
            <Icons.location />
            <Flex col className="items-start">
              <p className="text-xs font-medium capitalize label text-text-secondary">
                {label || "from"}
              </p>
              {value ? (
                <Flex col className="items-start">
                  <h3 className="text-sm font-bold text-text-secondary">
                    {value?.title}
                  </h3>
                  <p className="text-xs font-medium capitalize text-text-secondary">
                    {value?.country}
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

            {isFetching && (
              <CommandEmpty>
                {isFetching && "fetching locations.."}
              </CommandEmpty>
            )}

            {/* List of hotels */}
            {!isFetching && destinationList.length > 0 && (
              <div className="w-full">
                {destinationList
                  ?.slice(0, 5)
                  .map((location: FlightLocations, index: number) => (
                    <div
                      className="w-full flex items-center gap-3 hover:bg-primary100 rounded cursor-pointer px-2 py-1"
                      key={index}
                      onClick={() => {
                        setValue({
                          id: location.id,
                          title: location.title,
                          country: location.country,
                        });

                        setIsOpen(false);
                      }}
                    >
                      <MapPin size={25} weight="fill" />
                      <div className="">
                        <h3 className="font-bold text-text">
                          {location.title}
                        </h3>
                        <p className="text-sm font-medium text-text-secondary">
                          {location.country}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
