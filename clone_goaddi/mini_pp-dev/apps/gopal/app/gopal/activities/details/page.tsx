"use client";

import { useEffect, useState } from "react";
import ResultFilter from "@/components/ResultFilter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useRef } from "react";
import Liberty from "./Components/Liberty";
import Description from "./Components/Description";
import MeetUP from "./Components/MeetUP";
import Form from "./Components/Form";
import Covered from "./Components/Covered";
import Itinerary from "./Components/Itinerary";
import Policies from "./Components/Policies";
import Review from "./Components/Review";
// import Faq from "./Components/Faq";
import PageSearch, { SearchBar } from "../../components/page-search";
import { DateSelect } from "../../components/page-search/date-select";
import { PassengerSelect } from "../../components/page-search/passengers-select";

import {
  ILocationOptions,
  LocationSelect,
} from "../../components/page-search/location-select";
import { useRouter, useSearchParams } from "next/navigation";
import Faq from "./Components/Faq";
import FeatureActivities from "@/components/activities/featured-activities";
import { detailActivities } from "@/axios/endpoints/activities.endpoint";
import { date } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import SearchComponent from "../components/search-components";
import CarouselGallery from "../components/carousel-gallery";
import ActivityHeader from "./Components/ActivityHeader";
// import detailsJson from './detail.json';
// import Carousel, { CarouselSpacing } from "./Components/Carousel";
// import Experience from "./Components/Experience";

