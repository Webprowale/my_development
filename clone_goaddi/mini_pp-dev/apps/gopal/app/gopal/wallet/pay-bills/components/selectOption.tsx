"use client"

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SetStateAction } from "react";

export function SelectOption({
  data,
  setIsSelected,
}: {
  setIsSelected?: React.Dispatch<SetStateAction<boolean>>;
  data: string[];
}) {

  return (
    <Select>
      <SelectTrigger className="w-[616px]">
        <SelectValue placeholder="Select an Option" />
      </SelectTrigger>
      <SelectContent>
        {data.map((value, index) => (
          <SelectItem
            onClick={() => setIsSelected && setIsSelected(true)}
            key={index}
            value="light"
          >
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
