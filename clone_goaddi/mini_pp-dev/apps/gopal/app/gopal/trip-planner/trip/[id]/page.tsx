"use client";
import { useSearchParams, useRouter } from "next/navigation";
import {
  AirplaneInFlight,
  ArrowLeft,
  ArrowRight,
  CalendarBlank,
  DotsThreeOutline,
  Gear,
  Handshake,
  ShareFat,
  UserPlus,
  Buildings,
  RoadHorizon,
  CurrencyNgn,
  Info,
} from "@phosphor-icons/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GoBack from "@/components/trip-planner/GoBack";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TripActions from "@/components/trip-planner/TripActions";
import SelectedFlight from "@/components/trip-planner/SelectedFlight";
import FlightDetailsModal from "@/components/trip-planner/FlightDetailsModal";
import SelectedHotel from "@/components/trip-planner/SelectedHotel";
import SelectedActivity from "@/components/trip-planner/SelectedActivity";
import { addCommasToNumber } from "@/utils";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PriceDetailsModal from "@/components/trip-planner/PriceDetailsModal";
import { Suspense, useState } from "react";
import HotelDetailsModal from "@/components/trip-planner/HotelDetailsModal";
import ActivitiesDetailsModal from "@/components/trip-planner/ActivitiesDetailsModal";
import InviteModal from "@/components/trip-planner/InviteModal";
import ShareModal from "@/components/trip-planner/ShareModal";

