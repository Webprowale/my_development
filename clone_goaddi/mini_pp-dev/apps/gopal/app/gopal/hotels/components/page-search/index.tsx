"use client";

import React, { useState } from "react";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { PiUsersLight } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { MdVerifiedUser } from "react-icons/md";
// import { ActivitiesHeaderInfo } from "../../activities/activities-header-info";
import { Flex } from "@/components/ui/flex";
import { Button } from "@/components/ui/button";
import { ILocationOptions, LocationSelect } from "./location-select";
import { DateSelect } from "./date-select";
import { PassengerSelect } from "./passengers-select";
import { cn } from "@/lib/utils";

interface IPageHeader {
  pageTitle: string;
  pageDescription?: string;
  searchUrl?: string;
  searchMode?: "flights" | "hotels";
  backgroundImage?: string;
  children: React.JSX.Element;
  tabComponent?: React.JSX.Element; //fot flight page with tabs
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
    <section style={styles} className="relative p-4 bg-cover">
      <div className="text-white">
        <h3 className="text-2xl font-bold">{pageTitle}</h3>
        {pageDescription && (
          <p className="w-[40%] font-medium">{pageDescription}</p>
        )}
      </div>

      <Flex
        gap={5}
        col
        className={cn("relative p-4 mt-20 bg-white rounded rounded-tl-none")}
      >
        {/* tabs */}
        {tabComponent && tabComponent}
        {children}
        <Flex between className="w-full">
          <Flex gap={1}>
            <MdVerifiedUser />
            <span>We guarantee the best value on your choice</span>
          </Flex>

          <Flex gap={1}>
            <span>Provided by </span>
            <img src="/assets/qwikflight.svg" alt="flight image" />
          </Flex>
        </Flex>
      </Flex>
    </section>
  );
};

interface ISearchBar {
  children: React.JSX.Element;
  handleSearch: () => void;
}
const SearchBar = ({ children, handleSearch }: ISearchBar) => {
  return (
    <Flex gap={1} className="w-full h-[100px]">
      {children}
      <Button onClick={handleSearch} className="w-[96px] h-full">
        <FiSearch color="white" size={22} />
      </Button>
    </Flex>
  );
};

export { PageSearch as default, SearchBar };
