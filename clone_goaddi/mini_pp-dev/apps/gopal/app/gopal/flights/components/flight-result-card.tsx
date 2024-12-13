"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Flex } from "@/components/ui/flex";
import { naira } from "@/utils/money";
import { format, parseISO } from "date-fns";

const flight_facilities = [
  {
    label: "Baggage: 20kg, Cabin Baggage: 8kg",
    icon: Icons.luggage,
  },
  {
    label: "In flight entertainment",
    icon: Icons.tv,
  },
  {
    label: "In flight meal",
    icon: Icons.meal,
  },
  {
    label: "USB Port",
    icon: Icons.usb,
  },
];

export default function FlightsResultCard({
  flight,
  key,
}: {
  flight: any;
  key: number;
}) {
  const {
    ArrivalDateTime,
    DepartureDateTime,
    OperatingAirline_Code,
    OperatingAirline_FlightNumber,
    OperatingAirline_Image,
    OperatingAirline_Text,
    Duration,
    Stops,
    Total_Duration,
  } = flight;

  const firstDepartureDate = parseISO(DepartureDateTime[0]);
  const lastArrivalDate = parseISO(ArrivalDateTime[ArrivalDateTime.length - 1]);
  const totalDurationInMinutes = Total_Duration;
  const totalHours = Math.floor(totalDurationInMinutes / 60);
  const totalMinutes = totalDurationInMinutes % 60;
  return (
    <div
      key={key}
      className="flex w-full h-auto  min-h-[265px] relative bg-white rounded"
    >
      <div className="w-full bg-white main">
        <div className="w-full p-6 border-b flight_details border-border">
          <Flex gap={4} between>
            <Flex gap={1}>
              {/* <Icons.bird /> */}
              <Image
                src={OperatingAirline_Image[0]}
                width={30}
                height={30}
                className="w-14 h-fit"
                alt=""
              />
              <Flex col className="items-start">
                <h1 className="font-semibold text-text">
                  {OperatingAirline_Text[0]}
                </h1>

                <Flex gap={2} className="">
                  <Flex col={true}>
                    {OperatingAirline_Code.map(
                      (code: string, index: number) => (
                        <p className="font-medium text-text-secondary text-xs">
                          {code}-{OperatingAirline_FlightNumber[index]}
                        </p>
                      ),
                    )}
                  </Flex>

                  {/* <Button size={"sm"} className="bg-[#0A369D]">
                    {flight.Cabin_Text[0]}
                  </Button> */}
                </Flex>
              </Flex>
            </Flex>

            <Flex gap={5} between>
              <Flex gap={1} col className="items-end text-right">
                <h1 className="font-semibold text-text text-xl">
                  {format(firstDepartureDate, "HH:mm")}
                </h1>
                <p className="text-sm font-medium text-text-secondary">
                  {format(firstDepartureDate, "EEE, dd MMM")}
                </p>
              </Flex>

              <div className="w-[240px] relative space-y-2">
                <Flex
                  between
                  className="text-sm font-medium text-text-secondary"
                >
                  <Icons.fightUp />
                  <p className="">
                    Duration: {totalHours}h {totalMinutes}m
                  </p>
                  <Icons.flightDown />
                </Flex>

                <div className="w-full centered rounded-lg bg-primary100">
                  <div className="bg-primary h-2 rounded-lg w-1/2"></div>
                </div>

                <Flex between className="">
                  <h1 className="font-semibold text-text">{flight.Origin}</h1>

                  <p className="text-sm font-medium text-text-secondary">
                    Direct
                  </p>
                  <h1 className="font-semibold text-text">
                    {flight.Destination}
                  </h1>
                </Flex>
              </div>

              <Flex gap={1} col className="items-start text-left">
                <h1 className="font-semibold text-text text-xl">
                  {format(lastArrivalDate, "HH:mm")}
                </h1>
                <p className="text-sm font-medium text-text-secondary">
                  {format(lastArrivalDate, "EEE, dd MMM")}
                </p>
              </Flex>
            </Flex>

            {/*  */}
            {/* <Flex> */}
            {/* <Icons.naira /> */}
            <h1 className="font-semibold text-text text-xl">
              {naira(flight?.netfare)}
            </h1>
            {/* </Flex> */}
          </Flex>
        </div>

        <div className="w-full p-6 border-b border-border">
          <Flex gap={2}>
            <p className="font-medium text-text-secondary">Facilities:</p>
            {flight_facilities.map((item, index) => (
              <Flex gap={1} key={index} className="">
                <item.icon />
                <p className="font-medium text-text-secondary">{item.label}</p>
              </Flex>
            ))}
          </Flex>
        </div>

        <Flex between className="w-full p-6 capitalize border-border">
          <Flex gap={8} className="font-medium text-primary">
            <p>Flight details</p>

            <p>price details</p>
          </Flex>

          <Button className="px-14" size={"sm"}>
            Select Flight
          </Button>
        </Flex>
      </div>
    </div>
  );
}
