"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Flex } from "@/components/ui/flex";
import Paragraph from "@/components/ui/typography/paragraph";
import Head1 from "@/components/ui/typography/Head1";
import { cn } from "@/lib/utils";
import { SquaresFour } from "@phosphor-icons/react/dist/icons/SquaresFour";
import { Student } from "@phosphor-icons/react/dist/icons/Student";
import { Planet } from "@phosphor-icons/react/dist/icons/Planet";
import { Suitcase } from "@phosphor-icons/react/dist/icons/Suitcase";
import { CalendarBlank } from "@phosphor-icons/react/dist/icons/CalendarBlank";
import B3 from "@/components/ui/typography/b3";
import { Check, GridFour } from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllVisa, getVisaType } from "@/axios/endpoints/visa.endpoint";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tabsArray = [
  {
    label: "All Visa",
    icon: SquaresFour,
    link: "/gopal/visa?tabs=all-visa",
    visaType: "all-visa",
  },
  {
    label: "Study Visas",
    icon: Student,
    link: "/gopal/visa?tab=study&value=1",
    visaType: "study",
    visaTypeId: "1",
  },
  {
    label: "Tourist Visas",
    icon: Planet,
    link: "/gopal/visa?tab=tourist&value=2",
    visaType: "tourist",
    visaTypeId: "2",
  },
  {
    label: "Business Visas",
    icon: Suitcase,
    link: "/gopal/visa?tab=business&value=3",
    visaType: "business",
    visaTypeId: "3",
  },
];

