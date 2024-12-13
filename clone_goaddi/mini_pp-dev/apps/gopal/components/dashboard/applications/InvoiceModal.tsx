"use client";

import React from "react";
import Image from "next/image";
import { X, Star, CheckCircle, CurrencyNgn } from "@phosphor-icons/react";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { addCommasToNumber } from "@/utils";
import { Button } from "@/components/ui/button";

const InvoiceModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPayNow, setPayNow] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();
  const mode = useSearchParams();
  const currentPath = usePathname();

  const handleClose = () => {
    router.push(`${currentPath}?tab=${mode.get("tab")}`);
  };

  useEffect(() => {
    if (mode.get("invoice")) {
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
          {isPayNow ? (
            <div className="bg-white w-full md:w-[40%] h-auto max-h-[98vh] p-6 rounded  overflow-auto scrollbar-thin">
              <header className="relative z-10 mb-6">
                <Image
                  src={`/assets/settings/profile_main_modal.svg`}
                  width={70}
                  height={70}
                  className="mb-4"
                  alt=""
                />

                <h3 className="font-semibold text-xl mb-2">
                  Nothing To Worry About ....
                </h3>

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
              </header>

              {/* items and description */}
              <section className="flex flex-col gap-1 text-base">
                <p className="flex gap-1">
                  <span className="font-semibold text-[#647995]">
                    Application ID:{" "}
                  </span>
                  <p className="text-black font-bold">APP-12345</p>
                </p>

                <p className="flex gap-1">
                  <span className="font-semibold text-[#647995]">
                    Nationality:{" "}
                  </span>
                  <p className="text-black font-bold">Nigeria</p>
                </p>

                <p className="flex gap-1">
                  <span className="font-semibold text-[#647995]">
                    Destination Country:{" "}
                  </span>
                  <p className="text-black font-bold">Canada</p>
                </p>

                <p className="flex gap-1">
                  <span className="font-semibold text-[#647995]">
                    Consultation Generated:{" "}
                  </span>
                  <p className="text-black font-bold">Yes</p>
                </p>

                <p className="flex flex-col mt-4">
                  <p className="font-semibold  text-[#647995]">
                    Decline Reason
                  </p>
                  <p className="text-black font-bold">Label Text</p>
                </p>

                <p className="flex items-center justify-between my-8">
                  <Button className="w-full">Explore Other Visas</Button>
                </p>
              </section>
            </div>
          ) : (
            <div className="bg-white w-full md:w-[40%] h-auto max-h-[98vh] p-6 rounded  overflow-auto scrollbar-thin">
              <header className="relative z-10 mb-6">
                <Image
                  src={`/assets/modal-gopaddi.svg`}
                  width={70}
                  height={70}
                  className="mb-4"
                  alt=""
                />

                <h3 className="font-semibold text-xl mb-2">GoPaddi</h3>
                <p className="text-sm text-[#647995] w-full md:w-[68%]">
                  123 Main Street, Lagos, Nigeria
                </p>

                <div className="invoice-num absolute right-0 bottom-0">
                  <h3 className="text-xs uppercase">Invoice Number</h3>
                  <p className="text-black font-semibold">#GOPA001</p>
                </div>
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
              </header>

              {/* main section */}
              <Separator className="my-4" />
              <div className="flex items-center justify-between gap-4">
                {billData.map((data: BillDataType, index: number) => (
                  <div className="flex flex-col items-start gap-1" key={index}>
                    <h3 className="text-sm text-[#676E7E]">{data.header}</h3>
                    <p className="font-semibold capitalize">{data.subtitle}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />

              {/* items and description */}
              <section className="flex flex-col gap-3">
                <h3 className="text-sm text-[#676E7E] mb-2">
                  Items and description
                </h3>
                <p className="flex items-center justify-between">
                  <span className="font-medium text-black">
                    Visa Application Fee
                  </span>
                  <span className="flex items-center gap-1">
                    <CurrencyNgn size={18} /> {addCommasToNumber(50000)}
                  </span>
                </p>
                <p className="font-medium text-black">
                  Additional Service Fees
                </p>
                <p className="pl-4 flex items-center justify-between">
                  <span>Expedited Processing</span>
                  <span className="flex items-center justify-center">
                    {" "}
                    <CurrencyNgn size={18} /> {addCommasToNumber(50000)}
                  </span>
                </p>
                <p className="pl-4 flex items-center justify-between">
                  <span>Document Review</span>
                  <span className="flex items-center justify-center">
                    {" "}
                    <CurrencyNgn size={18} /> {addCommasToNumber(50000)}
                  </span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="font-medium text-black">Subtotal</span>
                  <span className="flex items-center gap-1">
                    <CurrencyNgn size={18} /> {addCommasToNumber(50000)}
                  </span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="font-medium text-black">Tax(7.5%)</span>
                  <span className="flex items-center gap-1">
                    <CurrencyNgn size={18} /> {addCommasToNumber(50000)}
                  </span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="font-bold text-black">Total</span>
                  <span className="flex items-center gap-1 font-bold text-black">
                    <CurrencyNgn size={18} /> {addCommasToNumber(50000)}
                  </span>
                </p>

                <p className="flex items-center justify-between">
                  <Button className="w-full" onClick={() => setPayNow(true)}>
                    Pay Now
                  </Button>
                </p>
              </section>
            </div>
          )}
        </div>
      )}
    </>
  );
};

type BillDataType = {
  header: string;
  subtitle: string;
};

const billData: BillDataType[] = [
  {
    header: "Invoice Date",
    subtitle: "March 15, 2024",
  },
  {
    header: "Bill To",
    subtitle: "Folake Awosanya",
  },
  {
    header: "Due Date",
    subtitle: "March 22, 2024",
  },
  {
    header: "Application ID",
    subtitle: "APP-12345",
  },
];

export default InvoiceModal;