const ActivitiesPage = () => {
  const [details, setDetails] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const btnDescription = useRef<HTMLDivElement | null>(null);
  const btnCovered = useRef<HTMLDivElement | null>(null);
  const btnMeetUp = useRef<HTMLDivElement | null>(null);
  const btnItinerary = useRef<HTMLDivElement | null>(null);
  const btnPolicies = useRef<HTMLDivElement | null>(null);
  const btnReview = useRef<HTMLDivElement | null>(null);
  const btnFaq = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const scrollToElement = (
    ref: React.MutableRefObject<HTMLDivElement | null>,
  ) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const searchParams = useSearchParams();
  const searchId = searchParams.get("searchId");
  const activityCode = searchParams.get("activity-code");
  const destination = searchParams.get("destination");
  const price = searchParams.get("price");

  const payload = {
    searchId,
    activityCode,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await detailActivities(payload);
        setDetails(data?.data[0]);
        setIsLoading(data?.success ?? false);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchData();
  }, [detailActivities]);

  const [presentTab, setPresentTab] = useState("");

  function selectTab(
    tab: string,
    ref: React.MutableRefObject<HTMLDivElement | null>,
  ) {
    setPresentTab(tab);
    scrollToElement(ref);
  }

  // if (details) {
  //   console.log(
  //     details?.activityPriceArray[0]?.adultPrice +
  //       details?.activityPriceArray[0]?.childPrice,
  //   );
  // }

  return (
    <>
      {!isLoading ? (
        <div className="space-y-2 p-10">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>

          <Skeleton className="h-4 w-64 mt-4" />
          <Skeleton className="h-4 w-52" />
          <Skeleton className="h-4 w-48" />

          <div className="flex items-center space-x-4 mt-4">
            <Skeleton className="h-72 w-4/6" />
            <Skeleton className="h-72 w-2/6" />
          </div>
        </div>
      ) : (
        <main className="space-y-6 mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/gopal/activities">
                  Activities
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <p onClick={() => router.back()} className="cursor-pointer">
                  Search Result
                </p>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{details?.ActivityName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className=" w-full bg-white p-5 relative">
            <div className="p-10">
              <CarouselGallery imageGallery={details?.multiImage} />
            </div>

            {/* <Liberty
              meetUpPoint={String(destination)}
              adultPrice={details?.activityPriceArray[0]?.adultPrice}
              activityName={details?.ActivityName}
              departureAndReturn={details?.DepartureAndReturn}
            /> */}

            <ActivityHeader
              meetUpPoint={String(destination)}
              adultPrice={String(price)}
              activityName={details?.ActivityName}
              departureAndReturn={details?.DepartureAndReturn}
            />

            <div className="flex flex-wrap gap-4 ms-2 mt-10 border-b-2 sticky top-[28px]">
              <button
                className={
                  presentTab == "description"
                    ? "border-0 outline-0 font-bold text-base  border-b-2 py-4 border-blue-600 text-black"
                    : "border-0 outline-0 font-bold text-base text-gray-500"
                }
                onClick={() => selectTab("description", btnDescription)}
              >
                Description
              </button>
              <button
                className={
                  presentTab == "what_is_covered"
                    ? "border-0 outline-0 font-bold text-base  border-b-2 py-4 border-blue-600 text-black"
                    : "border-0 outline-0 font-bold text-base text-gray-500"
                }
                onClick={() => selectTab("what_is_covered", btnCovered)}
              >
                What's Covered
              </button>
              <button
                className={
                  presentTab == "meeting_up"
                    ? "border-0 outline-0 font-bold text-base  border-b-2 py-4 border-blue-600 text-black"
                    : "border-0 outline-0 font-bold text-base text-gray-500"
                }
                onClick={() => selectTab("meeting_up", btnMeetUp)}
              >
                Meeting Up
              </button>
              {/* <button
                className={
                  presentTab == "itinerary_breakdown"
                    ? "border-0 outline-0 font-bold text-base  border-b-2 py-4 border-blue-600 text-black"
                    : "border-0 outline-0 font-bold text-base text-gray-500"
                }
                onClick={() => selectTab("itinerary_breakdown", btnItinerary)}
              >
                Itinerary Breakdown
              </button> */}
              <button
                className={
                  presentTab == "policies"
                    ? "border-0 outline-0 font-bold text-base  border-b-2 py-4 border-blue-600 text-black"
                    : "border-0 outline-0 font-bold text-base text-gray-500"
                }
                onClick={() => selectTab("policies", btnPolicies)}
              >
                Policies
              </button>
              {/* <button
                className={
                  presentTab == "reviews"
                    ? "border-0 outline-0 font-bold text-base  border-b-2 py-4 border-blue-600 text-black"
                    : "border-0 outline-0 font-bold text-base text-gray-500"
                }
                onClick={() => selectTab("reviews", btnReview)}
              >
                Reviews
              </button> */}
              {/* <button
                className={
                  presentTab == "faq"
                    ? "border-0 outline-0 font-bold text-base  border-b-2 py-4 border-blue-600 text-black"
                    : "border-0 outline-0 font-bold text-base text-gray-500"
                }
                onClick={() => selectTab("faq", btnFaq)}
              >
                FQAs
              </button> */}
            </div>

            <div className="flex w-full mt-5 ">
              <div className="w-8/12 space-y-8">
                {/* uncomment this if total price api integration is available */}
                <div ref={btnDescription}>
                  <Description
                    description={
                      details?.discription &&
                      details?.discription.replace(/<[^>]*>/g, "")
                    }
                  />
                </div>
                <hr />
                <div ref={btnCovered}>
                  <Covered coveredData={details?.included} />
                </div>
                <hr />
                <div ref={btnMeetUp}>
                  <MeetUP meetUpPoint={String(destination)} />
                </div>

                {/* <div ref={btnItinerary}>
                  <Itinerary />
                </div> */}
                <div ref={btnPolicies}>
                  <Policies data={details?.cancellation} />
                </div>
              </div>
              <div className="w-4/12 sm:mx-10 ">
                <Form />
              </div>
            </div>
            {/* <div className="mx-0">
              <Review ref={btnReview} />
              <Faq />
              <div className="container-fluid p-6">
                <h1 className="text-2xl font-bold mb-4">
                  Looking for Similar Experiences?
                </h1>
                <FeatureActivities />
              </div>
            </div> */}
          </div>
        </main>
      )}
    </>
  );
};

export default ActivitiesPage;
