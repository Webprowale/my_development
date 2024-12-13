"use client";

import Link from "next/link";
import React from "react";
import ActivityItem from "./ActivityItem";
import ActivityDonut from "./ActivityDonut";

const ActivityCard = () => {
  return (
    <div className="activity-card bg-white p-6 h-full rounded">
      <header className="flex items-center justify-between mb-6">
        <div className="left-header">
          <h2 className="font-medium">Activity Log</h2>
        </div>
        <div className="right-header hidden md:block">
          <Link
            href={"#"}
            className="inline-block text-[14px] rounded py-3 px-8 bg-primary600 hover:bg-primary700 ease duration-150 text-white"
          >
            See All
          </Link>
        </div>
      </header>

      <div className="activity-card__main grid grid-cols-3 gap-4 mt-4">
        {activityData?.map((activity: any, index: number) => (
          <ActivityItem
            key={index}
            status={activity.status}
            name={activity.name}
            date={activity.date}
          />
        ))}
        <div className="col-start-2 col-end-4 row-start-2 row-end-4 flex items-center justify-center flex-shrink-0">
          <ActivityDonut />
        </div>
      </div>
    </div>
  );
};

const activityData = [
  {
    status: "paid",
    name: "Omobola Williams",
    date: "February 15, 2024",
  },
  {
    status: "pending",
    name: "Nwosu Chisom",
    date: "February 15, 2024",
  },
  {
    status: "paid",
    name: "ThankGod Micheals",
    date: "February 15, 2024",
  },
  {
    status: "pending",
    name: "Omobola Williams",
    date: "February 15, 2024",
  },
  {
    status: "declined",
    name: "Omobola Williams",
    date: "February 15, 2024",
  },
];

export default ActivityCard;
