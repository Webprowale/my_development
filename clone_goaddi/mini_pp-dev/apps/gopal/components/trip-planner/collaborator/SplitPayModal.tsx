"use client";

import { X, CurrencyNgn, Trash, Info } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { addCommasToNumber } from "@/utils";
import { UserPayType } from "@/interfaces";
import { Button } from "@/components/ui/button";

const SplitPayModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const modalRef = useRef(null);
  const router = useRouter();
  const mode = useSearchParams();
  const currentPath = usePathname();

  const handleClose = () => {
    router.push(currentPath);
  };

  useEffect(() => {
    if (mode.get("split") === "open") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (event: any) => {
        if (event.key === "Escape") {
          router.push(currentPath);
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 w-full h-screen bg-[#00000079] grid place-items-center z-50 backdrop-blur-sm">
          <div className="bg-white w-full md:w-[50%] h-auto max-h-[90vh] p-6 rounded overflow-auto scrollbar-thin">
            <header className="relative z-10 mb-4">
              <Image
                src={`/assets/modal-split.svg`}
                width={70}
                height={70}
                className="mb-4"
                alt=""
              />

              <h3 className="font-semibold text-xl mb-2">Split information</h3>
              <p className="text-sm text-[#647995] w-full md:w-[68%]">
                This show your split information
              </p>
              <X
                size={24}
                weight="bold"
                className="absolute right-0 top-[10px] cursor-pointer"
                onClick={() => {
                  handleClose();
                }}
              />
              <img
                src="/assets/modal-lines.svg"
                className="absolute left-0 right-0 top-0 w-full -z-[1]"
                alt=""
              />

              <div className="img-group flex items-center absolute bottom-0 right-0">
                <img
                  src="/assets/trip-timeline/1.png"
                  alt=""
                  className="w-[30px] h-[30px] object-cover"
                />
                <img
                  src="/assets/trip-timeline/2.png"
                  alt=""
                  className="w-[30px] h-[30px] object-cover ml-[-12px]"
                />
              </div>
            </header>

            {/* User list */}
            <div className="flex flex-col gap-6 mt-10">
              <UserPay
                name="Serena Williams"
                username="@serenaW"
                amount={24450}
                status="paid"
                isYou={true}
                image="/assets/avatar-3.png"
              />
              <UserPay
                name="Serena Williams"
                username="@serenaW"
                amount={6466450}
                status="paid"
                isYou={false}
                image="/assets/avatar-3.png"
              />
            </div>

            {/* CTA */}
            <div className="cta mt-10 flex items-center justify-end">
              <Button
                variant={"default"}
                className="bg-primary600 hover:bg-primary700 text-white font-medium px-8 rounded w-[20%] mb-5"
                onClick={() => handleClose()}
              >
                Ok
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const UserPay = ({
  name,
  username,
  amount,
  image,
  status,
  isYou,
}: UserPayType) => {
  const statusStyle = (): string => {
    if (status === "paid") {
      return `bg-[#E7F6EC] text-[#036B26] border border-[#036B26]`;
    } else {
      return `bg-[#F0F2F5] text-[#1D2433] border border-[#1D2433]`;
    }
  };
  return (
    <div className="grid grid-cols-[40%_25%_15%] justify-between">
      <div className="flex items-center gap-2">
        <Image
          src={"/assets/avatar-3.png"}
          width={48}
          height={48}
          alt=""
          className="rounded-full"
        />
        <div className="">
          <h3 className="flex items-center font-medium gap-2">
            {name}{" "}
            {isYou && (
              <span className="text-xs text-primary600 bg-primary100 rounded p-1">
                you
              </span>
            )}
          </h3>
          <p className="text-sm text-[#676E7E]">{username}</p>
        </div>
      </div>
      {/* user pay */}
      <div className="flex items-center justify-center self-center  gap-1 py-3 px-6 border border-[#E4E7EC] bg-[#F7F9FC] rounded">
        <CurrencyNgn
          size={15}
          weight="bold"
        />
        {addCommasToNumber(amount)}.00
      </div>

      {/* user status */}
      <div
        className={`capitalize flex self-center items-center justify-center py-2 px-6 rounded ${statusStyle()}`}
      >
        {status}
      </div>
    </div>
  );
};

export default SplitPayModal;
