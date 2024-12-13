"use client";

import MyTrip from "@/components/trip-timeline/MyTrip";
import TimelineVideoSuccessModal from "@/components/trip-timeline/TimelineVideoSuccessModal";
import TimelineVIdeos from "@/components/trip-timeline/TimelineVideos";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTimelineStore } from "@/store/useTimelineStore";
import { useTripStore } from "@/store/useTripStore";
import { Gear } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Timeline = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const {
    myTrips,
    fetchUsersTrips,
    addedTrips,
    fetchUserAddedTrips,
    fetchUserTimelineVideos,
    timelineVideos,
  } = useTripStore();

  const closeReadyModal = () => {
    setIsReady(false);
  };

  useEffect(() => {
    fetchUsersTrips();
    fetchUserAddedTrips();
    fetchUserTimelineVideos();
  }, []);

  return (
    <>
      <main className="w-full bg-white pb-5 mb-5 min-h-[80vh]">
        <header className="relative p-5 flex items-start justify-between">
          <div className="">
            <h1 className="font-bold text-2xl mb-1">Trip Timeline</h1>
            <p className="text-[#676E7E] text-sm leading-relaxed w-full md:w-[60%]">
              Share your adventures and join friends on theirs! See your trips
              here and see what exciting journeys unfold in your circle.
            </p>
          </div>

          <Link href={"/gopal/settings"}>
            <Gear size={32} />
          </Link>
        </header>

        {/* Trip toggle */}
        <div className="">
          <Tabs
            defaultValue="my"
            className="w-full h-full"
          >
            <div className="px-5">
              <TabsList className="grid w-full grid-cols-3 max-w-max min-h-[40px] mb-5">
                <TabsTrigger
                  value="my"
                  className=""
                >
                  My Trips
                </TabsTrigger>
                <TabsTrigger
                  value="added"
                  className=""
                >
                  Trips added to
                </TabsTrigger>
                <TabsTrigger
                  value="videos"
                  className=""
                >
                  Trip timeline videos
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent
              value="my"
              className="w-full h-full"
            >
              {myTrips?.length > 0 ? (
                <div className="trips-list flex flex-col">
                  {myTrips.map((trip: any, index: number) => (
                    <MyTrip
                      id={trip?.tripId}
                      name={trip?.tripTitle}
                      description={trip?.tripDescription}
                      tag={trip?.tripStyle}
                      peopleCount={trip?.tripPeoplesCount}
                      peopleData={trip?.tripPeoplesData}
                      isAccepted={true}
                    />
                  ))}
                </div>
              ) : (
                // Empty state for my trips tab
                <div className="flex flex-col h-full items-center justify-center gap-2 py-20">
                  <Image
                    src={"/assets/trip-timeline/empty-trips.svg"}
                    width={"268"}
                    height={"150"}
                    alt=""
                    className=""
                  />
                  <h3 className="font-bold inline-block text-lg">
                    No trips added yet
                  </h3>
                  <p className="text-[#676E7E] text-sm w-[32%] mx-auto text-center">
                    No trips added yet. Start planning your next adventure
                  </p>
                  <Link
                    href={"/gopal/trip-planner"}
                    className="inline-block max-w-max py-3 px-12 text-sm bg-primary600 rounded hover:bg-primary700 ease-linear duration-150 text-white font-bold"
                  >
                    Add a new trip
                  </Link>
                </div>
              )}
            </TabsContent>
            <TabsContent value="added">
              {addedTrips?.length > 0 ? (
                <div className="trips-list flex flex-col"></div>
              ) : (
                // Empty state for trips you were added to tab
                <div className="flex flex-col h-full items-center justify-center gap-2 py-20">
                  <Image
                    src={"/assets/trip-timeline/empty-trips.svg"}
                    width={"268"}
                    height={"150"}
                    alt=""
                    className=""
                  />
                  <h3 className="font-bold inline-block text-lg mt-4">
                    Your trip list is empty!
                  </h3>
                  <p className="text-[#676E7E] text-sm w-[32%] mx-auto text-center">
                    No trips added yet. Start planning your next adventure
                  </p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="videos">
              {timelineVideos?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
                  <TimelineVIdeos />
                  <TimelineVIdeos />
                  <TimelineVIdeos />
                  <TimelineVIdeos />
                  <TimelineVIdeos />
                </div>
              ) : (
                // Empty state for trips you were added to tab
                <div className="flex flex-col h-full items-center justify-center gap-2 py-20">
                  <Image
                    src={"/assets/trip-timeline/empty-video.svg"}
                    width={"189"}
                    height={"140"}
                    alt=""
                    className=""
                  />
                  <h3 className="font-bold inline-block text-lg mt-4">
                    No Trip timeline video Yet
                  </h3>
                  <p className="text-[#676E7E] text-sm w-[32%] mx-auto text-center">
                    No trips added yet. Start planning your next adventure
                  </p>
                  <Link
                    href={"/gopal/trip-planner"}
                    className="inline-block max-w-max py-3 px-12 text-sm bg-primary600 rounded hover:bg-primary700 ease-linear duration-150 text-white font-bold"
                  >
                    Add a new trip
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* timeline is ready modal */}
      {isReady && <TimelineVideoSuccessModal close={closeReadyModal} />}
    </>
  );
};

export default Timeline;
