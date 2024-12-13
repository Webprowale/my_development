"use client";
import React from "react";
import Image from "next/image";

import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { GoArrowRight } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { getUserId } from "@/lib/get-userId";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import Button from "@/components/goui/button";
import Recommendations from "../components/right/recommendations";
import Trending from "../components/right/trending";

type Props = {};

function BioItem(props: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-2 mt-2">
      <span className="flex items-center gap-1 text-gray-400 text-sm">
        {props.icon}
        <span>{props.label}</span>
      </span>
      <span className="text-black ml-2 text-sm">{props.value}</span>
    </div>
  );
}

function CardLayout(props: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-4">
      <h4 className="font-semibold md:text-sm text-xs my-4">{props.title}</h4>
      <div>{props.children}</div>
      <div className="flex justify-end w-full mt-5">
        <div className="text-primary600 flex justify-end items-center gap-1">
          <p className="text-sm font-semibold text-primary600">Show more</p>
          <ArrowRight weight="bold" className="text-primary600" />
        </div>
      </div>
    </div>
  );
}

function TripTimelinesCard(props: {
  image?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2  border border-gray-200 rounded p-2">
      <Image
        src={props.image ?? "https://via.placeholder.com/200"}
        alt={props.title}
        width={200}
        height={200}
      />
      <p className="font-bold">{props.title}</p>
      <p className="line-clamp-2 text-gray-400 ">{props.description}</p>
      <Button className="w-full">View</Button>
    </div>
  );
}

const Sidebar = (isUser: any) => {
  return (
    <div className="space-y-4">
      {isUser ? <Recommendations /> : null}

      <Trending />
    </div>
  );
};

export default Sidebar;
