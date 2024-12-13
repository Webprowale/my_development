"use client"

import { Icons } from "@/components/icons";
import { Flex } from "@/components/ui/flex";
import { Badge } from "./badge";
import Button from "@/components/goui/button";
import { useRouter } from "next/navigation";

interface IFeaturedFlightCardProps
{
  key: number;
}

export function FeaturedFlightCard({ key }: IFeaturedFlightCardProps)
{
  const { push } = useRouter();

  return <div key={key} className="">
    <div className="relative flex flex-col gap-2 p-2 border-2 border-gray-100 rounded">
      <div>
        <img
          src="/assets/current_trip.png"
          alt="feature flights"
        ></img>
        <div className="absolute capitalize backdrop-blur-lg bg-[#FFFFFF33] tracking-wide py-1 px-3 top-4 left-4 rounded text-white">
          <span className="text-xs">Paris</span>
        </div>
      </div>


      <div className="space-y-[6px]">
        <Flex gap={2}>
          <Icons.calender />
          <p className="text-date-text">
            May 6th - 14th
          </p>
        </Flex>

        <Badge label="one way" />


        <h1 className="text-lg font-semibold">
          NGN 10,000
        </h1>
      </div>

      <Button onClick={() => push('/gopal/flights/search')} className="w-full">View</Button>
    </div>
  </div>
}