const Page = () => {
  const params = useSearchParams();
  const router = useRouter();

  const fullname = params.get("name");
  const style = params.get("style");
  const desc = params.get("desc");

  const flightList: any = [1, 2];
  const hotelList: any = [1, 2];
  const ActivityList = [1, 2];

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isGuest, setIsGuest] = useState(true);
  const [isEditor, setIsEditor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <main className="bg-white p-5 min-h-[80vh] mb-20">
        <header className="relative">
          <div className="banner relative rounded overflow-hidden">
            <img
              src={"/assets/trip-timeline/trip-banner.svg"}
              className="w-full h-[full]"
              alt=""
            />
            <GoBack />
          </div>
          <div className="trip-details mt-5 flex items-start justify-between">
            <div className="left">
              <p className="flex items-center gap-2 bg-[#FEF4E6] p-1 px-2 font-medium w-max rounded text-[#7A4504] text-xs">
                <span>
                  <CalendarBlank size={15} />
                </span>
                <span>21 March 2024</span>
                <span>
                  <ArrowRight size={15} />
                </span>
                <span>21 April 2024</span>
              </p>
              <h1 className="text-2xl font-bold">
                {" "}
                {fullname ?? "Bahamas Family Trip"}
              </h1>
              <p className="text-[#676E7E] text-sm flex items-center gap-2">
                <span>New York,  United States of America </span>
                <span className="text-[#D0D5DD] font-semibold">|</span>
                <span>{style ?? "Solo Trip"}</span>
              </p>
            </div>
            <div className="right flex items-center gap-2">
              <Link
                href={"/gopal/trip-planner/trip/5/collaborator"}
                className="owner inline-flex items-center justify-center gap-1 border border-primary600 rounded bg-transparent py-3 px-4 text-xs text-primary600 hover:bg-primary100 font-medium ease-linear duration-150"
              >
                <Handshake size={20} />
                <span>Trip Collaboration</span>
              </Link>
              <Link
                href={"/gopal/trip-planner/trip/5/?share=open"}
                className="status inline-flex items-center justify-center gap-1 py-3 px-4 rounded text-xs bg-transparent border border-primary600 hover:bg-primary100 text-primary600 font-medium"
              >
                <ShareFat size={20} />
                <span>Share Trip</span>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <DotsThreeOutline
                    size={25}
                    weight="fill"
                    className="text-[#344054]"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-3 right-0" align="end">
                  <Link
                    href={"/gopal/trip-planner/trip/5/?invite=open"}
                    className=""
                  >
                    <DropdownMenuItem className="flex items-center gap-2 p-4 cursor-pointer">
                      <UserPlus size={20} />
                      <span className="font-medium"> Invite trip buddies</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="flex items-center gap-2 p-4 cursor-pointer">
                    <Gear size={20} />
                    <span className="font-medium"> Trip Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Trip cta and users */}
        {isLoggedIn && (
          <section className="flex items-start justify-between mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full md:w-[70%]">
              <TripActions
                title="Activities"
                subtitle="Build, personalize, and optimize your itineraries with our trip planner."
                ctaText="Add Activities"
                className="bg-primary1100 text-white"
                url="#"
              />
              <TripActions
                title="Hotels"
                subtitle="Build, personalize, and optimize your itineraries with our trip planner."
                ctaText="Add Hotels"
                className="bg-primary200 text-white"
                titleClass="text-primary1100"
                subtitleClass="text-primary1100"
                url="#"
              />
              <TripActions
                title="Flights"
                subtitle="Build, personalize, and optimize your itineraries with our trip planner."
                ctaText="Add Flights"
                className="bg-primary600 text-white"
                btnClass="bg-white text-primary600 hover:bg-primary100"
                url="#"
              />
            </div>
            <div className="flex items-center w-max">
              <div className="img-group flex items-center">
                <img
                  src="/assets/trip-timeline/1.png"
                  alt=""
                  className="w-[30px] h-[30px] object-cover"
                />
                <img
                  src="/assets/trip-timeline/2.png"
                  alt=""
                  className="w-[30px] h-[30px] object-cover ml-[-12px]"
                />
              </div>
            </div>
          </section>
        )}

        {/* For users not signed in */}
        {!isLoggedIn && (
          <section className="flex items-start gap-4 bg-[#F0F2F5] rounded p-5 text-base w-full md:w-[70%] mt-5">
            <div className="logo">
              <Image
                src={"/assets/logo-blue.svg"}
                quality={100}
                width={56}
                height={56}
                alt="GoPaddi logo"
              />
            </div>
            <div className="text flex flex-col gap-3">
              <p>
                <span className="font-semibold">Oluwatosin</span> has invited
                you to join their{" "}
                <span className="font-semibold">Bahamas Family Trip</span> on
                GoPaddi! GoPaddi is the perfect platform to plan amazing group
                trips together.
              </p>
              <div className="flex flex-col">
                <p>
                  With GoPaddi, you and{" "}
                  <span className="font-semibold">Oluwatosin</span> can:
                </p>
                <ul className="list-disc list-inside">
                  <li>
                    Collaborate on the itinerary: Add ideas and build a trip
                    schedule that works for everyone.
                  </li>
                  <li>
                    Share travel resources: Find flights, hotels, and activities
                    all in one place.
                  </li>
                  <li>
                    Chat and share updates: Keep everyone in the loop with trip
                    details and get excited together!
                  </li>
                </ul>
              </div>
              <p>
                Click the button below to join GoPaddi and start planning your
                unforgettable{" "}
                <span className="font-semibold">Bahamas Family Trip</span> with{" "}
                <span className="font-semibold">Oluwatosin!</span>
              </p>

              <button className="flex items-center justify-center w-full gap-2 bg-white p-2 rounded border border-[#98A2B3] hover:bg-gray-100">
                <img src="/assets/google.png" alt="Google logo" />
                <span>Sign in with Google</span>
              </button>
            </div>
          </section>
        )}

        {/* TRIP ITINERIES */}
        <section id="itineries" className="mt-20">
          <header className="mb-4">
            <h2 className="text-[#1D2433] font-semibold">Trip itineraries</h2>
            <p className="text-sm text-[#647995] font-medium">
              Your trip itineraries are placed here
            </p>
          </header>

          {/* flights */}
          <section id="flights" className="bg-[#F0F2F5] rounded p-5">
            <header className="flex items-center justify-between py-2 mb-4">
              <p className="text-[#1D2433] flex items-center gap-2 font-semibold ">
                <AirplaneInFlight size={23} weight="bold" />
                Flights
              </p>
              <Link
                href={"#"}
                className="text-sm bg-white hover:bg-primary100 ease-linear duration-150 text-primary600 py-2 px-4 font-medium rounded"
              >
                Add Flights
              </Link>
            </header>

            {/* Flight listings here */}
            <div className="flex flex-col gap-5">
              {flightList?.length > 0 ? (
                flightList?.map((flight: any, index: number) => (
                  <SelectedFlight key={index} />
                ))
              ) : (
                <div className="empty h-[274px] bg-white flex flex-col items-center justify-center gap-2 rounded">
                  <Image
                    src={"/assets/flight-empty.svg"}
                    width={100}
                    height={52}
                    alt=""
                  />
                  <p className="font-bold text-sm">No Request yet</p>
                  <Link
                    href={"#"}
                    className="inline-block py-2 px-8 rounded bg-primary600 text-white hover:bg-primary700 ease-linear duration-150 text-sm"
                  >
                    Add Flight
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* hotels */}
          <section className="hotels bg-[#344054] rounded p-5 mt-5" id="hotels">
            <header className="flex items-center justify-between py-2 mb-4">
              <p className="text-white flex items-center gap-2 font-medium tracking-wide ">
                <Buildings size={23} weight="bold" />
                Hotels
              </p>
              <Link
                href={"#"}
                className="text-sm bg-white hover:bg-primary100 ease-linear duration-150 text-primary600 py-2 px-4 font-medium rounded"
              >
                Add Hotels
              </Link>
            </header>

            {/* Hotel listing here */}
            <div className="flex flex-col gap-5">
              {hotelList?.length > 0 ? (
                hotelList?.map((hotel: any, index: number) => (
                  <SelectedHotel key={index} />
                ))
              ) : (
                <div className="empty h-[274px] bg-white flex flex-col items-center justify-center gap-2 rounded">
                  <Image
                    src={"/assets/hotel-empty.svg"}
                    width={70}
                    height={70}
                    alt=""
                  />
                  <p className="font-bold text-sm">No Request yet</p>
                  <Link
                    href={"#"}
                    className="inline-block py-2 px-8 rounded bg-primary600 text-white hover:bg-primary700 ease-linear duration-150 text-sm"
                  >
                    Add Hotel
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* ACTIVITIES */}
          <section
            className="hotels bg-primary700 rounded p-5 mt-5"
            id="hotels"
          >
            <header className="flex items-center justify-between py-2 mb-4">
              <p className="text-white flex items-center gap-2 font-medium tracking-wide ">
                <RoadHorizon size={23} weight="bold" />
                Activities
              </p>
              <Link
                href={"#"}
                className="text-sm bg-white hover:bg-primary100 ease-linear duration-150 text-primary600 py-2 px-4 font-medium rounded"
              >
                Add Activities
              </Link>
            </header>

            {/* Activity listing here */}
            <div className="flex flex-col gap-5">
              {ActivityList?.length > 0 ? (
                ActivityList?.map((hotel: any, index: number) => (
                  <SelectedActivity key={index} />
                ))
              ) : (
                <div className="empty h-[274px] bg-white flex flex-col items-center justify-center gap-2 rounded">
                  <Image
                    src={"/assets/activities-empty.svg"}
                    width={56}
                    height={72}
                    alt=""
                  />
                  <p className="font-bold text-sm">No Request yet</p>
                  <Link
                    href={"#"}
                    className="inline-block py-2 px-8 rounded bg-primary600 text-white hover:bg-primary700 ease-linear duration-150 text-sm"
                  >
                    Add Activities
                  </Link>
                </div>
              )}
            </div>
          </section>
        </section>
      </main>

      {/* Page total price and cta's */}
      <section className="fixed left-0 right-0 py-2 px-16 w-full bg-[#F9FAFB] bottom-0 z-50 flex justify-end border-t border-t-[#D0D5DD]">
        <div className="w-[80%]  flex items-center justify-between">
          <div className="">
            <h4 className="flex items-center gap-2 text-[#676E7E]">
              <span>Total Price:</span>
              <p className="font-bold text-2xl flex items-center text-[#1D2433]">
                <span>
                  <CurrencyNgn />{" "}
                </span>
                <span>{addCommasToNumber(1123450)}.00</span>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info
                        size={18}
                        className="text-primary600 ml-2"
                        weight="bold"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/70">
                      <div className="flex flex-col gap-2">
                        <div className="">
                          <h4 className="text-[#ABABAB] font-normal">
                            Flights
                          </h4>
                          <p className="text-white flex items-center gap-1">
                            <CurrencyNgn size={18} />
                            110,000{" "}
                          </p>
                        </div>
                        <div className="">
                          <h4 className="text-[#ABABAB] font-normal">Hotels</h4>
                          <p className="text-white flex items-center gap-1">
                            <CurrencyNgn size={18} />
                            110,000{" "}
                          </p>
                        </div>
                        <div className="">
                          <h4 className="text-[#ABABAB] font-normal">
                            Activities
                          </h4>
                          <p className="text-white flex items-center gap-1">
                            <CurrencyNgn size={18} />
                            110,000{" "}
                          </p>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
            </h4>
          </div>
          <div className="flex items-center gap-2 w-[35%]">
            <Button className="text-primary600 bg-primary100 rounded hover:bg-primary200 ease-linear duration-150 w-[50%]">
              Save to draft
            </Button>
            <Button
              onClick={() =>
                router.push(
                  "/gopal/trip-planner/trip-booking-flow?step=traveller-confirmation",
                )
              }
              className="bg-primary600 rounded text-white hover:bg-primary700 ease-linear duration-150 w-[50%]"
            >
              Next
            </Button>
          </div>
        </div>
      </section>

      <Suspense>
        <FlightDetailsModal />
        <PriceDetailsModal />
        <HotelDetailsModal />
        <ActivitiesDetailsModal />
        <InviteModal />
        <ShareModal />
      </Suspense>
    </>
  );
};

export default Page;
