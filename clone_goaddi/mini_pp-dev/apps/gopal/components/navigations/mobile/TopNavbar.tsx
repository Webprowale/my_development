"use client";

import {
  Bell,
  CaretDown,
  GearSix,
  HandCoins,
  Hourglass,
  List,
  ListChecks,
  MagnifyingGlass,
  Notebook,
  SignOut,
  User,
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useScroll } from "framer-motion";
import { useState } from "react";
// import { getUserId } from "@/lib/get-userId";
import { getUserId } from "@/lib/get-user";
import { useAuthStore } from "@/store/useAuthStore";
import { logout } from "@/services/auth";
import { useParams, useRouter } from "next/navigation";

const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="flex items-center justify-between bg-white p-4 sticky top-0 z-30 border-b border-b-[#F0F2F5]">
        <button onClick={() => setIsMenuOpen(true)}>
          <List size={23} color="#343330" />
        </button>

        {/* Logo */}
        <Link href={"/gopal"}>
          {" "}
          <img
            src="/assets/go-logo.png"
            width={30}
            height={25}
            className=""
            alt=""
          />
        </Link>

        {/* actions */}
        <div className="flex items-center gap-3">
          <button>
            <MagnifyingGlass size={23} weight="light" />
          </button>
          <button className="relative">
            <Link href="/gopal/notification">
              <Bell size={23} weight="light" />
              <span className="w-[20px] h-[20px] text-[10px] grid place-items-center bg-primary600 text-white absolute -top-[6px] -right-[6px] rounded-full border border-white font-medium">
                9
              </span>
            </Link>
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} closeMenu={closeMobileMenu} />
    </>
  );
};

const MobileMenu = ({
  isOpen = false,
  closeMenu,
}: {
  isOpen: boolean;
  closeMenu: () => void;
}) => {
  const { user } = useAuthStore((state) => ({ ...state })) as any;

  console.log("sidebar USER ID", user);

  const Links = [
    {
      text: "Profile",
      icon: <User size={20} />,
      link: `/gopal/profile/${user.userId}`,
    },
    {
      text: "Trip planner",
      icon: <ListChecks size={20} />,
      link: "/gopal/trip-planner",
    },
    {
      text: "Trip timeline",
      icon: <Hourglass size={20} />,
      link: "/gopal/trip-timeline",
    },
    {
      text: "Diary",
      icon: <Notebook size={20} />,
      link: `/gopal/profile/${user.userId}?tab=diary`,
    },
    {
      text: "Commission for life",
      icon: <HandCoins size={20} />,
      link: "/gopal/commission",
    },
    {
      text: "Settings",
      icon: <GearSix size={20} />,
      link: "/gopal/settings",
    },
    {
      text: "Logout",
      icon: <SignOut size={20} />,
      link: "#",
    },
  ];

  const router = useRouter();

  return (
    <nav
      className={clsx(
        "fixed inset-0 w-full h-screen overscroll-auto scrollbar-none z-[90]",
        isOpen
          ? "bg-[#344054]/60 visible opacity-100"
          : "delay-50 invisible opacity-0",
      )}
    >
      {/* The nav container */}
      <div
        className={clsx(
          "w-[80%] h-full bg-white transition-all duration-200 delay-50",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* The slider header */}
        <div className="header flex items-center justify-between px-3 pt-7 pb-2 ">
          <img
            src="/assets/go-logo.png"
            width={30}
            height={25}
            className=""
            alt=""
          />
          <X weight="bold" size={20} onClick={() => closeMenu()} />
        </div>

        <div className="py-4 my-4 border-y border-y-[#F0F2F5]">
          <div className="flex items-center px-3 py-3 bg-[#F7F9FC] gap-1">
            <Image
              src={user.picture}
              width={50}
              height={50}
              alt=""
              className="rounded-full"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-primary600 font-medium">{"GoPal"}</p>
            </div>

            <button className="ml-auto">
              <CaretDown size={18} />
            </button>
          </div>
        </div>

        {/* menu items */}
        <div className="flex flex-col gap-5">
          {Links.map((link: any, index: number) => (
            <>
              {link.name === "Logout" ? (
                <Link
                  href={""}
                  className="bg-[#F7F9FC] p-2 px-3 flex items-center gap-4"
                  key={index}
                  onClick={() => {
                    logout(router);
                    closeMenu();
                  }}
                >
                  <span>{link.icon}</span>
                  <span className="font-medium text-sm">{link.text}</span>
                </Link>
              ) : (
                <Link
                  href={link.link}
                  className="p-2 px-3 flex items-center gap-4"
                  key={index}
                >
                  <span>{link.icon}</span>
                  <span className="font-medium text-sm">{link.text}</span>
                </Link>
              )}
            </>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;

export const CustomMobileMenu = ({
  isOpen = false,
  closeMenu,
  Links: customLinks,
}: {
  isOpen: boolean;
  closeMenu: () => void;
  Links: { link: string; icon: any; text: string }[];
}) => {
  const { user } = useAuthStore((state) => ({ ...state })) as any;

  return (
    <nav
      className={clsx(
        "fixed inset-0 w-full h-screen overscroll-auto scrollbar-none z-[90]",
        isOpen
          ? "bg-[#344054]/60 visible opacity-100"
          : "delay-50 invisible opacity-0",
      )}
    >
      {/* The nav container */}
      <div
        className={clsx(
          "w-[80%] h-full bg-white transition-all duration-200 delay-50",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* The slider header */}
        <div className="header flex items-center justify-between px-3 pt-7 pb-2 ">
          <img
            src="/assets/go-logo.png"
            width={30}
            height={25}
            className=""
            alt=""
          />
          <X weight="bold" size={20} onClick={() => closeMenu()} />
        </div>

        {/* user info */}
        <div className="py-4 my-4 border-y border-y-[#F0F2F5]">
          <div className="flex items-center px-3 py-3 bg-[#F7F9FC] gap-1">
            <Image
              src={user.picture}
              width={50}
              height={50}
              alt=""
              className="rounded-full"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-primary600 font-medium">
                {" "}
                {user.membership}
              </p>
            </div>

            <button className="ml-auto">
              <CaretDown size={18} />
            </button>
          </div>
        </div>

        {/* menu items */}
        <div className="flex flex-col gap-5">
          {customLinks.map((link: any, index: number) => (
            <Link
              href={link.link}
              onClick={() => {
                closeMenu();
              }}
              className="bg-[#F7F9FC] p-2 px-3 flex items-center gap-4"
              key={index}
            >
              <span>{link.icon}</span>
              <span className="font-medium text-sm">{link.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
