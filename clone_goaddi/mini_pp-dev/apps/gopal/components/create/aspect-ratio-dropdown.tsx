"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FrameCorners } from "@phosphor-icons/react/dist/icons/FrameCorners";
import { Flex } from "../ui/flex";
import Paragraph from "../ui/typography/paragraph";
import { Square } from "@phosphor-icons/react/dist/icons/Square";
import { Rectangle } from "@phosphor-icons/react/dist/icons/Rectangle";
import { MagnifyingGlassPlus } from "@phosphor-icons/react/dist/icons/MagnifyingGlassPlus";
import { CopySimple } from "@phosphor-icons/react/dist/icons/CopySimple";
// import { Resize } from "@phosphor-icons/react";
import { IoResize } from "react-icons/io5";

export function AspectRatioControl({ setRatio, disabled }) {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        // disabled={disabled}
        
        className="disabled:cursor-not-allowed"
      >
        <IoResize
          size={20}
          className="text-white z-10 disabled:cursor-not-allowed"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-fit">
        <DropdownMenuLabel>Aspect Ratio</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setRatio}>
          <DropdownMenuRadioItem value="1/1">
            <Flex className="gap-5 text-neutral-500">
              <Paragraph>1:1</Paragraph>
              <Square size={20} className=" text-neutral-500" />
            </Flex>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="4/5">
            <Flex className="gap-5 text-neutral-500">
              <Paragraph>4:5</Paragraph>
              <Rectangle size={20} className=" text-neutral-500" />
            </Flex>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="16/9">
            <Flex className="gap-5 text-neutral-500">
              <Paragraph className="">16:9</Paragraph>
              <Rectangle size={20} className="rotate-90 text-neutral-500" />
            </Flex>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ZoomControlDropDown({ onZoomChange }: any) {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MagnifyingGlassPlus size={20} className="text-white z-10" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-fit">
        <input
          type="range"
          name=""
          onChange={onZoomChange}
          min={1}
          max={3}
          step={0.05}
          id=""
          className="w-56"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Previews({ selectedFiles, onFileClick }: any) {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CopySimple size={20} className="text-white z-10" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-fit bottom-0">
        <div className="w-full flex gap-2">
          {selectedFiles?.map((item, index) => (
            <div
              role="button"
              onClick={onFileClick}
              key={index}
              className="w-20 h-20  rounded relative"
            >
              <img
                src={item.preview}
                alt=""
                className=" w-full h-full rounded"
              />
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
