"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { homeLinks } from "@/data/navlinks";
import {
  Airplane,
  ChartPieSlice,
  House,
  Storefront,
  Wallet,
} from "@phosphor-icons/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Props = any;

const BottomNav = (props: Props) => {
  const path = usePathname();
  const router = useRouter();

  return (
    <div className="fixed left-0 right-0 bottom-0 flex items-center justify-between border-t border-t-[#F0F2F5] px-4 z-50 bg-white py-2">
      {/* {mobileBottomNavbar.map((menu: any, index: number) => (
        <Link
          href={"#"}
          className="text-[#98A2B3] flex flex-col items-center gap-1"
          key={index}
        >
          {menu.icon}
          <span className="text-xs">{menu.text}</span>
        </Link>
      ))} */}
      <Link
        href={"/gopal"}
        className={clsx(
          "flex flex-col items-center gap-1",
          path === "/gopal" ? "text-primary600" : "text-[#647995]",
        )}
      >
        <House
          size={20}
          weight={path === "/gopal" ? "fill" : "light"}
          className={clsx(
            path === "/gopal" ? "text-primary600" : "text-[#647995]",
          )}
        />
        <span
          className={clsx(
            "text-xs",
            path === "/gopal" ? "font-semibold" : "font-normal",
          )}
        >
          Feeds
        </span>
      </Link>
      <Drawer>
        <DrawerTrigger>
          <span
            className={clsx(
              "flex flex-col items-center gap-1",
              path === "#" ? "text-primary600" : "text-[#647995]",
            )}
          >
            <Storefront
              size={20}
              weight={path === "#" ? "fill" : "light"}
              className={clsx(
                path === "#" ? "text-primary600" : "text-[#647995]",
              )}
            />
            <span
              className={clsx(
                "text-xs",
                path === "#" ? "font-semibold" : "font-normal",
              )}
            >
              Marketplace
            </span>
          </span>
        </DrawerTrigger>
        <DrawerContent className="max-h-[60vh]">
          <DrawerHeader>
            {/* <DrawerTitle>Marketplace</DrawerTitle> */}
            <DrawerDescription>Marketplace</DrawerDescription>
          </DrawerHeader>
          <div className="grid grid-cols-2 gap-3 bg-gray-200 p-3 overflow-auto">
            {homeLinks.map((link: any, index: number) => (
              <DrawerClose asChild key={index}>
                <button
                  onClick={() => router.push("/gopal/trip-planner")}
                  className="bg-white w-full h-[148px] flex flex-col items-center justify-center"
                >
                  {link.icon}
                  <span>{link.text}</span>
                </button>
              </DrawerClose>
            ))}
            <DrawerClose asChild>
              <Link
                href={"#"}
                className="bg-white w-full h-[148px] flex flex-col items-center justify-center"
              >
                <Airplane size={25} />
                <span>Flights</span>
              </Link>
            </DrawerClose>
            <DrawerClose>
              <Link
                href={"#"}
                className="bg-white w-full h-[148px] flex flex-col items-center justify-center"
              >
                <Airplane size={25} />
                <span>Flights</span>
              </Link>
            </DrawerClose>
          </div>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Link
        href={"/gopal/wallet"}
        className={clsx(
          "flex flex-col items-center gap-1",
          path === "/gopal/wallet" ? "text-primary600" : "text-[#647995]",
        )}
      >
        <Wallet
          size={20}
          weight={path === "/gopal/wallet" ? "fill" : "light"}
          className={clsx(
            path === "/gopal/wallet" ? "text-primary600" : "text-[#647995]",
          )}
        />
        <span
          className={clsx(
            "text-xs",
            path === "/gopal/wallet" ? "font-semibold" : "font-normal",
          )}
        >
          Wallet
        </span>
      </Link>

      <Link
        href={"/gopal/dashboard"}
        className={clsx(
          "flex flex-col items-center gap-1",
          path === "/gopal/dashboard" ? "text-primary600" : "text-[#647995]",
        )}
      >
        <ChartPieSlice
          size={20}
          weight={path === "/gopal/dashboard" ? "fill" : "light"}
          className={clsx(
            path === "/gopal/dashboard" ? "text-primary600" : "text-[#647995]",
          )}
        />
        <span
          className={clsx(
            "text-xs",
            path === "/gopal/dashboard" ? "font-semibold" : "font-normal",
          )}
        >
          Dashboard
        </span>
      </Link>

      <Link
        href={"#"}
        className={clsx(
          "flex flex-col items-center gap-1",
          path === "" ? "text-primary600" : "text-[#647995]",
        )}
      >
        <Image
          src={"/assets/paddi-ai.svg"}
          quality={90}
          width={24}
          height={24}
          alt="Paddi AI icon"
        />
        <span
          className={clsx(
            "text-xs",
            path === "#" ? "font-semibold" : "font-normal",
          )}
        >
          Paddi AI
        </span>
      </Link>
    </div>
  );
};

export default BottomNav;
