"use client";
import * as React from "react";
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
import { Check, IconWeight } from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const tabsArray = [
  {
    label: "All Visa",
    icon: SquaresFour,
    meta: {},
  },
  {
    label: "Study Visas",
    icon: Student,
    meta: {},
  },
  {
    label: "Tourist Visas",
    icon: Planet,
    meta: {},
  },
  {
    label: "Business Visas",
    icon: Suitcase,
    meta: {},
  },
];

export default function AvailableTravelVisa({
  data,
  isFetching,
  visaTypeId,
  destinationId,
}: {
  data: any;
  isFetching: boolean;
  visaTypeId: string;
  destinationId: string;
}) {
  const [currentTab, setCurrentTab] = React.useState("All Visa");

  console.log(isFetching);
  return (
    <section className="bg-white relative h-auto px-8 pb-[224px] py-16">
      <Flex col className="">
        <Head1>Available Travel Visas</Head1>
        <Paragraph className="text-text-secondary font-medium">
          Select a visa and check your eligibility to get started
        </Paragraph>
      </Flex>

      {/* tabs */}
      <div className="grid grid-cols-4 max-w-[680px] gap-2 mx-auto mt-12 px-3 p-2 bg-[#F0F2F5]">
        {tabsArray.map((item, k) => (
          <Flex
            gap={2}
            role="button"
            className={cn(
              "group hover:bg-white rounded w-full min-w-[120px] p-3",
              currentTab === item.label && "bg-white font-bold",
            )}
          >
            <item.icon
              size={18}
              className={cn("text-primary")}
              weight={currentTab === item.label ? "fill" : "regular"}
            />
            <B3 className="font-medium text-sm group-hover:font-bold group-hover:text-text">
              {item.label}
            </B3>
          </Flex>
        ))}
      </div>

      <section className="vis_list w-full grid grid-cols-4 gap-4 mt-8">
        {!isFetching ? (
          data?.map((item: any, i: number) => {
            let requirements = [];
            let banners = [];

            try {
              requirements = JSON.parse(item.requirement1);
            } catch (error) {
              console.error("Failed to parse requirement1:", error);
            }

            try {
              banners = JSON.parse(item.banner);
            } catch (error) {
              console.error("Failed to parse banner:", error);
            }

            return (
              <Link
                href={`/gopal/visa/${i}?visa-type=${visaTypeId}&destination=${destinationId}`}
              >
                <Card
                  key={i}
                  className="w-full h-[340px] rounded border-neutral400 p-0 visa_card"
                >
                  <div className="w-full h-[55%] p-4 bg-white rounded-t">
                    <Flex className="w-full items-start" between>
                      <Flex col className="items-start capitalize">
                        <Head1 className="text-2xl">{item?.country}</Head1>
                        <Head1 className="text-2xl">{item?.title}</Head1>
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
                          <Check size={18} className="text-text-secondary" />
                          <B3 className="text-xs font-medium text-text-secondary ml-1">
                            {require.title}
                          </B3>
                        </Flex>
                      ))}
                    </Flex>
                  </div>
                  <div
                    style={{
                      backgroundImage: `url(${banners[0]?.image || item?.flag})`,
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
          })
        ) : (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="space-y-2" key={index}>
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </>
        )}
      </section>

      {data && data.length > 8 ? (
        <div className="w-full centered mt-16">
          <button className="bg-white py-2 px-4 text-primary600 text-sm font-thin border rounded border-primary600">
            Load More
          </button>
        </div>
      ) : null}

      <div className="absolute w-full bottom-0 left-0 overflow-hidden h-[200px]">
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
