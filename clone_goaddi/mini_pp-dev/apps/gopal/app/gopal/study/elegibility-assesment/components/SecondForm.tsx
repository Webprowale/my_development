"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const SecondForm = () => {
  return (
    <div className="flex  flex-col gap-[1.5rem]">
      <div>
        <Label className="flex mb-2">Select your Bsc Grade Range</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a degree" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="8">2nd Class Upper or Above</SelectItem>
            <SelectItem value="4">2nd Class Lower or Below</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SecondForm;
