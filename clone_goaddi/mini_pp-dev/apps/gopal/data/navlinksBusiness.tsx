"use client";

import {
  Calendar,
  ChartBar,
  ClockCounterClockwise,
  GearFine,
  Receipt,
  Shapes,
  SquaresFour,
} from "@phosphor-icons/react";

export const overviewLinks = [
  {
    icon: (
      <Shapes
        size={20}
        weight={"regular"}
      />
    ),
    text: "Overview",
    alert: false,
    active: false,
    path: "/gobusiness/dashboard/overview",
  },
  {
    icon: (
      <Receipt
        size={20}
        weight={"regular"}
      />
    ),
    text: "Requests",
    alert: false,
    active: false,
    path: "/gobusiness/dashboard/request",
  },
  {
    icon: (
      <SquaresFour
        size={20}
        weight={"regular"}
      />
    ),
    text: "My Applications",
    alert: false,
    active: false,
    path: "/gobusiness/dashboard/applications",
  },
  {
    icon: (
      <Calendar
        size={20}
        weight={"regular"}
      />
    ),
    text: "Trip planner",
    alert: false,
    active: false,
    path: "/gobusiness/dashboard/applications",
  },
  {
    icon: (
      <ClockCounterClockwise
        size={20}
        weight={"regular"}
      />
    ),
    text: "Trip History",
    alert: false,
    active: false,
    path: "/gobusiness/dashboard/travel-history",
  },
  {
    icon: (
      <ChartBar
        size={20}
        weight={"regular"}
      />
    ),
    text: "Report & Analytics",
    alert: false,
    active: false,
    path: "/gobusiness/dashboard/analytics",
  },
  {
    icon: (
      <GearFine
        size={20}
        weight={"regular"}
      />
    ),
    text: "Settings",
    alert: false,
    active: false,
    path: "/gobusiness/settings",
  },
];
