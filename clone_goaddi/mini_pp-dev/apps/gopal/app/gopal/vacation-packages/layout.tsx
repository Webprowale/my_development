"use client";

import { homeLinks } from "@/data/navlinks";
import LeftSide from "../components/left/sidebar";
import dashboard from "./dashboard.module.css";
import TopBar from "@/components/navigations/desktop/topbar";
import React from "react";
import TopNavbar from "@/components/navigations/mobile/TopNavbar";
import BottomNav from "@/components/navigations/mobile/bottom-nav";
import { Plus } from "@phosphor-icons/react";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DesktopLayout children={children} />
      <MobileLayout children={children} />
    </>
  );
}

const DesktopLayout = ({
  children,
  uId,
}: {
  children: React.ReactNode;
  uId?: any;
}) => {
  return (
    <div className="tracking-[-0.5px] bg-gray-100 w-full max-w-[1760px]  mx-auto hidden md:flex flex-col justify-between ">
      <TopBar />
      <div className="flex justify-start justify-items-stretch items-start gap-10 w-full mt-28 px-12 flex-shrink-0 min-w-0">
        {/* left side */}
        <div className="left sticky top-28 left-0 z-20 flex-shrink">
          <LeftSide links={homeLinks} />
        </div>

        {/* The middle section */}
        <div className="middle max-w-full flex-auto w-full">{children}</div>
      </div>
    </div>
  );
};

const MobileLayout = ({
  children,
  uId,
}: {
  children: React.ReactNode;
  uId?: any;
}) => {
  return (
    <div className="block md:hidden">
      {/* Top navbar */}
      <TopNavbar />

      {/* main section of the page */}
      <main className="w-[100%] mx-auto mt-0 mb-20">{children}</main>

      {/* Botton navigation */}
      <BottomNav />

    
    </div>
  );
};
