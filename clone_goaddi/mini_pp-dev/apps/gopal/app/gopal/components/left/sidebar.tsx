"use client";
import DesktopSidebar from "@/components/navigations/desktop/sidebar";
import React from "react";
import { useState } from "react";
import { homeLinks } from "@/data/navlinks";
import { any } from "zod";
import { useRouter } from "next/navigation";
import { getUserId } from "@/lib/get-userId";

type Props = {};

const LeftSide = (links: any, isUser: any) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        isUser
          ? console.log("you are logged in")
          : router.push("/gopal?mode=auth");
      }}
      className="w-full"
    >
      <DesktopSidebar navlinks={links} isUser={isUser} />
    </div>
  );
};

export default LeftSide;
