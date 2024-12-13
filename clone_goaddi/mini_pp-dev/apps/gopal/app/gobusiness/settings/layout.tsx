"use client";

import LeftSide from "@/app/gopal/components/left/sidebar";
import TopBar from "@/components/navigations/desktop/topbar";
import TopNavbar from "@/components/navigations/mobile/TopNavbar";
import BottomNav from "@/components/navigations/mobile/bottom-nav";
import { overviewLinks } from "@/data/navlinksBusiness";
import { Plus } from "@phosphor-icons/react";
import React from "react";

export default function DashboardLayout({
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
          <LeftSide links={overviewLinks} />
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

      {/* floating button */}

      <button className="bg-primary600 text-white w-[55px] h-[55px] rounded-full grid place-items-center fixed bottom-20 right-4 z-50">
        <Plus size={20} />
      </button>
    </div>
  );
};
