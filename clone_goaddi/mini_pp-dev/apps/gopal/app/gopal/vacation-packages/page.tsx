"use client";
import React, { useState } from "react";
import FaqAccordion from "@/components/ui/faq-accordion";
import SectionLayout from "@/components/ui/section-layout";
import PageHeader, { SearchBar } from "../components/page-search";
import { faqList } from "../flights/components/dummy";
import { VacationPackageCard } from "@/components/vacation-packages/featured-vacation-card";
import TopDestinations from "@/components/vacation-packages/destinations";
import { Icons } from "@/components/icons";
import {
  ILocationOptions,
  LocationSelect,
} from "../components/page-search/location-select";
import { useRouter } from "next/navigation";
import { PassengerSelect } from "../components/page-search/passengers-select";

type Props = {};

const VacationPackages = (props: Props) => {
  const [fromLocation, setFromLocation] = useState<any>();
  const [toLocation, setToLocation] = useState<ILocationOptions>();
  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [returnDate, setReturnDate] = useState<Date>(new Date());
  const [passengers, setPassengers] = React.useState<string>("");

  const router = useRouter();

  function handleSearch() {
    // TODO: LOGIC TO CONVERT DATA INTO QUERY STRING
    console.log(
      fromLocation,
      toLocation,
      departureDate,
      returnDate,
      passengers,
    );
    router.push("/gopal/flights/search-results/o");
  }

  function handleSwap() {
    setToLocation(fromLocation);
    setFromLocation(toLocation);
  }

  return (
    <main className="mb-8 space-y-6 w-full">
      <PageHeader
        pageTitle={"Vacation Packages"}
        pageDescription={
          "Embark on unforgettable journeys with our curated vacation packages, designed to immerse you in the beauty of travel while ensuring every detail exceeds your expectations."
        }
        backgroundImage="/assets/vacation-packages/vacation-bg.svg"
      >
        <SearchBar handleSearch={handleSearch}>
          <div className="grid w-full h-full grid-cols-4 gap-1">
            <div className="relative col-span-2 gap-1 w-full h-full">
              <LocationSelect
                classNames="w-full h-full"
                // @ts-ignore
                setValue={setFromLocation}
                value={fromLocation}
                label="from"
              />
            </div>
            <div className="relative col-span-2 gap-1 w-full h-full">
              <PassengerSelect
                label="Participants"
                placeholder="1 Adult"
                setValue={setPassengers}
                value={passengers}
              />
            </div>
          </div>
        </SearchBar>
      </PageHeader>

      <SectionLayout
        title={"Featured Vacation Packages"}
        description={
          "Handpicked selection, crafted to deliver unparalleled experiences 🌟"
        }
      >
        <div className="w-full flex items-center flex-wrap justify-between  gap-x-2 gap-y-10">
          {data?.map((d, index) => <VacationPackageCard d={d} key={index} />)}
        </div>
      </SectionLayout>
      <TopDestinations />
      <FaqAccordion faqList={faqList} />
    </main>
  );
};

export default VacationPackages;

const data = [
  {
    name: "Dubai Easter Package",
    days: "5",
    image: "/assets/vacation-packages/vacation-img-1.png",
  },
  {
    name: "Baecation on Miami",
    days: "4",
    image: "/assets/vacation-packages/vacation-img-2.png",
  },
  {
    name: "A Taste of Thailand",
    days: "3",
    image: "/assets/vacation-packages/vacation-img-3.png",
  },
  {
    name: "Paradise in Tokyo",
    days: "1",
    image: "/assets/vacation-packages/vacation-img-4.png",
  },
  {
    name: "Dubai Easter Package",
    days: "5",
    image: "/assets/vacation-packages/vacation-img-1.png",
  },
  {
    name: "Baecation on Miami",
    days: "4",
    image: "/assets/vacation-packages/vacation-img-2.png",
  },
  {
    name: "A Taste of Thailand",
    days: "3",
    image: "/assets/vacation-packages/vacation-img-3.png",
  },
  {
    name: "Paradise in Tokyo",
    days: "1",
    image: "/assets/vacation-packages/vacation-img-4.png",
  },
  {
    name: "Dubai Easter Package",
    days: "5",
    image: "/assets/vacation-packages/vacation-img-1.png",
  },
  {
    name: "Baecation on Miami",
    days: "4",
    image: "/assets/vacation-packages/vacation-img-2.png",
  },
  {
    name: "A Taste of Thailand",
    days: "3",
    image: "/assets/vacation-packages/vacation-img-3.png",
  },
  {
    name: "Paradise in Tokyo",
    days: "1",
    image: "/assets/vacation-packages/vacation-img-4.png",
  },
  {
    name: "Dubai Easter Package",
    days: "5",
    image: "/assets/vacation-packages/vacation-img-1.png",
  },
  {
    name: "Baecation on Miami",
    days: "4",
    image: "/assets/vacation-packages/vacation-img-2.png",
  },
  {
    name: "A Taste of Thailand",
    days: "3",
    image: "/assets/vacation-packages/vacation-img-3.png",
  },
  {
    name: "Paradise in Tokyo",
    days: "1",
    image: "/assets/vacation-packages/vacation-img-4.png",
  },
];
