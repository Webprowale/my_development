"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Flex } from "@/components/ui/flex";
import { CalendarBlank } from "@phosphor-icons/react/dist/ssr/CalendarBlank";
import { Calendar2 } from "@/components/ui/calender2";

interface PropTypes {
  setValue: React.Dispatch<React.SetStateAction<Date>> | any;
  disabledPrevDate?: any;
  label?: string;
  placeholder?: string;
  value: Date | any;
}

export function DateSelect({
  setValue,
  value,
  label,
  placeholder,
  disabledPrevDate,
}: PropTypes) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div className="relative w-[100%]"
    // style={{'border':'1px solid red'}}
    
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Flex
            gap={1}
            role="button"
            className="border border-neutral400 rounded pl-3 w-full h-[86px] md:max-w-[250px] md:h-full max-h-[100px] bg-gray-100"
          >
            <CalendarBlank size={24} className="text-[#667185]" />
            <Flex col className="items-start">
              <p className="label capitalize font-medium text-xs text-text-secondary">
                {label || "Departure Date"}
              </p>

              <h3 className="font-bold text-text-secondary text-sm">
                {value
                  ? format(value, "LLL dd, y")
                  : placeholder || "Click to add date"}
              </h3>
            </Flex>
          </Flex>
        </PopoverTrigger>

        <PopoverContent align="start" className="p-2 -mt-[100px]">
          <Calendar2
            mode="single"
            selected={value}
            disabled={disabledPrevDate}
            captionLayout="dropdown-buttons"
            onSelect={(date) => setValue(date as Date)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
