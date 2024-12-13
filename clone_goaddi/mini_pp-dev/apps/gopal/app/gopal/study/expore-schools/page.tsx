"use client";

import { useQuery } from "@tanstack/react-query";
import SchoolCard from "../components/SchoolCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import {
  getStudyAllSchool,
  getStudyCountry,
  getStudySchoolByCountry,
} from "@/axios/endpoints/study.endpoint";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { truncateText } from "@/utils/truncateText";

const ExploreSchools = () => {
  const [country, setCountry] = useState("38");
  const [courseCountry, setCourseCountry] = useState<any>([]);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["getAllSchool"],
    queryFn: () => getStudyAllSchool(),
  });

  const { data: schoolData, isLoading: isSchoolDataLoading } = useQuery({
    queryKey: ["getStudySchoolByCountry", searchQuery],
    queryFn: () => getStudySchoolByCountry({ countryId: searchQuery }),
  });

  const { data: countryData, isLoading: isCountryDataLoading } = useQuery({
    queryKey: ["getStudyCountry"],
    queryFn: () => getStudyCountry(),
  });

  useEffect(() => {
    if (!searchQuery) {
      router.push(`/gopal/study/expore-schools?search=all`);
    }
  }, []);

  useEffect(() => {
    if (
      searchQuery === country &&
      schoolData?.data?.[0]?.school?.length > 0 &&
      schoolData?.data?.length > 0
    ) {
      setCourseCountry(schoolData);
    } else if (searchQuery === "all" && data?.data?.[0]?.school?.length > 0) {
      setCourseCountry(data);
    }
  }, [searchQuery, schoolData, data]);

  const renderSkeletons = () =>
    Array.from({ length: 8 }).map((_, index) => (
      <div className="space-y-2" key={index}>
        <Skeleton className="h-36 w-full" />
      </div>
    ));

  let extractedCountry = null;

  if (country !== "all") {
    extractedCountry = countryData?.data?.[0]?.countries?.filter(
      (value: any, _) => value[0].countryId === country,
    )[0][0]?.name;
  }

  function capitalizeFirstLetter(str: string | undefined) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const outputCountry = capitalizeFirstLetter(extractedCountry);

  const heroSectionBtnClass =
    "block py-[1rem] px-[1.5rem] md:px-[2.5rem] font-[500] rounded-[4px]";

  return (
    <div className="bg-white">
      <section
        className="w-[100%] relative md:h-[60vh] md:flex md:items-center md:justify-center"
        style={{
          background: "url(/assets/study/hero-sectionbg.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <img
          className="absolute top-0 left-0 md:top-[32px] md:left-[32px]"
          src="/assets/study/graybackarrow.svg"
          alt=""
          onClick={() => router.back()}
        />
        {/* hero section */}
        <div className="text-center py-[2rem] md:w-[600px]">
          <h1 className="font-[900] text-[#FFFFFF] text-[2rem] md:text-[3.5rem]">
            Explore Schools
          </h1>
          <p className="text-[#FFFFFF] text-[1rem] pt-[0.5rem] pb-[1.5rem] md:flex md:flex-col md:pt-[.2rem] md:pb-[1rem]">
            <span className="md:flex items-center gap-[0.563rem] md:justify-center text-center">
              <span> Provided by</span>
              <img
                src="/assets/study/studimatch.svg"
                alt="studimatch image"
                className="block mx-auto md:mx-[unset]"
              />
            </span>
          </p>
        </div>
      </section>

      <div className="pt-[2.688rem] pb-[2.25rem] flex flex-wrap items-center justify-between px-[2rem]">
        <h2 className="font-[700] text-[1.75rem]">
          {searchQuery === "all" ? "All School" : `Schools in ${outputCountry}`}
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-[0.75rem]">
          <p className="">Showing</p>
          <div>
            <Select
              onValueChange={(value) => {
                setCountry(value);
                router.push(`/gopal/study/expore-schools?search=${value}`);
              }}
            >
              <SelectTrigger className="w-[270px]">
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {countryData?.data?.[0]?.countries?.map(
                    (
                      country: { name: string; countryId: string },
                      index: number,
                    ) => (
                      <React.Fragment key={index}>
                        {!isCountryDataLoading ? (
                          <>
                            {index ? (
                              <SelectItem value={country[0]?.countryId}>
                                {country[0].name}
                              </SelectItem>
                            ) : (
                              <SelectItem value="all">All COUNTRY</SelectItem>
                            )}
                          </>
                        ) : (
                          <p>Country Loading...</p>
                        )}
                      </React.Fragment>
                    ),
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[1.5rem] md:flex-wrap lg:grid lg:grid-cols-4 p-8">
        {courseCountry?.data?.length > 0 &&
        courseCountry?.data?.[0]?.school?.length > 0
          ? courseCountry.data[0].school.map((value: any, index: number) => (
              <Link
                key={index}
                href={`/gopal/study/school-details?tab=${value[0]?.schoolId}`}
              >
                <SchoolCard
                  img={value[0]?.schoolPicture}
                  name={truncateText(value[0]?.schoolName, 22)}
                  list="21 Available Programs"
                  student="Undergraduate Degrees"
                  location={value[0]?.schoolLocation}
                />
              </Link>
            ))
          : renderSkeletons()}
      </div>
    </div>
  );
};

export default ExploreSchools;
