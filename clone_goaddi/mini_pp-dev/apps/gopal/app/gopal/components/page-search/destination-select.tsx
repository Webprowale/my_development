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
} from "@/components/ui/command";
import { Icons } from "@/components/icons";
import { Flex } from "@/components/ui/flex";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { searchAirports } from "@/axios/endpoints/flights.endpoint";
import mapPointer from "@/public/assets/map-pointer.svg";
import { activities } from "@/axios/endpoints/activities.endpoint";
// import { useActivitiesStore } from "@/store/useActivitiesStore";

export interface IDestinationOption {
  title: string;
  countryId: string;
  cityId: string;
}

interface PropTypes {
  setValue: React.Dispatch<
    React.SetStateAction<IDestinationOption | undefined>
  >;
  value: IDestinationOption | undefined;
  label?: string;
  placeholder?: string;
  apiFor?: "hotels" | "flights" | "activities";
  searchPrompt?: string;
  classNames?: string;
}

export interface IAirports {
  code: string;
  label: string;
  value: string;
}

export function DestinationSelect({
  setValue,
  value,
  label,
  apiFor,
  placeholder,
  searchPrompt,
  classNames,
}: PropTypes) {
  const [isFetching, setIsFetching] = React.useState(false);
  const [destinationList, setDestinationList] = React.useState<
    IDestinationOption[]
  >([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");

  async function handleContentFocus(search: string) {
    setSearch(search);
    setIsFetching(true);
    const destinationResult = await activities({
      search,
    });

    setIsFetching(false);
    setDestinationList(destinationResult.data[0].destinations ?? []);
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
              {value && value.cityId ? (
                <Flex col className="items-start">
                  <h3 className="text-sm font-bold text-text-secondary">
                    {value?.title}
                  </h3>
                  <p className="text-xs font-medium capitalize text-text-secondary">
                    {`City-ID: ${value?.cityId}`}
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

            {/* {!isFetching && <CommandEmpty>{"No location found."}</CommandEmpty>} */}
            {!isFetching && destinationList.length > 0 && (
              <div className="w-full">
                {destinationList?.map((location, index) => {
                  const [city, cityState] = location.title.split(",");

                  return (
                    <div
                      onClick={() => {
                        setValue({ ...location });
                        setIsOpen(false);
                      }}
                      className="flex flex-row items-center space-x-3 justify-start w-full p-2 hover:bg-gray-100 rounded"
                      key={index}
                    >
                      <Image src={mapPointer} alt="map pointer" />
                      <div>
                        <p className="text-sm font-bold">{city}</p>
                        <p className="text-xs text-gray-600">{cityState}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {isFetching ? (
              <p className="w-full text-center text-xs font-bold py-1">
                Loading...
              </p>
            ) : null}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
