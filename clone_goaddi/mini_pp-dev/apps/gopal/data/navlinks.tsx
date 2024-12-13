"use client";
import {
  AirplaneTilt,
  Article,
  BellSimple,
  Buildings,
  Calendar,
  ChartPieSlice,
  ClockCountdown,
  CreditCard,
  FirstAidKit,
  Hourglass,
  House,
  Lock,
  NewspaperClipping,
  Package,
  PencilSimpleLine,
  RoadHorizon,
  ShieldCheck,
  SquaresFour,
  Storefront,
  Student,
  SuitcaseRolling,
  User,
  UserCircleGear,
  Wallet,
} from "@phosphor-icons/react";
import Image from "next/image";

const active = false;

export const homeLinks = [
  {
    icon: <AirplaneTilt size={20} weight={active ? "fill" : "regular"} />,
    text: "Flights",
    alert: false,
    active: false,
    path: "/gopal/flights",
  },
  // {
  //   icon: <Hourglass size={20} weight={active ? "fill" : "regular"} />,
  //   text: "Trip Timeline",
  //   alert: false,
  //   active: false,
  //   path: "/gopal/trip-timeline",
  // },
  {
    icon: <RoadHorizon size={20} weight={active ? "fill" : "regular"} />,
    text: "Activities",
    alert: false,
    active: false,
    path: "/gopal/activities",
  },
  {
    icon: <Buildings size={20} weight={active ? "fill" : "regular"} />,
    text: "Hotels",
    alert: false,
    active: false,
    path: "/gopal/hotels",
  },

  {
    icon: <Student size={20} weight={active ? "fill" : "regular"} />,
    text: "Study",
    alert: false,
    active: false,
    path: "/gopal/study",
  },
  {
    icon: <NewspaperClipping size={20} weight={active ? "fill" : "regular"} />,
    text: "Visa",
    alert: false,
    active: false,
    path: "/gopal/visa?tabs=all-visa",
  },
  {
    icon: <SuitcaseRolling size={20} />,
    text: "Immigration",
    alert: false,
    active: false,
    path: "/gopal/immigration",
  },
  {
    icon: <FirstAidKit size={20} />,
    text: "Medical",
    alert: false,
    active: false,
    path: "/gopal/medical",
  },
  {
    icon: <Package size={20} />,
    text: "Vacation Packages",
    alert: false,
    active: false,
    path: "/gopal/vacation-packages",
  },
];

export const dashboardLinks = [
  {
    icon: <House size={20} weight={active ? "fill" : "regular"} />,
    text: "Home",
    alert: false,
    active: false,
    path: "/gopal/dashboard",
  },
  {
    icon: <SquaresFour size={20} weight={active ? "fill" : "regular"} />,
    text: "My Applications",
    alert: false,
    active: false,
    path: "/gopal/dashboard/applications",
  },
  {
    icon: <Article size={20} weight={active ? "fill" : "regular"} />,

    text: "Quotation",
    alert: false,
    active: false,
    path: "/gopal/dashboard/quotation",
  },
  {
    icon: <Calendar size={20} weight={active ? "fill" : "regular"} />,
    text: "My Trip Planner",
    alert: false,
    active: false,
    path: "/gopal/dashboard/trip-planner",
  },
  {
    icon: <ClockCountdown size={20} weight={active ? "fill" : "regular"} />,
    text: "Travel History",
    alert: false,
    active: false,
    path: "/gopal/dashboard/travel-history",
  },
];

export const goPalSettingsLinks = [
  {
    icon: <User size={20} weight={active ? "fill" : "regular"} />,
    text: "Profile",
    alert: false,
    active: false,
    path: "/gopal/settings/profile",
  },
  {
    icon: <UserCircleGear size={20} weight={active ? "fill" : "regular"} />,
    text: "Accounts",
    alert: false,
    active: false,
    path: "/gopal/settings/accounts",
  },
  {
    icon: <Lock size={20} weight={active ? "fill" : "regular"} />,
    text: "Security",
    alert: false,
    active: false,
    path: "/gopal/settings/security",
  },
  {
    icon: <BellSimple size={20} weight={active ? "fill" : "regular"} />,
    text: "Notifications",
    alert: false,
    active: false,
    path: "/gopal/settings/notifications",
  },
  {
    icon: <CreditCard size={20} weight={active ? "fill" : "regular"} />,
    text: "Subscribe",
    alert: false,
    active: false,
    path: "/gopal/settings/subscribe",
  },
  {
    icon: <PencilSimpleLine size={20} weight={active ? "fill" : "regular"} />,
    text: "Feedback",
    alert: false,
    active: false,
    path: "/gopal/settings/feedback",
  },
  {
    icon: <ShieldCheck size={20} weight={active ? "fill" : "regular"} />,
    text: "Privacy",
    alert: false,
    active: true,
    path: "/gopal/settings/privacy",
  },
];

// Mobile bottom navbar links
// export const mobileBottomNavbar = [
//   {
//     icon: (
//       <House
//         size={20}
//         weight={pathName === "/gopal" ? "fill" : undefined}
//       />
//     ),
//     text: "Feeds",
//     path: "/gopal",
//   },
//   {
//     icon: (
//       <Storefront
//         size={20}
//         weight={pathName === "/gopal" ? "fill" : undefined}
//       />
//     ),
//     text: "Marketplace",
//     path: "#",
//   },
//   {
//     icon: (
//       <Wallet
//         size={20}
//         weight={pathName === "/gopal" ? "fill" : undefined}
//       />
//     ),
//     text: "Wallet",
//     path: "#",
//   },
//   {
//     icon: (
//       <ChartPieSlice
//         size={20}
//         weight={pathName === "/gopal" ? "fill" : undefined}
//       />
//     ),
//     text: "Feeds",
//     path: "#",
//   },
//   {
//     icon: (
//       <Image
//         src={"/assets/paddi-ai.svg"}
//         quality={90}
//         width={24}
//         height={24}
//         alt="Paddi AI icon"
//       />
//     ),
//     text: "Paddi AI",
//     path: "#",
//   },
// ];
