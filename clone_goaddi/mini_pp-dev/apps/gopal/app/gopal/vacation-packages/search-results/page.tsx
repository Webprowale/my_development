"use client";
import React from "react";
import ResultFilter from "@/components/ResultFilter";
import { VacationPackageCard } from "@/components/vacation-packages/featured-vacation-card";
import { Flex } from "@/components/ui/flex";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import PageHeader from "../../components/page-header";

import Link from "next/link";

type Props = {};

const SearchResults = (props: Props) => {
  return (
    <main className="mb-8 space-y-6 filter_flights w-auto">
      <Link href="/gopal/vacation-packages/search-results">
        <PageHeader
          pageTitle={"Search Result"}
          backgroundImage="/assets/flight/filter-bg.png"
        />
      </Link>

      {/* <DateCarousel /> */}
      <section className="w-auto relative grid grid-cols-10 gap-x-4">
        <div className="relative w-auto col-span-7">
          <div className="grid gap-1">
            <h3 className="text-base font-bold">40 Matching Packages</h3>
          </div>

          <section className="w-full flex items-center flex-wrap justify-between gap-x-2 gap-y-10 h-auto relative mt-4 space-y-3">
            {data?.map((d, index) => <VacationPackageCard d={d} key={index} />)}
          </section>
        </div>

        {/* TODO: FILTER COMPONENT */}
        <div className="w-auto col-span-3 sticky top-11">
          <section className="hidden md:block w-full">
            {/* this iis where the filter wiill be found */}
            <ResultFilter
              onChange={(recentUpdatedData: any) => {
                console.log({ ResultFilter: recentUpdatedData });
              }}
              schema={[
                // {
                //   name: "Shops",
                //   data: [
                //     "Any number of stop",
                //     "Nonstop only",
                //     "1 Stop",
                //     "2 Stops",
                //   ],
                //   schemaType: "SelectMultipleTabs",
                // },

                // {
                //   name: "Cabin",
                //   data: [
                //     { id: "1", label: "Economy", value: "40" },
                //     { id: "2", label: "Premium Economy", value: "50" },
                //     { id: "3", label: "Business Class", value: "120" },
                //     { id: "4", label: "First Class", value: "10" },
                //   ],
                //   schemaType: "RadioTabs",
                // },
                {
                  name: "Duration",
                  data: [
                    { id: "1", label: "1 Day", value: "1" },
                    { id: "2", label: "2 Day", value: "2" },
                    { id: "3", label: "3 Day", value: "3" },
                    {
                      id: "4",
                      label: "4 Day",
                      value: "4",
                    },
                    {
                      id: "5",
                      label: "5 Day",

                      value: "5",
                    },
                    {
                      id: "6",
                      label: "6 Day",
                      value: "6",
                    },
                  ],
                  schemaType: "SelectCheckBoxTabs__hideValue",
                },
                {
                  name: "Package Type",
                  data: [
                    { id: "1", label: "Family🏠", value: "" },
                    { id: "2", label: "Honeymoon👩‍❤️‍👨", value: "2" },
                    { id: "3", label: "Beach🏖️", value: "3" },
                  ],
                  schemaType: "SelectCheckBoxTabs__hideValue",
                },
                {
                  name: "Price Range",
                  schemaType: "minmax",
                  data: [], //
                },
              ]}
            />
          </section>
        </div>
      </section>
    </main>
  );
};

export default SearchResults;

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
