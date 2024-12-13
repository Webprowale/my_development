"use client";

import { Control, UseFormSetValue } from "react-hook-form";
import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { set } from "date-fns";
import { Flex } from "@/components/ui/flex";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import B3 from "@/components/ui/typography/b3";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import B2 from "@/components/ui/typography/b2";
import { usePathname } from "next/navigation";

export interface IData {
  adult: number;
  children: number;
  infant: number;
  guest?: number;
}

interface PropTypes {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label?: string;
  placeholder?: string;
  value: string | undefined;
  searchPrompt?: string;
}

interface IPassengerTypes {
  name: keyof IData;
  description: string;
}

const passengersType: IPassengerTypes[] = [
  {
    name: "adult",
    description: "12y+",
  },
  {
    name: "children",
    description: "2years - 12years",
  },
  {
    name: "infant",
    description: "below 2 years",
  },
];

const passengersDestinationType: IPassengerTypes[] = [
  {
    name: "adult",
    description: "12y+",
  },
  {
    name: "children",
    description: "2years - 12years",
  }
];

export function PassengerSelect({
  setValue,
  value,
  label,
  placeholder,
  searchPrompt,
}: PropTypes) {
  const [passengers, setPassengers] = React.useState<string>("");
  const [flightClass, setFlightClass] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const pathname = usePathname();
  const [data, setData] = React.useState<IData>({
    adult: 0,
    children: 0,
    infant: 0,
    guest: 0,
  });

  console.log(passengers, "this is the passengers!");

  function handleDecrease(name: keyof IData) {
    if (data[name] === 0) return;
    setData({
      ...data,
      [name]: (data[name] -= 1),
    });
  }

  function handleIncrease(name: keyof IData) {
    setData({
      ...data,
      [name]: (data[name] += 1),
    });
  }

  function handleApply() {
    const adultText =
      data.adult === 0
        ? "No Adults"
        : `${data.adult} Adult${data.adult > 1 ? "s" : ""}`;
    const childrenText =
      data.children === 0
        ? "No Children"
        : `${data.children} Child${data.children > 1 ? "ren" : ""}`;
    const infantText =
      data.infant === 0
        ? "No Infants"
        : `${data.infant} Infant${data.infant > 1 ? "s" : ""}`;
    const guestText =
      data.guest === undefined || data.guest === 0
        ? ""
        : `${data.guest} Guest${data.guest > 1 ? "s" : ""}`;

    // Combine components using string concatenation or template literals
    setPassengers(
      pathname.includes("activities")
        ? `${adultText}, ${childrenText}`
        : `${flightClass}, ${adultText}, ${childrenText}, ${infantText}, ${guestText}`,
    );

    setValue(
      pathname.includes("activities")
        ? `${adultText}, ${childrenText}`
        : `${flightClass}, ${adultText}, ${childrenText}, ${infantText}, ${guestText}`,
    );

    setIsOpen(false);
  }

  return (
    <div className="relative w-full h-full">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Flex
            gap={1}
            role="button"
            className="border border-neutral400 rounded pl-3 w-full h-[86px] md:max-w-[800px] md:h-full md:max-h-[150px] bg-gray-100"
          >
            <Icons.user1 />
            <Flex col className="items-start">
              <p className="text-xs font-medium capitalize label text-text-secondary">
                {label || "Passengers"}
              </p>
              <h3 className="text-sm font-bold text-text-secondary">
                {passengers.length > 0
                  ? passengers
                  : placeholder || "Click to add"}
              </h3>
            </Flex>
          </Flex>
        </PopoverTrigger>

        <PopoverContent align="end" className="p-2 w-[450px] -mt-[100px]">
          <Card className="p-2 border-none">
            {pathname.includes("activities") ? null : (
              <Flex between>
                <p className="font-semibold text-text">
                  {passengers || "1 Adult"}
                </p>

                <Icons.closeBlack role="button" className="fill-text" />
              </Flex>
            )}

            {pathname.includes("activities") ? null : (
              <Flex col gap={3} className="items-start mt-3">
                <Select
                  onValueChange={(value) => setFlightClass(value)}
                  value={flightClass}
                >
                  <SelectTrigger className="w-full p-3 rounded">
                    <SelectValue className="" placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="">
                    <SelectItem className="p-1 " value="Economy">
                      Economy
                    </SelectItem>
                    <SelectItem className="p-1 " value="Premium">
                      Premium Economy
                    </SelectItem>
                    <SelectItem className="p-1 " value="Business">
                      Business Class
                    </SelectItem>
                    <SelectItem className="p-1 " value="First">
                      First Class
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Flex>
            )}

            <CardContent className="p-0 mt-4 space-y-2">
              {(pathname.includes("activities")
                ? passengersDestinationType
                : passengersType
              ).map((item, index) => (
                <Flex between key={index}>
                  <Flex col gap={-1} className="items-start">
                    <B2 className="capitalize">{item.name}</B2>

                    <B3 className="text-date-text">{item.description}</B3>
                  </Flex>

                  <Flex gap={2} between>
                    <Icons.decrease
                      role="button"
                      onClick={() => handleDecrease(item.name)}
                      className={cn(
                        data[item.name] === 0 ? "fill-neutral600" : "fill-text",
                      )}
                    />
                    <div className="input border border-neutral600 rounded p-2 centered w-[46px] h-[50px]">
                      <B3 className="text-date-text">{data[item.name]}</B3>
                    </div>
                    <Icons.increase
                      role="button"
                      onClick={() => handleIncrease(item.name)}
                      className="fill-text"
                    />
                  </Flex>
                </Flex>
              ))}
            </CardContent>

            <Button onClick={handleApply} className="w-full mt-8" size={"sm"}>
              Apply
            </Button>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function SelectScrollable() {
  return (
    <Select onValueChange={(value) => console.log(value)}>
      <SelectTrigger className="w-full p-3 rounded">
        <SelectValue className="" placeholder="Select" />
      </SelectTrigger>
      <SelectContent className="">
        <SelectItem className="p-1 " value="est">
          Economy
        </SelectItem>
        <SelectItem className="p-1 " value="cst">
          Premium Economy
        </SelectItem>
        <SelectItem className="p-1 " value="est">
          Business Class
        </SelectItem>
        <SelectItem className="p-1 " value="est">
          First Class
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
