"use client";

import {
  ArrowRight,
  X,
  MapPin,
  AirplaneLanding,
  AirplaneTakeoff,
  CurrencyNgn,
  FilmSlate,
  ForkKnife,
  SuitcaseRolling,
  Usb,
  Chair,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const FlightDetailsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();
  const mode = useSearchParams();
  const currentPath = usePathname();

  const handleClose = () => {
    router.push(currentPath, { scroll: false });
  };

  useEffect(() => {
    if (mode.get("flightdetails") === "open") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (event: any) => {
        if (event.key === "Escape") {
          router.push(currentPath);
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 w-full h-screen bg-[#00000079] grid place-items-center z-50 backdrop-blur-sm">
          <div className="bg-white w-full md:w-[50%] h-[90vh] max-h-[90vh] p-6 rounded overflow-auto scrollbar-thin">
            <header className="relative z-10 mb-4">
              <Image
                src={`/assets/modal-direction.svg`}
                width={70}
                height={70}
                className="mb-4"
                alt=""
              />

              <h3 className="font-semibold text-xl mb-2">Lagos - Singapore</h3>
              <p className="text-sm text-[#647995] w-full md:w-[68%]">
                Your itineary: 1 Adult | Travel time : 10:00 hours | One Stop
              </p>
              <X
                size={24}
                weight="bold"
                className="absolute right-0 top-[10px] cursor-pointer"
                onClick={() => {
                  handleClose();
                }}
              />
              <img
                src="/assets/modal-lines.svg"
                className="absolute left-0 right-0 top-0 w-full -z-[1]"
                alt=""
              />
            </header>

            {/* Tab toggle */}
            <Tabs
              defaultValue="depart"
              className="w-full h-full mb-4"
            >
              <div className="">
                <TabsList className="grid w-full grid-cols-2 max-w-max min-h-[40px] mb-5">
                  <TabsTrigger
                    value="depart"
                    className=""
                  >
                    Departing Flight
                  </TabsTrigger>
                  <TabsTrigger
                    value="return"
                    className=""
                  >
                    Returning Flight
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="depart">
                <div className="pb-10">
                  <DepartingFlight />
                  {/* task */}
                  <div className="bg-[#FEF6E7] flex items-center justify-center my-8 rounded w-[85%] ml-auto">
                    <p className="flex items-center gap-2 p-2 text-[#865503]">
                      <Chair
                        size={20}
                        weight="fill"
                        className="text-[#865503]"
                      />
                      <span>Layover</span>
                      <span className="font-bold">Lome (LFM)</span>
                      <span className="bg-[#865503] text-xs rounded py-2 px-3 text-white">
                        2hr 10min
                      </span>
                    </p>
                  </div>
                  <DepartingFlight />
                </div>
              </TabsContent>
              <TabsContent value="return">
                <div className="pb-10">
                  <DepartingFlight />
                  {/* task */}
                  <div className="bg-[#FEF6E7] flex items-center justify-center my-8 rounded w-[85%] ml-auto">
                    <p className="flex items-center gap-2 p-2 text-[#865503]">
                      <Chair
                        size={20}
                        weight="fill"
                        className="text-[#865503]"
                      />
                      <span>Layover</span>
                      <span className="font-bold">Lome (LFM)</span>
                      <span className="bg-[#865503] text-xs rounded py-2 px-3 text-white">
                        2hr 10min
                      </span>
                    </p>
                  </div>
                  <DepartingFlight />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

// Departing flight
const DepartingFlight = () => {
  return (
    <div className="grid grid-cols-[minmax(0,15%)_minmax(0,85%)]">
      <div className="takeoff ">
        {/* flight times */}
        <div className="flight-time flex flex-col h-full gap-4 justify-between">
          <div className="flex flex-col">
            <h3 className="font-semibold">22:05</h3>
            <p className="text-sm text-[#676E7E]">Thur, Sept 8</p>
          </div>
          <div className="flex flex-col">
            <h3 className="bg-[#E7F0FF] p-2 rounded text-sm w-max text-[#324A76]">
              Overnight
            </h3>
            <p className="text-[#676E7E] text-sm">6hrs 38mins</p>
          </div>
          <div className="flex flex-col">
            <p className="bg-red-100 text-[#9E0A05] w-max p-1 rounded text-sm">
              Arrives
            </p>
            <h3 className="font-semibold">22:05</h3>
            <p className="text-sm text-[#676E7E]">Thur, Sept 8</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-start h-full">
          {/* The flight divide */}
          <div className="divide flex flex-col items-center gap-1 h-full mr-1">
            <span className="inline-block w-[12px] h-[12px] rounded-full bg-primary600 flex-shrink-0"></span>
            <div className="rule bg-[#D0D5DD] w-[1px] min-h-[100px] h-full"></div>
            <span className="">
              <MapPin
                size={20}
                weight="fill"
                className="text-primary600"
              />
            </span>
          </div>
          {/* Flight info */}
          <div className="flex flex-col gap-2 ">
            <div className="flex items-center gap-2">
              <span className="bg-[#F0F2F5] rounded py-1 px-2 inline-flex items-center gap-1">
                Depart{" "}
                <ArrowRight
                  size={18}
                  weight="bold"
                />
              </span>
              <p className="flex items-center gap-1">
                <span>LOS - Murtala Muhammed International Airport </span>{" "}
                <span>|</span> <span>Lagos, Nigeria</span>
              </p>
            </div>
            {/* airline info */}
            <div className="airline flex items-center gap-3 border border-[#D0D5DD] p-3 w-max rounded">
              <Image
                src={"/assets/american-airlines.svg"}
                width={24}
                height={24}
                alt=""
                className="object-contain"
              />
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-xl">American Airlines</h3>
                <p className="text-[#676E7E] text-sm flex items-center gap-2">
                  <span>AA-829</span>
                  <span>&bull;</span>
                  <span>Boeing 787</span>
                  <span>&bull;</span>
                  <span className="inline-block text-xs py-1 px-2 text-white bg-primary900 rounded">
                    First class
                  </span>
                </p>
              </div>
            </div>

            {/* traveller info */}
            <p className="flex items-center flex-wrap gap-4 text-[#647995] text-sm font-medium bg-[#F7F9FC] py-2 px-3 rounded">
              <span className="flex items-center gap-1">
                <SuitcaseRolling
                  size={15}
                  className="text-[#475367]"
                  weight="bold"
                />
                Baggage: 20kg, Cabin Baggage: 8kg
              </span>
              <span className="flex items-center gap-1">
                <FilmSlate
                  size={15}
                  className="text-[#475367]"
                  weight="bold"
                />
                In flight entertainment
              </span>
              <span className="flex items-center gap-1">
                <ForkKnife
                  size={15}
                  className="text-[#475367]"
                  weight="bold"
                />
                In flight meal
              </span>
              <span className="flex items-center gap-1">
                <Usb
                  size={15}
                  className="text-[#475367]"
                  weight="bold"
                />
                USB Port
              </span>
            </p>

            {/* stop over airport */}
            <p className="flex items-center gap-1">
              <span>Gnassingbé Eyadéma International Airport (LFW) </span>{" "}
              <span className="text-[#E4E7EC]">|</span>
              <span>Lome, Togo</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsModal;