export default function AvailableTravelVisa({
  data,
  isFetching,
}: {
  data: any;
  isFetching: boolean;
}) {
  const [currentTab, setCurrentTab] = useState("all-visa");
  const [visaDataType, setVisaDataType] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const allVisa = searchParams.get("tabs");
  const searchValue = searchParams.get("search");
  const tab = searchParams.get("tab");
  const value = searchParams.get("value");

  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width >= 768 && width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: allVisaData, isLoading: isAllVisaDataLoading } = useQuery({
    queryKey: ["getAllVisa"],
    queryFn: () => getAllVisa(),
  });

  const { data: visaData, isLoading: isVisaTypeDataLoading } = useQuery({
    queryKey: ["getVisaType", tab, value],
    queryFn: () =>
      getVisaType({
        visaType: tab,
        visaTypeId: value,
      }),
  });

  React.useEffect(() => {
    if (!allVisaData && !searchValue && !tab) {
      router.push("/gopal/visa?tabs=all-visa", { scroll: false });
    }
  }, [allVisaData, searchValue, tab, router]);

  React.useEffect(() => {
    if (allVisa === "all-visa" && allVisaData) {
      setVisaDataType(allVisaData?.data);
    } else if (currentTab === tab && visaData) {
      setVisaDataType(visaData?.data);
    } else if (searchValue === "search-values") {
      setVisaDataType(data);
    }
  }, [currentTab, allVisaData, visaData, searchValue, data]);

  console.log(data);

  return (
    <section className="bg-white relative h-auto px-8 pb-[88px] md:pb-[224px] py-16">
      {deviceType === "mobile" ? (
        <div className="bg-[#F0F2F5] p-2 rounded h-[54px] mb-6">
          <Select
            onValueChange={(e) => {
              console.log("go here");
              // setCurrentTab(item.visaType);
              router.push(e, { scroll: false });
              setShowAll(false);
              // renderVisas;
            }}
          >
            <SelectTrigger className="w-full border-none h-[38px]">
              <SelectValue
                placeholder={
                  <div className="flex items-center gap-1">
                    <div>
                      <GridFour
                        size={20}
                        weight="fill"
                        className={cn("text-primary")}
                      />
                    </div>
                    <div>All Visa</div>
                  </div>
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {tabsArray?.map((item, i) => (
                  <SelectItem key={i} value={item?.link}>
                    <div className="flex items-center gap-1">
                      <item.icon
                        size={18}
                        className={cn("text-primary")}
                        // weight={
                        //   currentTab === item?.visaType ? "fill" : "regular"
                        // }
                      />
                      <p>{item?.label}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ) : null}

      <Flex col className="">
        <Head1 className="text-lg lg:text-xl xl:text-2xl">
          Available Travel Visas
        </Head1>
        <Paragraph className="text-text-secondary font-medium">
          Select a visa and check your eligibility to get started
        </Paragraph>
      </Flex>

      {/* tabs */}
      {deviceType === "tablet" || deviceType === "desktop" ? (
        <div className="grid grid-cols-4 max-w-[680px] gap-2 mx-auto mt-12 px-3 p-2 bg-[#F0F2F5]">
          {tabsArray?.map((item, i) => (
            <Flex
              key={i}
              gap={2}
              role="button"
              onClick={() => {
                setCurrentTab(item.visaType);
                router.push(item.link);
                setShowAll(false);
                // renderVisas;
              }}
              className={cn(
                "group hover:bg-white rounded w-full min-w-[120px] p-3",
                currentTab === item.visaType && "bg-white font-bold",
              )}
            >
              <item.icon
                size={18}
                className={cn("text-primary")}
                weight={currentTab === item.visaType ? "fill" : "regular"}
              />
              <B3 className="font-medium text-sm group-hover:font-bold group-hover:text-text">
                {item.label}
              </B3>
            </Flex>
          ))}
        </div>
      ) : null}

      {visaDataType && visaDataType.length > 0 ? (
        <section className="vis_list w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 ">
          {!isAllVisaDataLoading && !isVisaTypeDataLoading ? (
            (showAll ? visaDataType : visaDataType.slice(0, 8)).map(
              (item: any, i: number) => {
                let requirements = [];

                try {
                  requirements = JSON.parse(item.requirement1);
                } catch (error) {
                  console.error("Failed to parse requirement1:", error);
                }

                return (
                  <Link
                    href={`/gopal/visa/${i}?visa-type=${item?.visaTypeId}&destination=${item?.destinationId}`}
                    key={i}
                  >
                    <Card className="w-full h-[340px] rounded border-neutral400 p-0 visa_card">
                      <div className="w-full h-[55%] p-4 bg-white rounded-t">
                        <Flex className="w-full items-start" between>
                          <Flex col className="items-start capitalize">
                            <Head1 className="text-base md:text-lg lg:text-xl xl:text-2xl">
                              {item?.country}
                            </Head1>
                            <Head1 className="text-base md:text-lg lg:text-xl xl:text-2xl">
                              {item?.title}
                            </Head1>
                          </Flex>

                          <Flex gap={0} col className="items-end ">
                            <Head1 className="text-base">{item.visaFee}</Head1>
                            <Paragraph className="text-sm text-neutral600">
                              Excl. Visa Fee
                            </Paragraph>
                          </Flex>
                        </Flex>

                        <Flex col className="items-start mt-3 space-y-1">
                          {requirements.map((require: any, idx: number) => (
                            <Flex key={idx}>
                              <Check
                                size={18}
                                className="text-text-secondary"
                              />
                              <B3 className="text-xs font-medium text-text-secondary ml-1">
                                {require.title}
                              </B3>
                            </Flex>
                          ))}
                        </Flex>
                      </div>
                      <div
                        style={{
                          backgroundImage: `url(${item?.banner})`,
                        }}
                        className="visa_card-banner w-full h-[45%] bg-primary relative "
                      >
                        <Flex
                          between
                          className="absolute -top-4 w-full left-0   px-4"
                        >
                          <Flex
                            gap={1}
                            className="bg-information100 p-2 px-3 rounded"
                          >
                            <CalendarBlank
                              size={18}
                              className="text-information900"
                            />
                            <B3 className="text-xs font-medium text-information900">
                              {item.validity}
                            </B3>
                          </Flex>

                          <img
                            src={item.flag}
                            alt="flag"
                            className="flag w-[45px] h-[30px]"
                          />
                        </Flex>
                      </div>
                    </Card>
                  </Link>
                );
              },
            )
          ) : (
            <>
              {Array.from({ length: 8 }).map((_, index) => (
                <div className="space-y-2" key={index}>
                  <Skeleton className="h-28 w-full" />
                  <Skeleton className="h-9 w-full" />
                </div>
              ))}
            </>
          )}
        </section>
      ) : (
        <div className="bg-white flex flex-col justify-between items-center gap-2 mt-10 py-12">
          <Image
            alt="no activities found"
            width={100}
            height={100}
            src={"/assets/activities/not-found.svg"}
          />
          <p className="font-semibold text-xl text-[#1D2433] text-center w-[433px]">
            {" "}
            Whoops! No Visa Found (Yet!)
          </p>
          <p className="font-medium text-base text-[#1D2433] text-center w-[400px]">
            {" "}
            We couldn't find any visa matching your search . But fear not,
            explorer! Let's try this again
          </p>
          <p className="mt-2">
            <Link href="/gopal/visa">
              <Button className="px-[32px] py-[16px]">Search Again</Button>
            </Link>
          </p>
        </div>
      )}

      {visaDataType && visaDataType.length > 8 && !showAll ? (
        <div className="w-full centered mt-16">
          <button
            className={`${
              deviceType === "mobile" ? "w-full" : ""
            } bg-white py-2 px-4 text-primary600 text-sm font-thin border rounded border-primary600`}
            onClick={() => setShowAll(true)}
          >
            Load More
          </button>
        </div>
      ) : null}

      <div className="absolute w-full bottom-0 left-0 overflow-hidden h-[66.89px] md:h-[200px]">
        <Image
          src={"/assets/visa/buildings.png"}
          className="w-full mt-4"
          fill
          alt="building"
        />
      </div>

      <style jsx>
        {`
          .visa_list {
            background-color: green;
          }

          .visa_card-banner {
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            transition: all 0.4s linear;
          }
        `}
      </style>
    </section>
  );
}
