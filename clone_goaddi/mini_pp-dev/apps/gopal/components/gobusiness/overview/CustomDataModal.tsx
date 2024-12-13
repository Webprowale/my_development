"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarBlank } from "@phosphor-icons/react";

export function CustomDateModal({
  className,
  closeDateModal,
}: {
  className?: React.HTMLAttributes<HTMLDivElement>;
  closeDateModal: (data: boolean) => void;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });

  return (
    <div className="fixed inset-0 w-full h-screen max-h-screen bg-black/50 grid place-content-center z-[70] backdrop-blur-sm">
      <div className="bg-white relative rounded p-4">
        <div className="flex items-center justify-between w-full gap-4 mb-6">
          <div className="from w-full">
            <p className="text-sm mb-1">From</p>
            <div className="border border-gray-200 rounded py-3 px-2 w-full flex items-center justify-between">
              <span className="text-sm">{format(date.from, "LLL dd, y")}</span>
              <CalendarBlank size={16} />
            </div>
          </div>
          <div className="to w-full">
            <p className="text-sm mb-1">To</p>
            <div className="border border-gray-200 rounded py-3 px-2 w-full flex items-center justify-between">
              <span className="text-sm">{format(date.to, "LLL dd, y")}</span>
              <CalendarBlank size={16} />
            </div>
          </div>
        </div>
        <div className={cn("grid gap-2", className)}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </div>
        <div className="flex items-center gap-2 mt-5">
          <Button
            variant="outline"
            className="text-primary600 rounded px-10 text-sm hover:text-primary600 cursor-pointer"
          >
            Reset
          </Button>

          <Button
            variant="default"
            className="bg-primary100 text-primary600 hover:bg-primary200 px-10 rounded ml-auto text-sm cursor-pointer"
            onClick={() => {
              closeDateModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            className="bg-primary600 hover:bg-primary700 text-white px-10 rounded cursor-pointer"
            onClick={() => {
              closeDateModal(false);
            }}
          >
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
}
