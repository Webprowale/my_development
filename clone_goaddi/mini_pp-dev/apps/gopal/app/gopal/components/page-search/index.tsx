"use client";

import React, { useState } from "react";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { PiUsersLight } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { MdVerifiedUser } from "react-icons/md";
import { ActivitiesHeaderInfo } from "../../activities/activities-header-info";
import { Flex } from "@/components/ui/flex";
import { Button } from "@/components/ui/button";
import { ILocationOptions, LocationSelect } from "./location-select";
import { DateSelect } from "./date-select";
import { PassengerSelect } from "./passengers-select";
import { cn } from "@/lib/utils";
import Spinner from "@/components/goui/spinner";
import { AirplaneTilt } from "@phosphor-icons/react";
import { ArrowLeft } from "lucide-react";

interface IPageHeader {
  pageTitle: string;
  pageDescription?: string;
  searchUrl?: string;
  searchMode?: "flights" | "hotels";
  backgroundImage?: string;
  children: React.JSX.Element;
  tabComponent?: React.JSX.Element;
}

const PageSearch = ({
  pageTitle,
  pageDescription,
  backgroundImage,
  children,
  tabComponent,
}: IPageHeader) => {
  const styles = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <section style={styles} className="md-[0] relative md:p-4 bg-cover">
      <div className="text-black bg-white px-[1rem] py-[1.125rem] md:bg-[transparent] md:px-[unset] md:py-[unset] md:text-white ">
        <h3 className="text-[18px] font-[700] flex items-center gap-[0.75rem]     md:text-2xl md:font-bold">
        <ArrowLeft size={20}  className="block md:hidden"/>
        <span>
        {pageTitle}
        </span>
          </h3>
        {pageDescription && (
          <p className="hidden md:block w-[40%] font-medium">{pageDescription}</p>
        )}
      </div>

      <Flex
        gap={5}
        col
        className={cn("relative p-4 md mt-20 sm:bg-searchBgGradient md:bg-justWhite rounded rounded-tl-none")}
      >
        {/* tabs */}
        {tabComponent && tabComponent}
        {children}
        <Flex between className="w-full hidden md:block">
          <Flex gap={1}>
            <MdVerifiedUser />
            <span>We guarantee the best value on your choice</span>
          </Flex>
          <Flex gap={1}>
            <span>Provided by </span>
            <img
              src="/assets/qwikflight.svg"
              alt="flight image"
            />
          </Flex>
        </Flex>
      </Flex>
    </section>
  );
};

interface ISearchBar {
  children: React.JSX.Element;
  handleSearch: () => void;
  isLoading?: boolean;
}
const SearchBar = ({ children, isLoading, handleSearch }: ISearchBar) => {
  return (
    // <div>
      <Flex gap={1} className="w-full h-[100%] bg-white p-[1rem]  flex-col md:bg-[transparent] md:p-[unset] md:flex-row md:h-[100px]">
      {children} 
      <Button onClick={handleSearch} className="py-[1.25rem] w-[100%] md:w-[96px] h-full">
        {!isLoading ? 
        <>
        <FiSearch color="white" className="hidden md:block" size={22} /> 
        <p className="block  md:hidden text-[1rem] font-[900]">Search</p>
        </>
        : <Spinner />}
      </Button>


      <Flex gap={1} className="my-[18px] md:hidden">
            <span>Provided by </span>
            <img src="/assets/qwikflight.svg" alt="flight image" />
          </Flex>
    </Flex>
    // </div>
  );
};

export { PageSearch as default, SearchBar };
