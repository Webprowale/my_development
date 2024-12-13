"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const InfiniteMovingCardss = ({
  items,

  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    image: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  return (
    <div className={cn("scroller relative max-w-7xl overflow-hidden ")}>
      <ul className={cn("flex min-w-full py-4 flex-nowrap")}>
        {items.map((item, idx) => (
          <li
            className="w-[350px] cursor-pointer bg-primary600 max-w-full relative mr-4 rounded-sm px-6 py-6 md:w-[450px] h-[300px]"
            key={item.name}
          >
            <div className="flex flex-col h-full justify-between">
              <div className=" text-sm leading-[1.6] text-gray-100 font-normal">
                &ldquo;{item.quote}&ldquo;
              </div>
              <div className="flex flex-row gap-2 items-center">
                <img src={item.image} alt="" className="w-9 h-9 rounded-full" />
                <span className="flex flex-col gap-1">
                  <span className=" text-sm leading-[1.6] text-white font-normal">
                    {item.name}
                  </span>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCardss;
