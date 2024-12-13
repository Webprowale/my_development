"use client";
import { ITripItemType } from "@/interfaces";
import { CalendarBlank, MapPin } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

const TripItem = ({ image, tripTitle, location, date }: ITripItemType) => {
  return (
    <Link
      href={"#"}
      className="trip flex items-center gap-2 overflow-hidden w-full"
    >
      <Image
        src={image}
        width={80}
        height={80}
        alt=""
        className="block object-cover aspect-square w-[80px] h-[80px] rounded-md"
      />
      <div className="trip-details flex flex-col min-w-0 gap-1">
        <h4
          className="block w-full font-semibold truncate"
          title={tripTitle}
        >
          {tripTitle}
        </h4>
        <ul>
          <li className="flex w-full items-center gap-1 text-[#647995] truncate">
            <MapPin size={18} />
            <span className="text-[14px]">Paris France</span>
          </li>
          <li className="flex w-full items-center gap-1 text-[#647995] truncate">
            <CalendarBlank size={18} />
            <span className="text-[14px]">February 15, 2024</span>
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default TripItem;
