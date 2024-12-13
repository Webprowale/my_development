"use client";
import { CurrencyNgn, X } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { addCommasToNumber } from "@/utils";

const PriceDetailsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();
  const mode = useSearchParams();
  const currentPath = usePathname();

  const handleClose = () => {
    router.push(currentPath, { scroll: false });
  };

  useEffect(() => {
    if (mode.get("pricedetails") === "open") {
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
          <div className="bg-white w-full md:w-[35%] h-auto max-h-[90vh] p-6 rounded overflow-auto">
            <header className="relative z-10 mb-8">
              <Image
                src={`/assets/modal-money-2.svg`}
                width={70}
                height={70}
                className="mb-4"
                alt=""
              />

              <h3 className="font-semibold text-xl mb-2">Price Details</h3>
              <p className="text-sm text-[#647995] w-full md:w-[68%]">
                Here, we present a breakdown of your fees.
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
            </header>

            {/* main section */}
            <section className="main">
              {/* break down */}
              <div className="grid grid-cols-3">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[#647995] font-medium">Base Fare</h3>
                  <p className="flex items-center font-semibold">
                    <span>
                      <CurrencyNgn size={18} />
                    </span>
                    <span>{addCommasToNumber(47560)}.00</span>
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[#647995] font-medium">Taxes & Fees</h3>
                  <p className="font-medium">12%</p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[#647995] font-medium">Discount</h3>
                  <p className="font-medium">10%</p>
                </div>
              </div>
              {/* category breakdown */}
              <div className="my-5 py-3  border-y border-y-[#F0F2F5]">
                <h3 className="text-[#647995] font-medium mb-3">
                  Category breakdown
                </h3>
                <div className="flex flex-col gap-2 text-sm">
                  <p className="flex items-center justify-between">
                    <span>2 Adults</span>
                    <span>NGN 100,000</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span>2 Children</span>
                    <span>NGN 100,000</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span>1 Infant</span>
                    <span>NGN 100,000</span>
                  </p>
                </div>
              </div>

              {/* Total price */}
              <div className="">
                <h3 className="text-[#647995] font-medium mb-1">Total Fare</h3>
                <p className="flex items-center font-semibold text-2xl">
                  <span>
                    <CurrencyNgn size={20} />
                  </span>
                  <span>{addCommasToNumber(11232347560)}.00</span>
                </p>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default PriceDetailsModal;
