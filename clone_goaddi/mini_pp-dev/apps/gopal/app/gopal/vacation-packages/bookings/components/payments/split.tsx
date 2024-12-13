"use client";
import React, { useEffect, useState, Suspense, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Modal from "@/components/goui/modal";
import {
  Article,
  CurrencyNgn,
  Equals,
  PencilSimpleLine,
  Percent,
  UserPlus,
} from "@phosphor-icons/react";
import { naira } from "@/utils/money";
import { GoAuthButton } from "@/components/goui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AvatarImage } from "@/components/ui/avatar";
import PostAvatar from "@/components/posts/dairy-post/avatar";
import { Input } from "@/components/ui/input";
import Avatar from "../avatar";
import { Button } from "@/components/ui/button";
import { PercentIcon } from "lucide-react";

const SplitPay = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const router = useRouter();
  const pathName = usePathname();
  const [split, setSplit] = useState("equally");

  //   const mode = useSearchParams().get("split");

  //   useEffect(() => {
  //     if (mode) {
  //       setOpen(mode === "true");
  //     }
  //   }, [mode, pathName, router]);

  const handleChangeSplit = (value: string) => {
    setSplit(value);
  };

  const onClose = () => {
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <Suspense>
      <Modal
        isOpen={open}
        onClose={onClose}
        className="sm:max-w-[750px] transition-all duration-300"
        trigger={<p></p>}
      >
        <img
          className="absolute top-0 w-full h-fit z-[-1]"
          src="/assets/modal-lines.svg"
          alt="modal-lines"
        />

        <div className="z-10">
          <div className="p-5 bg-primary100 w-fit rounded-[4px]">
            <Article weight="bold" className="w-7 h-7 text-primary600" />
          </div>
          <div className="mt-5">
            <h3 className="text-lg font-semibold">Split Pay</h3>
            <p className="font-medium mt-2 text-xs text-gray-600 max-w-[450px]">
              Easily split trip expenses with your travel companions
            </p>
          </div>
          <div className="max-w-[420px] w-full mx-auto mt-4">
            <div className="flex items-center justify-between">
              <div
                onClick={() => handleChangeSplit("equally")}
                className={cn(
                  "w-32 h-20 border border-gray-200 flex flex-col items-center justify-center rounded-sm cursor-pointer",
                  split === "equally"
                    ? "bg-primary600 text-white"
                    : "text-black",
                )}
              >
                <Equals
                  weight="regular"
                  className={cn(
                    "w-5 h-5 ",
                    split === "equally" ? "text-white" : "text-black",
                  )}
                />
                <div className={cn("text-sm font-semibold")}>Equally</div>
              </div>
              <div
                onClick={() => handleChangeSplit("percentage")}
                className={cn(
                  "w-32 h-20 border border-gray-200 flex flex-col items-center justify-center rounded-sm cursor-pointer",
                  split === "percentage"
                    ? "bg-primary600 text-white"
                    : "text-black",
                )}
              >
                <Percent
                  weight="regular"
                  className={cn(
                    "w-5 h-5 ",
                    split === "percentage" ? "text-white" : "text-black",
                  )}
                />
                <div className={cn("text-sm font-semibold")}>By Percentage</div>
              </div>
              <div
                onClick={() => handleChangeSplit("manually")}
                className={cn(
                  "w-32 h-20 border border-gray-200 flex flex-col items-center justify-center rounded-sm cursor-pointer",
                  split === "manually"
                    ? "bg-primary600 text-white"
                    : "text-black",
                )}
              >
                <PencilSimpleLine
                  weight="regular"
                  className={cn(
                    "w-5 h-5 ",
                    split === "manually" ? "text-white" : "text-black",
                  )}
                />
                <div className={cn("text-sm font-semibold")}>Manually</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center w-full mt-3">
            <div className="text-base font-semibold">
              {naira("23450")}/person
            </div>
            <div className="text-sm text-slate-700 font-light">(3 people)</div>
          </div>

          <hr className="h-[1px] bg-gray-100 rounded-full my-4" />
          {split == "equally" ? (
            <div className="flex flex-col gap-6">
              {[1, 2, 3].map(() => {
                return (
                  <div className="flex justify-between items-center">
                    <Avatar
                      image="/assets/avatar-6.png"
                      firstName="Serena"
                      lastName="Williams"
                      username="@serenaW"
                      you={true}
                    />

                    <div className="w-[150px] h-10 border border-gray-300 bg-slate-100 text-sm font-medium flex justify-center items-center rounded-sm">
                      {naira("23450")}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
          {split == "percentage" ? (
            <div className="flex flex-col gap-6">
              {[1, 2, 3].map(() => {
                return (
                  <div className="flex justify-between items-center">
                    <Avatar
                      image="/assets/avatar-6.png"
                      firstName="Serena"
                      lastName="Williams"
                      username="@serenaW"
                      you={true}
                    />
                    <div className="relative">
                      <Input
                        name="price"
                        type="text"
                        placeholder="Enter percentage"
                        className=" w-[150px] pr-10 h-10 border text-xs border-gray-400 focus-visible:bg-none focus-visible:border-primary600 focus-visible:outline-primary600 rounded-sm  outline-none  focus-visible:outline-none focus-visible:ring-0"
                      />
                      <Percent className="text-sm absolute top-2.5 right-3 bottom-0" />
                    </div>

                    <div className="w-[150px] h-10 border border-gray-300 bg-slate-100 text-sm font-medium flex justify-center items-center rounded-sm">
                      {naira("23450")}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
          {split == "manually" ? (
            <div className="flex flex-col gap-6">
              {[1, 2, 3].map(() => {
                return (
                  <div className="flex justify-between items-center">
                    <Avatar
                      image="/assets/avatar-6.png"
                      firstName="Serena"
                      lastName="Williams"
                      username="@serenaW"
                      you={true}
                    />
                    <div className="relative">
                      <Input
                        name="price"
                        type="text"
                        className=" w-[150px] pr-10 h-10 border border-gray-400 focus-visible:bg-none focus-visible:border-primary600 focus-visible:outline-primary600 rounded-sm  outline-none  focus-visible:outline-none focus-visible:ring-0"
                      />
                      <CurrencyNgn className="text-lg absolute top-2.5 right-3 bottom-0" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="flex items-center gap-2 justify-end mt-10">
            <Button className="text-primary600 bg-primary100 rounded hover:bg-primary200 ease-linear duration-150 w-36">
              Cancel
            </Button>

            <Link href="/gopal/trip-planner/trip-booking-flow?step=payment">
              <Button className="bg-primary600 rounded text-white hover:bg-primary700 ease-linear duration-150 w-36">
                Ok
              </Button>
            </Link>
          </div>
        </div>
      </Modal>
    </Suspense>
  );
};

export default SplitPay;
