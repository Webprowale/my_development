"use client";
import { useQuery } from "@tanstack/react-query";
import AvailableProgrammCard from "../components/AvailableProgrammCard";
import StudyFooterCard from "../components/StudyFooterCard";
import { MapPin, CaretRight } from "@phosphor-icons/react";
import { getStudyCourse } from "@/axios/endpoints/study.endpoint";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Router } from "lucide-react";

const SchoolDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const schoolId = searchParams.get("tab");

  const { data, isLoading } = useQuery({
    queryKey: ["getStudyCourse"],
    queryFn: () =>
      getStudyCourse({
        schoolId,
      }),
  });

  console.log(data);

  return (
    <div>
      <div className="flex gap-[0.4rem] items-center py-[0.75rem] px-[1rem] md:px-[unset]">
        {/* Bread Crumb */}
        <p className="text-[0.875rem] font-[500] text-[#676E76]">Study</p>
        {/* <p className="text-[#676E76]">{">"}</p> */}
        <CaretRight size={20} />

        <p className="text-[0.875rem] font-[500] text-[#676E76]" onClick={() => router.push(``)}>Schools</p>
        <CaretRight size={20} />
        <p className="text-[0.875rem] font-[500] text-[#000000]">
          Lakehead University
        </p>
      </div>
      <div className="bg-white ">
        <div className="h-[40vh] overflow-hidden flex md:grid md:grid-cols-4 md:h-[382px] ">
          {/* banner image */}
          <img
            src="/assets/study/schooldetails1.svg"
            alt=""
            className=" w-full"
          />
          <img
            src="/assets/study/schooldetails2.svg"
            alt=""
            className=" w-full"
          />
          <img
            src="/assets/study/schooldetails3.svg"
            alt=""
            className=" w-full"
          />
          <img
            src="/assets/study/schooldetails4.svg"
            alt=""
            className=" w-full"
          />
        </div>

        <div className="p-[1rem] md:p-[unset] max-w-[946px] md:mx-auto">
          {/*  header */}
          <div className="">
            <div
              className="flex gap-[.8rem] flex-col  align-center md:gap-[1.438rem] md:flex-row md:items-center md:mt-[-47px]"
              // style={{'border':'1px solid red'}}
            >
              <div className="w-[100px] h-[100px]  md:w-[200px] md:h-[200px] ">
                <img
                  className="w-[100%] h-[100%]"
                  src="/assets/study/lakeheadUniDetail.svg"
                  alt=""
                />
              </div>
              <div>
                <h2 className="font-[700] text-[1.5rem] text-[#1D2433] md:text-[2.5rem]">
                  Lakehead University
                </h2>
                <p className="text-[#676E7E] text-[1rem] font-[500] flex items-center gap-[0.258rem] ">
                  {/* icon */}
                  <MapPin size={20} />
                  <span>Ontario, Canada</span>
                </p>
              </div>
            </div>
            <p className="text-[1rem] text-[#676E7E] font-[500] py-[1rem] md:pt-[3rem]">
              Our mission is to harness the power of impactful learning by
              employing design tools, agile methodologies, and adaptable
              strategies. We aim to assist both instructors and students in
              crafting and navigating their unique learning journeys. Our
              approach is tailored to meet individuals at their current stage,
              precisely when they require support. We achieve this through a
              collaborative, human-centered learning system, ensuring that every
              learner is empowered to attain their desired educational goals.
            </p>
          </div>
          {/* end header */}

          {/* Available Programm */}
          <div className="pt-[2.688rem] pb-[2.25rem] flex flex-wrap items-center  justify-between">
            <h2 className="font-[700] text-[1.3rem] md:text-[2rem]">
              Available Programs
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-[0.75rem] ">
              <p className="text-[#1D2433] text-[1rem] font-[500] ">Showing</p>
              <select>
                <option value="">All Countries</option>
                <option value="">Canada</option>
                <option value="">Germany</option>
              </select>
            </div>
          </div>

          <main className="flex flex-col gap-[1.5rem] md:grid md:grid-cols-3">
            {/* {[...new Array(6)].map((d, index) => (
              <AvailableProgrammCard key={index} cardVariant="v1" />
            ))} */}

            {!isLoading
              ? data?.data[0]?.courses?.map((value: any, index: number) => (
                  <Link
                    href={`/gopal/study/programme?tab=${value[0].courseId}&schoolId=${schoolId}`}
                  >
                    <AvailableProgrammCard
                      img={value[0].mainImage}
                      course={value[0].courseTitle}
                      cardVariant="v1"
                      duration={value[0].duration}
                    />
                  </Link>
                ))
              : null}
          </main>
          {/* end Available Programm */}
          <br />
          <br />
          {/* get matched div */}
          <StudyFooterCard />
          {/* end get matched div */}
        </div>
      </div>
    </div>
  );
};

export default SchoolDetails;
