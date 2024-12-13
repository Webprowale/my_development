//@ts-nocheck
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
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { Minus } from "@phosphor-icons/react";

export interface IData {
  adult: number;
  children: number;
  infant?: number;
  rooms: number;
}

interface PropTypes {
  setValue: React.Dispatch<React.SetStateAction<any>>;
  label?: string;
  placeholder?: string;
  value: string | any | undefined;
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
    description: "0 months - 12years",
  },
  {
    name: "rooms",
    description: "",
  },
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

  const [data, setData] = React.useState<IData>({
    adult: 0,
    children: 0,
    rooms: 0,
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
      data?.adult === 0
        ? "No Adults"
        : `${data?.adult} Adult${data?.adult > 1 ? "s" : ""}`;
    const childrenText =
      data?.children === 0
        ? "No Children"
        : `${data?.children} Child${data?.children > 1 ? "ren" : ""}`;
    const roomsText =
      data?.rooms === 0
        ? "No Rooms"
        : // @ts-ignore
          `${data?.rooms} Room${data?.rooms > 1 ? "s" : ""}`;

    // Combine components using string concatenation or template literals
    setPassengers(`${adultText}, ${childrenText}, ${roomsText}`);
    setValue({ adult: data.adult, child: data.children, rooms: data.rooms });

    setIsOpen(false);
  }

  return (
    <div className="relative w-full h-full">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Flex
            gap={1}
            role="button"
            className="border border-neutral400 rounded pl-3 w-full max-w-[800px] h-full max-h-[150px] bg-gray-100"
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
            <CardContent className="p-0 mt-2 space-y-2">
              {passengersType.map((item, index) => (
                <Flex between key={index}>
                  <Flex col gap={-1} className="items-start">
                    <B2 className="capitalize">{item.name}</B2>

                    <B3 className="text-date-text">{item.description}</B3>
                  </Flex>

                  <Flex gap={2} between>
                    <Button
                      disabled={data[item.name] === 0}
                      className="bg-primary600 disabled:bg-primary100 disabled:text-[#A29999] text-white"
                      onClick={() => handleDecrease(item.name)}
                    >
                      <Minus size={13} />
                    </Button>
                    <div className="input border border-neutral600 rounded p-2 centered w-[80px] h-[48px]">
                      <B3 className="text-date-text">{data[item.name]}</B3>
                    </div>

                    <Button
                      className="bg-primary600 text-white"
                      onClick={() => handleIncrease(item.name)}
                    >
                      <Plus size={13} />
                    </Button>
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
