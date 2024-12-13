"use client";

import Link from "next/link";
import GoButton from "@/components/goui/button";
import StudySimpleStep from "./components/StudySimpleStep";
import SchoolCard from "./components/SchoolCard";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getStudyAllSchool } from "@/axios/endpoints/study.endpoint";
import { Skeleton } from "@/components/ui/skeleton";
import FourSimpleStep from "./fourSimpleStep.svg";
import Image from "next/image";

export default function StudyHome() {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllSchool"],
    queryFn: () => getStudyAllSchool(),
  });

  const renderSkeletons = () =>
    Array.from({ length: 3 }).map((_, index) => (
      <div className="space-y-2" key={index}>
        <Skeleton className="h-36 w-full" />
      </div>
    ));

  const heroSectionBtnClass =
    "block py-[1rem] px-[1.5rem] md:px-[2.5rem] font-[500]  rounded-[4px] ";
  const route = useRouter();
  return (
    <div className="bg-white">
      {/*hero section start  */}
      <section
        className="w-[100%] md:h-[80vh] md:flex md:items-center md:justify-center"
        style={{
          background: "url(/assets/study/hero-sectionbg.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* hero section */}
        <div
          className="text-center py-[2rem] md:w-[600px]"
          // style={{'border':'1px solid red'}}
        >
          <h1 className="font-[900] text-[#FFFFFF] text-[2rem] md:text-[3.5rem]">
            Find Your Study Fit
          </h1>
          <p className="text-[#FFFFFF] text-[1rem] pt-[0.5rem] pb-[1.5rem] md:flex md:flex-col md:pt-[.2rem] md:pb-[1rem]">
            <span>
              Take our free eligibility assessment to get match with the perfect
              program
            </span>
            <span className="md:flex items-center gap-[0.563rem] md:justify-center text-center">
              <span> Provided by</span>
              <img
                src="/assets/study/studimatch.svg"
                alt="studimatch image"
                className="block mx-auto md:mx-[unset]"
              />
            </span>
          </p>
          <div className="flex flex-col items-center  md:flex-row gap-[0.5rem] justify-center">
            <GoButton
              className={`${heroSectionBtnClass}   text-[#FFFFFF]  text-[1.125rem] md:text-[1.125rem]`}
              onClick={() => {
                route.push("/gopal/study/elegibility-assesment");
              }}
            >
              Take Assessment
            </GoButton>
            <GoButton
              onClick={() => {
                route.push("/gopal/study/expore-schools?search=all");
              }}
              className={`${heroSectionBtnClass} border-[#FFFFFF] border-[1px] text-[#FFFFFF] bg-[transparent]  text-[1.125rem] md:text-[1.125rem]`}
            >
              Explore Schools
            </GoButton>
          </div>
        </div>
      </section>
      {/* end hero section start  */}

      {/* GetStarted section start  */}
      <section className="p-[1rem] md:py-[4rem]">
        <h2 className="font-[700] text-[1.5rem] pb-[1.5rem] text-center md:text-[2.5rem]">
          Get Started in 4 Simple Steps
        </h2>

        <Link
          href="/gopal/study/elegibility-assesment"
          className="flex items-center justify-center w-full"
        >
          <Image src={FourSimpleStep} alt="fourSimpleStep" className="" />
        </Link>
      </section>
      {/* End  GetStarted section start  */}
      <br />
      <br />

      {/*  Most Popular Schools */}
      <div className=" md:flex md:items-center md:justify-between relative lg:mb-[-103px] md:overflow-hidden">
        <div
          // public/assets/study/most_popular_shool.svg
          className="bg-primary p-[1rem] md:p-[5.438rem] text-center md:text-left md:w-[50%] relative z-[1]"
          style={{
            background: "url(/assets/study/most_popular_shool_bg_img.svg)",
            backgroundColor: "#0d6efd",
          }}
        >
          <h3 className=" font-[700] text-[#FFFFFF] text-[1.5rem] md:text-[3rem] md:flex md:flex-col md:leading-[56px]">
            <span>Most Popular </span>
            <span>Schools</span>
          </h3>
          <p className="  text-[.8rem]  text-[#FFFFFF] py-[.5rem] max-w-[392px] md:font-[500] md:text-[1rem]">
            Explore our most popular schools, take the eligibility test and get
            matched to the perfect program for you.
          </p>
          <GoButton
            className="text-primary text-[1rem] font-[500] p-[0.75rem] block mx-auto px-[1.5rem] bg-white rounded-[0.25rem] md:mx-[unset]"
            onClick={() => {
              route.push("/gopal/study/expore-schools");
            }}
          >
            See All Schools
          </GoButton>
        </div>

        <div
          className="md:w-[50%] md:h-[399px] overflow-scroll  md:overflow-hidden bg-[transparent]"
          // style={{'border':'1px solid red'}}
        >
          {/* this will carry the scroll cards */}
          <div className="flex items-center  w-[850px] gap-[1.5rem] md:absolute z-[300] md:top-[25%] md:translate-x-[-60px]  2xl:w-[1000px] ">
            {!isLoading && data?.data?.length
              ? data.data[0]?.school
                  ?.slice(0, 3)
                  ?.map((value: any, index: number) => (
                    <Link
                      key={index}
                      href={`/gopal/study/school-details?tab=${value[0].schoolId}`}
                    >
                      <SchoolCard
                        img={value[0].schoolPicture}
                        name={value[0].schoolName}
                        list="21 Available Programs"
                        student="Undergraduate Degrees"
                        location={value[0].schoolLocation}
                      />
                    </Link>
                  ))
              : renderSkeletons()}

            {isLoading ? renderSkeletons() : null}
          </div>
        </div>
      </div>
      {/*  Most Popular Schools */}

      {/* Help Become Student */}
      <div
        // className="hidden"

        className="bg-primary1000 p-[1rem] lg:flex lg:items-center lg:gap-[1.4rem] justify-center md:overflow-hiden
            
            lg:pb-[10rem] lg:pt-[15rem]"
      >
        {/**/}
        <div
          className="hidden lg:block  w-[392px]   h-[100%] relative"
          // style={{'border':'1px solid red'}}
        >
          <div className="flex items-center bg-primary p-[1.313rem] rounded-[4px] gap-[0.813rem] absolute top-[120px] left-[-60px]">
            {/* countries div */}
            <img src="/assets/study/countires-images.svg" alt="" />
            <p className="font-[600] text-[1.125rem] text-[#FFFFFF]">
              15+ Countries
            </p>
          </div>
          <img
            src="/assets/study/black-man-walking-backpack-campus-park.svg"
            alt=""
            className=""
          />

          {/* applicants div */}
          <div className="bg-white rounded-[4px] p-[1.75rem] absolute bottom-[-40px] left-[-60px] text-center ">
            <div className="relative">
              <img
                className="block mx-auto absolute top-[-60px] left-[40px]"
                src="/assets/study/paperplanwithshadows.svg"
                alt=""
              />
              <h3 className="font-[900] text-primary text-[2.5rem] "> 800+</h3>
              <p>Successful Applicants</p>
              <div>{/* lin */}</div>
              <p>
                <span>10+ years</span> Experience
              </p>
            </div>
          </div>
          {/* end applicants div */}
        </div>

        <div className="lg:w-[630px]">
          <h2 className="text-white font-[700] text-[1.5rem] text-left md:text-left md:text-[3rem]">
            Let’s Help You Become an International Student
          </h2>
          <p className="py-[0.75rem] text-[#FFFFFF]   text-[.9rem] text-left md:font-[500] md:text-[1rem]">
            With our extensive network of prestigious partner universities,
            carefully curated programs, and dedicated support staff, we ensure a
            seamless and transformative experience. From vibrant cities to
            breathtaking landscapes, our study abroad opportunities span across
            continents, offering diverse academic disciplines and countless
            possibilities for personal growth.
          </p>

          <div className="text-white font-[500] text-[0.875] flex flex-col gap-[0.563rem] pb-[1.5rem]">
            <p className="flex items-center gap-[0.375rem]">
              <img src="/assets/study/blue_checkmark.svg" alt="" />
              <p>Fastest Visa Processing</p>
            </p>
            <p className="flex items-center gap-[0.375rem]">
              <img src="/assets/study/blue_checkmark.svg" alt="" />
              <p>Expert Immigration Agents</p>
            </p>
            <p className="flex items-center gap-[0.375rem]">
              <img src="/assets/study/blue_checkmark.svg" alt="" />
              <p>Worldwide Affiliation with Educational Institutions</p>
            </p>
          </div>
          <GoButton
            className="py-[1rem] px-[2rem] font-[500] text-[1.125rem] "
            onClick={() => {
              route.push("/gopal/study/elegibility-assesment");
            }}
          >
            Take Eligibility Assessment
          </GoButton>
        </div>
      </div>
      {/* Help Become Student */}

      {/* new Journey */}
      <div
        style={{
          background: "url(/assets/study/beginyoujourneybackground.svg)",
          backgroundColor: "#e7f0ff",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionY: "6px",
        }}
        className=" text-center p-[1.3rem] py-[5rem] "
      >
        <h1 className="text-[1.5rem] font-[700] md:text-[2.25rem] ">
          Begin Your Journey to Study Abroad
        </h1>
        <p className="text-[#676E7E] text-[1rem] font-[500] py-[0.75rem] md:pt-[0.75rem] md:pb-[1.5rem]">
          Take our free eligibility assessment to get match with the perfect
          program
        </p>
        <GoButton
          className="py-[1rem] px-[2rem] "
          onClick={() => {
            route.push("/gopal/study/elegibility-assesment");
          }}
        >
          Take Eligibility Assessment
        </GoButton>
      </div>
      {/* end new Journey */}
    </div>
  );
}

{
  /* <div className="relative flex flex-col items-center justify-center w-full border">
          <img
            className=""
            src="/assets/study/cuirved-line-for-study.svg"
            alt=""
          />
          <div className="flex absolute mt-20">
            <StudySimpleStep
              // XTransform="17px"
              YTransform="25px -left-44"
              img="/assets/study/sentiment_satisfied.svg"
              heading="Take Eligibility Assessment"
              content={
                <>
                  Complete a{" "}
                  <span className="text-primary">free assessment form</span> to
                  help us guide you on the right track
                </>
              }
            />
            <StudySimpleStep
              YTransform="88px"
              img="/assets/study/circlesinbetween.svg"
              heading="We Will Match You With a Course"
              content={
                <>
                  After the assessment, you will get matched with the best
                  programs
                </>
              }
            />
            <StudySimpleStep
              heading="Apply for a Course"
              img={"/assets/study/checkbox.svg"}
              content={
                <>
                  Select your preferred program and submit your interest to
                  apply.
                </>
              }
              YTransform="-27px"
            />
            <StudySimpleStep
              YTransform="66px"
              heading="We Will Reach Out"
              content={
                <>
                  We will contact you to provide further information and
                  assistance
                </>
              }
              img={"/assets/study/chat.svg"}
            />
          </div>
        </div> */
}
