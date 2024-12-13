import { TripCardType } from "@/interfaces";
import Link from "next/link";
import React from "react";

const TripCard = ({
  image,
  name = "Bahamas Family Trip",
  date = "19th April 2024",
  duration = "5 days",
  location = "Paris",
  isDraft = false,
}: TripCardType) => {
  return (
    <article className="border border-[#E4E7EC] rounded-md p-2 relative">
      <div className="relative">
        <img
          src={image || "/assets/trip-planner/trip-image.png"}
          alt=""
          className="h-[200px] w-full object-cover rounded-lg"
        />
        <span className="text-white capitalize backdrop-blur-lg bg-[#FFFFFF33] tracking-wide py-2 px-6 absolute top-2 right-2 text-sm rounded">
          {location}
        </span>
      </div>

      <div className="trip-details">
        <div className="mt-3">
          <h3 className="font-bold mb-1">
            <Link href={"#"}>{name}</Link>
          </h3>

          <div className="flex items-center justify-between">
            <p className="text-sm">{date}</p>
            <span className="text-sm text-[#676E7E]">{duration}</span>
          </div>
        </div>
      </div>

      <Link
        href={"#"}
        className="flex items-center justify-center py-2 rounded bg-primary600 hover:bg-primary700 ease-linear duration-200 text-white text-sm mt-4"
      >
        {isDraft ? "Continue" : "View"}
      </Link>
    </article>
  );
};

export default TripCard;
