"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarBlank,
  DotsThreeCircle,
  Eye,
  Gear,
  Question,
  SealCheck,
  UserPlus,
  Users,
  SignOut,
  ShareNetwork,
} from "@phosphor-icons/react";
import Image from "next/image";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/trend-carousel";
import Link from "next/link";
import UploadPost from "@/components/posts/upload";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils";
import { Suspense } from "react";
import PostLoader from "@/app/gopal/post-loader";
import Posts from "@/components/posts/dairy-post";
import ViewPeopleModal from "@/components/trip-timeline/ViewPeopleModal";
import ShareModal from "@/components/trip-timeline/ShareTripModal";
import ShareTripModal from "@/components/trip-timeline/ShareTripModal";
import { Router } from "lucide-react";
import AddPeopleModal from "@/components/trip-timeline/AddPeopleModal";

const Page = () => {
  const [people, setPeople] = useState(false);
  const [shareModalActive, setShareModalActive] = useState(false);
  const [addPeople, setAddPeople] = useState(false);
  const router = useRouter();

  // go back
  const goBack = () => {
    router.back();
  };
  const closePeopleModal = () => {
    setPeople(false);
  };

  const closeShareModal = () => {
    setShareModalActive(false);
  };

  const closeAddPeopleModal = () => {
    setAddPeople(false);
  };
  return (
    <>
      <main className="bg-white rounded min-h-[80vh] p-5">
        <header className="relative">
          <div className="banner relative rounded overflow-hidden">
            <img
              src={"/assets/trip-timeline/trip-banner.svg"}
              className="w-full h-[full]"
              alt=""
            />
            <button
              className="absolute top-4 left-4 w-[40px] h-[40px] rounded bg-[#FFFFFF33] grid place-items-center"
              onClick={() => {
                goBack();
              }}
            >
              <ArrowLeft size={20} weight="bold" className="text-[#344054]" />
            </button>
          </div>
          <div className="trip-details mt-5 flex items-center justify-between">
            <div className="left">
              <h1 className="text-2xl font-bold mb-2">Bahamas Family Trip</h1>
              <div className="">
                <div className="flex items-center w-max">
                  <div className="img-group flex items-center">
                    <img
                      src="/assets/trip-timeline/1.png"
                      alt=""
                      className="w-[30px] h-[30px] object-cover"
                    />
                    <img
                      src="/assets/trip-timeline/2.png"
                      alt=""
                      className="w-[30px] h-[30px] object-cover ml-[-12px]"
                    />
                    <img
                      src="/assets/trip-timeline/3.png"
                      alt=""
                      className="w-[30px] h-[30px] object-cover ml-[-12px]"
                    />
                    <img
                      src="/assets/trip-timeline/4.png"
                      alt=""
                      className="w-[30px] h-[30px] object-cover ml-[-12px]"
                    />
                    <div className="text-[#676E7E] text-sm ml-3">
                      <p>123 people</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right flex items-center gap-4">
              <span className="owner inline-block py-2 px-4 rounded text-sm bg-[#F0F2F5] font-medium">
                Guest Access
              </span>
              <span className="status inline-block py-2 px-6 rounded text-sm bg-primary100 text-primary600 font-medium">
                Joined
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <DotsThreeCircle size={32} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-3 right-0" align="end">
                  <DropdownMenuItem
                    className="flex items-center gap-2 p-4 cursor-pointer"
                    onClick={() => {
                      setPeople(true);
                    }}
                  >
                    <Eye size={20} />
                    <span className="font-medium">View people</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 p-4 cursor-pointer"
                    onClick={() => {
                      setAddPeople(true);
                    }}
                  >
                    <UserPlus size={20} />
                    <span className="font-medium">Add people</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 p-4 cursor-pointer">
                    <Gear size={20} />
                    <span className="font-medium">Manage travel trip</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 p-4 cursor-pointer">
                    <SignOut size={20} />
                    <span className="font-medium">Leave trip timeline</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 p-4 cursor-pointer"
                    onClick={() => {
                      setShareModalActive(true);
                    }}
                  >
                    <ShareNetwork size={20} />
                    <span className="font-medium">Share trip timeline</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 p-4 cursor-pointer">
                    <Question size={20} />
                    <span className="font-medium">About trip timeline</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main section for the page */}
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start gap-6 mt-8">
          <div className="main w-full flex flex-col gap-6">
            <UploadPost classes="border border-[#E4E7EC] rounded" />
            <Suspense fallback={<PostLoader />}>
              <Posts isUser="t" className="border border-[#E4E7EC] rounded" />
              <Posts isUser="t" className="border border-[#E4E7EC] rounded" />
              <Posts isUser="t" className="border border-[#E4E7EC] rounded" />
            </Suspense>
          </div>
          <div className="side flex flex-col sticky top-[100px] gap-4">
            <TripDetails />
            <RecentTrips />
            <Admins />
          </div>
        </section>
      </main>

      {people && <ViewPeopleModal close={closePeopleModal} />}
      {shareModalActive && <ShareTripModal close={closeShareModal} />}
      {addPeople && <AddPeopleModal close={closeAddPeopleModal} />}
    </>
  );
};

