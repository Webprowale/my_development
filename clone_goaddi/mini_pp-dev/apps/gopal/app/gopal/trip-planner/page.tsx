"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TripCard from "@/components/trip-planner/TripCard";
import TripInput from "@/components/trip-planner/TripInput";
import Image from "next/image";
import { X } from "@phosphor-icons/react/dist/ssr";
import { useForm } from "react-hook-form";
import CreateTripModal from "@/components/trip-planner/CreateTripModal";
import { useTripStore } from "@/store/useTripStore";

const TripPlanner = () => {
  const [tripModal, setTripModal] = useState(false);
  const { fetchDraftedTrips, fetchPlannedTrips, draftedTrips, plannedTrips } =
    useTripStore();

  useEffect(() => {
    fetchDraftedTrips();
    fetchPlannedTrips();
  }, []);

  // close the create trip moda;
  const closeTripModal = () => {
    setTripModal(false);
  };

  // open the create trip modal
  const openTripModal = () => {
    setTripModal(true);
  };
  
  return (
    <Suspense>
      <main className="bg-white relative">
        {/* hero section */}
        <section className="hero relative min-h-[80vh] bg-[#EDF7F9] p-5 overflow-hidden ">
          <div className="hero-text w-full md:w-[50%]">
            <h1 className="font-bold text-2xl mb-2">
              Plan Your Dream Trip in Minutes
            </h1>
            <p className="text-[#676E7E] text-sm w-full md:w-[85%]">
              Build, personalize, and optimize your itineraries with our trip
              planner. Perfect for getaways, remote workcations, and any
              spontaneous escapade.
            </p>
          </div>

          {/* beach */}
          <img
            src="/assets/trip-planner/beach.svg"
            alt=""
            className="w-full absolute left-0 right-0 bottom-[-75px]"
          />
          <img
            src="/assets/trip-planner/girl-running.svg"
            alt=""
            className="absolute right-[200px] bottom-[-35px]"
          />
          <img
            src="/assets/trip-planner/hotel.svg"
            alt=""
            className="absolute left-[-50px] w-[380px] h-[282px] bottom-[100px]"
          />
          {/* place image */}
          <div className="places absolute right-[-30px] top-5  scale-[.75]  z-10 flex items-stretch">
            <img
              src="/assets/trip-planner/toronto.svg"
              alt=""
              className="w-full h-full mr-[-30px]"
            />
            <img
              src="/assets/trip-planner/tokyo.svg"
              alt=""
              className="shadow-2xl h-full scale-105 translate-y-[-30px]"
            />
            <img
              src="/assets/trip-planner/paris.svg"
              alt=""
              className="w-full h-full ml-[-20px]"
            />
          </div>

          {/* trip planner inputs */}
          <div className="absolute bottom-10 left-5 w-full">
            <TripInput open={openTripModal} />
          </div>
        </section>

        {/* your trips */}
        <section className="your-trips p-5 w-full pb-16">
          <header>
            <h2 className="text-xl font-bold">Your Trips</h2>
            <p className="text-[#647995] text-sm mb-4">
              Your trip itineraries and planned trips are placed here
            </p>

            <Tabs
              defaultValue="account"
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 max-w-max min-h-[40px] mb-10">
                <TabsTrigger
                  value="account"
                  className=""
                >
                  Planned Trips
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className=""
                >
                  Draft Trips
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="account"
                className="w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                  <TripCard
                    name="Bahamas Family Trip"
                    date="19th April 2024"
                    duration="5 days"
                    location="Paris"
                    isDraft={false}
                  />
                  <TripCard
                    name="Bahamas Family Trip"
                    date="19th April 2024"
                    duration="5 days"
                    location="Paris"
                    isDraft={false}
                  />
                  <TripCard
                    name="Bahamas Family Trip"
                    date="19th April 2024"
                    duration="5 days"
                    location="Paris"
                    isDraft={false}
                  />
                  <TripCard
                    name="Bahamas Family Trip"
                    date="19th April 2024"
                    duration="5 days"
                    location="Paris"
                    isDraft={false}
                  />
                </div>
              </TabsContent>
              <TabsContent value="password">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                  <TripCard
                    name="Bahamas Family Trip"
                    date="19th April 2024"
                    duration="5 days"
                    location="Paris"
                    isDraft={true}
                  />
                  <TripCard
                    name="Bahamas Family Trip"
                    date="19th April 2024"
                    duration="5 days"
                    location="Paris"
                    isDraft={true}
                  />
                  <TripCard
                    name="Bahamas Family Trip"
                    date="19th April 2024"
                    duration="5 days"
                    location="Paris"
                    isDraft={true}
                  />
                  <TripCard
                    name="Bahamas Family Trip"
                    date="19th April 2024"
                    duration="5 days"
                    location="Paris"
                    isDraft={true}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </header>
        </section>
      </main>

      {tripModal && <CreateTripModal close={closeTripModal} />}
    </Suspense>
  );
};

export default TripPlanner;
