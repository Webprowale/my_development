"use client";

import SettingsHeader from "@/components/settings/SettingsHeader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { X } from "@phosphor-icons/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Privacy = () => {
  const mode = useSearchParams();

  return (
    <main>
      <SettingsHeader
        heading="Settings"
        subheading="Privacy"
        tabLink={links}
      />

      {mode.get("tab") === "discover" && <Discoverability />}
      {mode.get("tab") === "media" && <Media />}
      {mode.get("tab") === "data-sharing" && <DataSharing />}
    </main>
  );
};

// discoverability
const Discoverability = () => {
  return (
    <section className="general px-6 ">
      <h2 className="py-7 text-sm text-[#1D2433]">
        Control who can find you on Gopaddi
      </h2>

      <div className="flex items-center justify-between w-full md:w-[70%]">
        <div className="text flex flex-col gap-1 mb-5">
          <h3 className="font-medium text-[#1D2433]">Discoverable by email</h3>
          <p className="font-normal text-[#676E7E] text-xs">
            People who have your email address in their contacts will be able to
            find your Gopaddi profile
          </p>
        </div>
        <div className="switch">
          <Switch />
        </div>
      </div>
      <div className="flex items-center justify-between w-full md:w-[70%]">
        <div className="text flex flex-col gap-1 mb-5">
          <h3 className="font-medium text-[#1D2433]">
            Discoverable by phone number
          </h3>
          <p className="font-normal text-[#676E7E] text-xs">
            People who have your phone number in their contacts will be able to
            find your Gopaddi profile
          </p>
        </div>
        <div className="switch">
          <Switch />
        </div>
      </div>
      {/* note */}
      <div className="note bg-[#E0EAFB] text-[#324A76] w-full md:w-[55%] text-sm p-4 rounded mt-5 leading-relaxed">
        Go Paddi helps you find friends and connections already in your network.
        By allowing access to your contact information (email address and phone
        number), your profile becomes discoverable to them.
      </div>
    </section>
  );
};

// media and tagging
const Media = () => {
  return (
    <section className="general px-6 ">
      <h2 className="py-7 text-sm text-[#1D2433]">
        Control who can tag you on their media
      </h2>

      <label
        htmlFor="everyone"
        className="flex items-center justify-between w-full md:w-[70%]"
      >
        <div className="text flex flex-col gap-1 mb-5">
          <h3 className="font-medium text-[#1D2433]">Everyone</h3>
          <p className="font-normal text-[#676E7E] text-xs">
            Anyone can tag you in their photos. You will receive a notification
            for each tag. 
          </p>
        </div>
        <div className="switch">
          <input
            type="radio"
            name="media"
            id="everyone"
            className="appearance-none p-1 w-4 h-4 border-gray-400 border focus:border-[5px] focus:border-primary600 rounded-full bg-white focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
          />
        </div>
      </label>
      <label
        htmlFor="followers"
        className="flex items-center justify-between w-full md:w-[70%]"
      >
        <div className="text flex flex-col gap-1 mb-5">
          <h3 className="font-medium text-[#1D2433]">People you follow</h3>
          <p className="font-normal text-[#676E7E] text-xs">
            Only people you follow on [Platform name] can tag you in their
            photos. You will receive a notification for each tag.
          </p>
        </div>
        <div className="switch">
          <input
            type="radio"
            name="media"
            id="followers"
            className="appearance-none p-1 w-4 h-4 border border-gray-400 focus:border-[5px] focus:border-primary600 rounded-full bg-white focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
          />
        </div>
      </label>
      <label
        htmlFor="noone"
        className="flex items-center justify-between w-full md:w-[70%]"
      >
        <div className="text flex flex-col gap-1 mb-5">
          <h3 className="font-medium text-[#1D2433]">No one</h3>
          <p className="font-normal text-[#676E7E] text-xs">
            No one can tag you in their photos. You will not receive any
            notifications.
          </p>
        </div>
        <div className="switch">
          <input
            type="radio"
            name="media"
            id="noone"
            className="appearance-none p-1 w-4 h-4 border-gray-400 border focus:border-[5px] focus:border-primary600 rounded-full bg-white focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 "
          />
        </div>
      </label>
    </section>
  );
};

