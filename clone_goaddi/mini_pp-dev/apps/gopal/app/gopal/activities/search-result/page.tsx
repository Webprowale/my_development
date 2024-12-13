"use client";

import React from "react";
import Image from "next/image";
import { MdFormatListBulleted } from "react-icons/md";
import { PiGridFour } from "react-icons/pi";
import Activities from "./activities";
import { useEffect, useState } from "react";
import ListActivities from "./list-activities";
import { TbArrowsUpDown } from "react-icons/tb";
import { useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getUserId } from "@/lib/get-userId";
import { Skeleton } from "@/components/ui/skeleton";
import SearchComponent from "../components/search-components";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { searchActivities } from "@/axios/endpoints/activities.endpoint";
import ResultFilter from "@/components/ResultFilter";

const ActivitiesPage = () => {
  const [Viewtype, Setviewtype] = useState(1);
  const [_, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const adult = searchParams.get("adult");
  const child = searchParams.get("child");
  const cityId = searchParams.get("cityId");
  const returnDat = searchParams.get("return");
  const countryId = searchParams.get("countryId");
  const destination = searchParams.get("destination");
  const departureDat = searchParams.get("departure");
  const user = getUserId();

  const [payload, setPayload] = useState({
    userId: user,
    location: destination,
    date: `${departureDat} - ${returnDat}`,
    adultNo: adult,
    childNo: child,
    childAges: Array(Number(child)).fill(1),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["searchActivities", payload],
    queryFn: () => searchActivities(payload),
  });

  const extractData = {
    locationName: "",
    searchId: "",
  };

  if (Array.isArray(data?.data) && data?.data.length > 0) {
    extractData.locationName = data?.data[0]?.searchLocation || "";
    extractData.searchId = data?.data[0]?.searchId || "";
  }

  useEffect(() => {
    setPayload({
      userId: user,
      location: destination,
      date: `${departureDat} - ${returnDat}`,
      adultNo: adult,
      childNo: child,
      childAges: Array(Number(child)).fill(1),
    });
  }, [user, destination, departureDat, returnDat, adult, child]);

  
  const renderActivities = () =>
    data?.data[0]?.activityList.map((value: any, index: number) => {
      const activityProps = {
        key: index,
        activityName: value.activityName,
        featureImage: value.featureImage,
        duration: value.duration,
        adultPrice: value.adultPrice,
        searchLocation: extractData?.locationName,
        activityCode: value.activityCode,
        searchId: extractData?.searchId,
        description: value?.description,
      };

      return Viewtype ? (
        <Activities {...activityProps} />
      ) : (
        <ListActivities {...activityProps} />
      );
    });

  return (
    <main className="space-y-6 mb-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gopal/activities">Activities</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Search Result</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <SearchComponent
        isLoading={isLoading}
        cityId={String(cityId)}
        setIsLoading={setIsLoading}
        returnDay={String(returnDat)}
        countryId={String(countryId)}
        location={String(destination)}
        departureDay={String(departureDat)}
        passenger={`, ${adult} Adult, ${child} Child, 0 Infants:`}
      />

      {data?.data && data?.data[0]?.activityList?.length === 0 ? (
        <div className="bg-white flex flex-col justify-between items-center gap-2 -mt-3 py-12">
          <Image
            alt="no activities found"
            width={100}
            height={100}
            src={"/assets/activities/not-found.svg"}
          />
          <p className="font-semibold text-xl text-[#1D2433] text-center w-[433px]">
            {" "}
            Whoops! No Adventures Found (Yet!)
          </p>
          <p className="font-medium text-base text-[#1D2433] text-center w-[400px]">
            {" "}
            We couldn't find any activities matching your search . But fear not,
            explorer! Let's try this again
          </p>
          <p className="mt-2">
            <Link href="/gopal/activities">
              <Button className="px-[32px] py-[16px]">Search Again</Button>
            </Link>
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-row justify-between items-center gap-2 -mt-5">
            <div className="w-4/6">
              <section className="flex justify-between items-center">
                <div className="grid gap-1">
                  <div className="text-base font-semibold">Activities</div>
                  <div className="text-sm text-gray-500">
                    Prioritizing affordability and ease 🎯💡
                  </div>
                </div>
                <div className="font-semibold text-sm">
                  {`Showing ${data?.data ? data?.data[0]?.activityList.length : "0"} Activity Results`}
                </div>
              </section>
            </div>

            <div className="flex justify-end w-2/6">
              <div className="flex justify-end space-x-6 w-full">
                {" "}
                {/* Changed to justify-center */}
                <div className="flex justify-around items-center w-[92px] h-[40px] bg-white rounded-sm border-gray-500 border-[1px] cursor-pointer">
                  <PiGridFour
                    className={
                      Viewtype
                        ? `text-blue-800 font-medium`
                        : `text-gray-800 font-medium`
                    }
                    size={20}
                    cursor-pointer
                    onClick={() => Setviewtype(1)}
                  />
                  <MdFormatListBulleted
                    className={
                      Viewtype
                        ? `text-gray-800 font-medium`
                        : `text-blue-800 font-medium`
                    }
                    size={20}
                    cursor-pointer
                    onClick={() => Setviewtype(0)}
                  />
                </div>
                {/* <div className="flex gap-2 p-2 bg-white text-sm font-medium items-center rounded-sm border-gray-500 border-[1px] px-6 cursor-pointer">
                  <TbArrowsUpDown />
                  <span>Sort by: All</span>
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex flex-rows-2 -mt-6 justify-between gap-2">
            <div className="-mt-2 w-full">
              {isLoading && (
                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div className="space-y-1 p-1 border rounded">
                      <Skeleton className="h-[272px] w-full" />
                      <Skeleton className="h-[210px] w-full" />
                    </div>
                  ))}
                </div>
              )}

              {data?.data && data?.data[0]?.activityList?.length === 0 ? (
                <main className="flex flex-col items-center justify-center pt-10">
                  <Image
                    src="/assets/error-img.svg"
                    width={450}
                    height={369.98}
                    alt="error page illustration"
                    className=" block mt-8"
                  ></Image>

                  <div className="text-center">
                    <h1 className="text-primary1100 font-bold mb-3 text-xl mt-8">
                      No activities found
                    </h1>
                    <p className="text-sm">Kindly try again</p>
                  </div>
                </main>
              ) : (
                <>
                  {Viewtype ? (
                    <div className="grid grid-cols-3 gap-2">
                      {Array.isArray(data?.data) && renderActivities()}
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3 mt-3">
                      {Array.isArray(data?.data) && renderActivities()}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Filter Result Section */}
            {/* <div className="hidden md:block w-2/6 rounded mt-2">
              <ResultFilter
                onChange={(recentUpdatedData: any) => {
                  console.log({ ResultFilter: recentUpdatedData });
                }}
                schema={[
                  {
                    name: "Duration",
                    data: [
                      { id: "1", label: "Less than 1 hour", value: "" },
                      { id: "2", label: "1 hour to 4 hours", value: "" },
                      { id: "3", label: "4 hours to 12 hours", value: "" },
                      { id: "4", label: "12 hours to 1 day", value: "" },
                      { id: "5", label: "1 day to 4 days", value: "" },
                      { id: "6", label: "4 days +", value: "" },
                    ],
                    schemaType: "SelectCheckBoxTabs",
                  },
                  {
                    name: "Choose Your Adventure Time ",
                    data: [
                      {
                        id: "1",
                        label: "Early Bird Specials (Before 12 PM) 🌅 ",
                        value: "",
                      },
                      {
                        id: "2",
                        label: "Afternoon Adventures (After 12 PM) 🌞",
                        value: "",
                      },
                      {
                        id: "3",
                        label: "Evening Escapes & Nightlife (After 5 PM) 🌃",
                        value: "",
                      },
                    ],
                    schemaType: "SelectCheckBoxTabs",
                  },
                  {
                    name: "Tour Style",
                    data: [
                      {
                        id: "1",
                        label: "Social Butterfly Tours 🦋",
                        value: "",
                      },
                      {
                        id: "2",
                        label: "Intimate Adventure 🌄",
                        value: "",
                      },
                      {
                        id: "3",
                        label: "Solo Explorer 🚶‍",
                        value: "",
                      },
                    ],
                    schemaType: "SelectCheckBoxTabs",
                  },

                  {
                    name: "Price Range",
                    schemaType: "minmax",
                    data: [],
                  },

                  {
                    name: "Level of Guidance",
                    data: [
                      {
                        id: "1",
                        label: "Guided Tours 🧭🕵️‍",
                        value: "",
                      },
                      {
                        id: "2",
                        label: "Explore at Your Pace 🚶‍♀️🗺️",
                        value: "20",
                      },
                      {
                        id: "3",
                        label: "Go Solo! 🎧🥾‍",
                        value: "100",
                      },
                    ],
                    schemaType: "SelectCheckBoxTabs",
                  },
                  {
                    name: "Tour Themes",
                    data: [
                      { id: "1", label: "Cultural Immersion 🌍️", value: "" },
                      { id: "2", label: "Festivals & Events 🎉", value: "" },
                      { id: "3", label: "River Cruises 🚢", value: "" },
                      { id: "4", label: "Cycling Adventures 🚴‍♂️", value: "" },

                      { id: "5", label: "Hiking & Trekking 🥾", value: "" },
                      {
                        id: "6",
                        label: "Food & Culinary Delights 🍽️🍲",
                        value: "",
                      },
                      { id: "6", label: "Sailing Excursions ⛵️", value: "" },
                      { id: "6", label: "Northern Lights Chase 🌌", value: "" },

                      { id: "5", label: "Polar Expeditions 🏔️", value: "" },
                      { id: "6", label: "Safari Encounters 🦁", value: "" },
                      { id: "6", label: "Educational Journeys 📚", value: "" },
                      { id: "6", label: "Wellness Retreats ‍️🌿", value: "" },
                    ],
                    schemaType: "SelectCheckBoxTabs",
                  },
                ]}
              />
            </div> */}
          </div>
        </>
      )}
    </main>
  );
};

export default ActivitiesPage;
