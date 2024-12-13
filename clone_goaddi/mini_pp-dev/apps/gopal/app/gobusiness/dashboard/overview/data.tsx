"use client";
import { Coins, Receipt, ShoppingBagOpen } from "@phosphor-icons/react";

export type OverviewType = {
  title: string;
  value: number;
  icon: string;
  breakdown: any;
};

export const overviewData: OverviewType[] = [
  {
    title: "Request In Draft",
    value: 3,
    icon: "/assets/gobusiness/drafts.svg",
    breakdown: [
      {
        icon: <Receipt size={18} />,
        title: "Expenses",
        value: 2,
      },
      {
        icon: <ShoppingBagOpen size={18} />,
        title: "Products",
        value: 1,
      },
      {
        icon: <Coins size={18} />,
        title: "Funds",
        value: 0,
      },
    ],
  },
  {
    title: "Requests In Review",
    value: 4,
    icon: "/assets/gobusiness/review.svg",
    breakdown: [
      {
        icon: <Receipt size={18} />,
        title: "Expenses",
        value: 2,
      },
      {
        icon: <ShoppingBagOpen size={18} />,
        title: "Products",
        value: 1,
      },
      {
        icon: <Coins size={18} />,
        title: "Funds",
        value: 0,
      },
    ],
  },
  {
    title: "Declined Requests",
    value: 4,
    icon: "/assets/gobusiness/declined.svg",
    breakdown: [
      {
        icon: <Receipt size={18} />,
        title: "Expenses",
        value: 2,
      },
      {
        icon: <ShoppingBagOpen size={18} />,
        title: "Products",
        value: 1,
      },
      {
        icon: <Coins size={18} />,
        title: "Funds",
        value: 0,
      },
    ],
  },
  {
    title: "Approved Requests",
    value: 3,
    icon: "/assets/gobusiness/approved.svg",
    breakdown: [
      {
        icon: <Receipt size={18} />,
        title: "Expenses",
        value: 2,
      },
      {
        icon: <ShoppingBagOpen size={18} />,
        title: "Products",
        value: 1,
      },
      {
        icon: <Coins size={18} />,
        title: "Funds",
        value: 0,
      },
    ],
  },
];