// Data sharing component
const DataSharing = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <section className="general px-6 ">
        <h2 className="py-7 text-sm text-[#1D2433]">
          Control who can find you on Gopaddi
        </h2>

        <div className="flex items-center justify-between w-full md:w-[80%]">
          <div className="text flex flex-col gap-1 mb-5">
            <h3 className="font-medium text-[#1D2433]">
              Allow additional information sharing
            </h3>
            <p className="font-normal text-[#676E7E] w-full md:w-[73%] text-xs">
              By default, Gopaddi shares some information with partners to run
              the platform. Enabling this allows sharing additional data for
              targeted advertising and improved services.
            </p>
          </div>
          <div className="switch">
            <Switch />
          </div>
        </div>
        <div className="flex items-center justify-between w-full md:w-[80%]">
          <div className="text flex flex-col gap-1 mb-5">
            <h3 className="font-medium text-[#1D2433]">Request for data</h3>
            <p className="font-normal text-[#676E7E] text-xs w-full md:w-[73%]">
              Request a downloadable archive of your Gopaddi data, including
              profile information, activity history, and interactions
            </p>
          </div>
          <Button
            variant={"default"}
            className="bg-[#E7F0FF] hover:bg-primary200 text-[#0D6EFD] text-xs px-8 rounded"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Request
          </Button>
        </div>
        {/* note */}
        <div className="note bg-[#E0EAFB] text-[#324A76] w-full md:w-[55%] text-sm p-4 rounded mt-5 leading-relaxed">
          <span className="text-[#324A76] font-semibold">Learn details</span>{" "}
          about the data Gopaddi collects, how it's used, and with whom it might
          be shared.
        </div>
      </section>

      {/* Modal */}
      {isOpen && (
        <div className="request grid place-items-center fixed inset-0 w-full h-screen bg-[#00000089] backdrop-blur-sm z-50">
          <div className="request-container bg-white w-full md:w-[40%] p-6 rounded animate-scaleUp">
            <header className="relative z-10 mb-8">
              <Image
                src={`/assets/modal-data.svg`}
                width={70}
                height={70}
                className="mb-4"
                alt=""
              />

              <h3 className="font-semibold text-xl mb-2">Request my data</h3>
              <p className="text-sm text-[#647995] w-full md:w-[80%] leading-normal">
                We're currently gathering your information. This process may
                take up to 30 days. Once complete, we'll send a notification
                email to the address you registered with.
              </p>
              <X
                size={24}
                weight="bold"
                className="absolute right-0 top-[10px] cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                }}
              />
              <img
                src="/assets/modal-lines.svg"
                className="absolute left-0 right-0 top-0 w-full -z-[1]"
                alt=""
              />
            </header>
            <div className="cta flex justify-end gap-2 mt-6">
              <Button
                variant={"default"}
                onClick={() => {
                  setIsOpen(false);
                }}
                className="bg-[#E7F0FF] hover:bg-primary200 text-[#0D6EFD] text-xs px-8 py-6 rounded w-[30%]"
              >
                Not yet
              </Button>
              <Button
                variant={"default"}
                className="bg-primary600 hover:bg-primary700 text-white text-xs px-8 py-6 rounded w-[30%]"
              >
                Request my data
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const links = [
  {
    id: 1,
    name: "Discoverability",
    tabName: "discover",
    isActive: false,
  },
  {
    id: 2,
    name: "Media and Tagging",
    tabName: "media",
    isActive: true,
  },
  {
    id: 3,
    name: "Data Sharing",
    tabName: "data-sharing",
    isActive: true,
  },
];

export default Privacy;