// Trip details card on the left side of the page
const TripDetails = () => {
  return (
    <section className="p-4 border border-[#D0D5DD] rounded text-[#1D2433]">
      <h2 className="font-bold text-lg">Bahamas Family Trip</h2>
      <p className="text-[#676E7E] text-sm">
        Gearing up for a tropical escape with my favorite people - the family!
        We'll be soaking up the sun on pristine beaches, exploring hidden coves,
        and creating lasting memories that will make us smile for years to come.
      </p>

      <ul className="mt-10 flex flex-col gap-2">
        <li className="flex items-center gap-2">
          <CalendarBlank size={20} weight="bold" />
          <span className="font-normal">Created February 9, 2022</span>
        </li>
        <li className="flex items-center gap-2">
          <Users size={20} weight="bold" />
          <span className="font-normal">
            Only Admins and Sub-Admins can create a post
          </span>
        </li>
        <li className="flex items-center gap-2">
          <Eye size={20} weight="bold" />
          <span className="font-normal ">
            You can like and comment on posts made here
          </span>
        </li>
      </ul>
    </section>
  );
};

const RecentTrips = () => {
  return (
    <section className="p-4 border border-[#D0D5DD] rounded text-[#1D2433] relative">
      {/* The carousel */}
      <Carousel>
        <header className="mb-5">
          <h2 className="font-bold">Recent Trips</h2>
          <p className="text-[#676E7E] text-sm">
            This shows the list of trips that you have joined
          </p>
        </header>
        <CarouselContent>
          <CarouselItem className="flex flex-col gap-4">
            <RecentTripItem />
            <RecentTripItem />
            <RecentTripItem />
          </CarouselItem>
          <CarouselItem className="flex flex-col gap-4">
            <RecentTripItem />
            <RecentTripItem />
            <RecentTripItem />
          </CarouselItem>
          <CarouselItem className="flex flex-col gap-4">
            <RecentTripItem />
            <RecentTripItem />
            <RecentTripItem />
          </CarouselItem>
          <CarouselItem className="flex flex-col gap-4">
            <RecentTripItem />
            <RecentTripItem />
            <RecentTripItem />
          </CarouselItem>
        </CarouselContent>
        <div className="flex absolute top-2 right-10 ">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  );
};

const RecentTripItem = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/assets/trip-timeline/trip-image.png"
        alt=""
        width={"80"}
        height={"70"}
        className="w-[80px] h-[70px] object-cover rounded"
      />
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-sm">Bahamas Family Trip</h3>
        <p className="text-xs text-[#676E7E]">
          Creating Memories in the Bahamas with my family
        </p>
      </div>
      <Link
        href={"/gopal/trip/jamaica"}
        className="text-xs py-2 px-4 bg-primary600 text-white rounded hover:bg-primary700 ease-linear duration-150"
      >
        View
      </Link>
    </div>
  );
};

// the admin component on the left side of the page
const Admins = () => {
  return (
    <section className="admins p-4 rounded border border-[#D0D5DD] text-[#1D2433] relative">
      <header className="mb-5">
        <h2 className="font-bold">Admins</h2>
        <p className="text-[#676E7E] text-sm">
          This shows the list of admins and sub-admins for this trip
        </p>
      </header>

      {/* admin list */}
      <div className="admins-list flex flex-col gap-4">
        <AdminSingle
          name="Fuad Adigun"
          avatar="/assets/avatar.png"
          role="Admin"
          isVerified
        />
        <AdminSingle
          name="Yemi Afolabi"
          avatar="/assets/avatar-3.png"
          role="Sub-Admin"
          isVerified
        />
        <AdminSingle
          name="Chisom Okafor"
          avatar="/assets/avatar-2.png"
          role="Sub-Admin"
          isVerified={false}
        />
      </div>
    </section>
  );
};

// A single admin in the admin list component
const AdminSingle = ({
  name,
  avatar,
  isVerified = true,
  role,
}: {
  name: string;
  avatar: string;
  isVerified: boolean;
  role: string;
}) => {
  return (
    <div className="admin flex items-center gap-2">
      <Avatar className="w-[54px] h-[54px] cursor-pointer">
        <AvatarImage src={avatar} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <h3 className="flex items-center gap-2 font-medium">
        {name}{" "}
        {isVerified && (
          <SealCheck size={16} weight="fill" className="text-primary600" />
        )}
      </h3>
      <span className="bg-[#F0F2F5] py-2 px-4 rounded ml-auto text-sm text-[#1D2433]">
        {role}
      </span>
    </div>
  );
};

export default Page;
