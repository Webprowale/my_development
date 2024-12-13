"use client";
import { X, Star, CheckCircle } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/post-carousel";

const ActivitiesDetailsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();
  const mode = useSearchParams();
  const currentPath = usePathname();

  const handleClose = () => {
    router.push(currentPath);
  };

  useEffect(() => {
    if (mode.get("activitydetail") === "open") {
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
          <div className="bg-white w-full md:w-[48%] h-auto max-h-[98vh] p-6 rounded  overflow-auto scrollbar-thin">
            <header className="relative z-10 mb-6">
              <Image
                src={`/assets/modal-activity.svg`}
                width={70}
                height={70}
                className="mb-4"
                alt=""
              />

              <h3 className="font-semibold text-xl mb-2">
                The Museum of Modern Art
              </h3>
              <p className="text-sm text-[#647995] w-full md:w-[68%]">
                New York City, USA
              </p>
              <p className="absolute bottom-4 right-0 text-sm text-[#676E7E] flex items-center gap-1">
                <span>
                  <Star
                    size={15}
                    weight="fill"
                    className="text-[#F4B93E]"
                  />
                </span>
                <span>8.5 (436)</span>
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
              <div className="grid grid-cols-[minmax(0,55%)_minmax(0,45%)]">
                <div className="hotel-gallery relative">
                  <Carousel className="w-full h-full">
                    <CarouselContent className="h-full w-full">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem
                          key={index}
                          className="min-h-[258px] max-h-[300px] w-full flex flex-col"
                        >
                          <img
                            src={"/assets/museum.png"}
                            alt=""
                            className="rounded w-full min-h-0 h-full max-h-full object-cover flex-1"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="flex absolute bottom-5 left-0 right-0 justify-center ">
                      <div className="flex md:gap-8 gap-8 bg-white/20 backdrop-blur-md px-2 py-px rounded-sm">
                        <CarouselPrevious />
                        <CarouselNext />
                      </div>
                    </div>
                  </Carousel>
                </div>

                {/* activities facilities */}
                <div className="flex-shrink-0">
                  <h3 className="mb-2 text-[#647995] font-medium">
                    What is included
                  </h3>

                  {/* attractions */}
                  <div className="flex flex-col gap-3">
                    <p className="flex items-center gap-2">
                      <span>
                        <CheckCircle
                          size={20}
                          weight="fill"
                          className="text-green-700"
                        />
                      </span>
                      <span>Admission to Museum of Modern Art</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>
                        <CheckCircle
                          size={20}
                          weight="fill"
                          className="text-green-700"
                        />
                      </span>
                      <span>
                        Acesss to permanent collections and all special
                        exhibitions
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>
                        <CheckCircle
                          size={20}
                          weight="fill"
                          className="text-green-700"
                        />
                      </span>
                      <span>Free Wifi</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>
                        <CheckCircle
                          size={20}
                          weight="fill"
                          className="text-green-700"
                        />
                      </span>
                      <span>Downloadable multilingual audio guide</span>
                    </p>
                  </div>

                  {/* Day */}
                  <div className=" mt-5">
                    <h3 className="mb-2 text-[#647995] font-medium">
                      Tour Day
                    </h3>
                    <p className="p-2 px-3 bg-primary900 text-white rounded text-xs w-max">
                      Day 1
                    </p>
                  </div>
                </div>
              </div>

              {/* Decription */}
              <div className="description flex flex-col gap-6 mt-5">
                <p className="text-sm">
                  Featuring an outdoor pool with a waterfall, this Florida City
                  motel is a 5-minute walk from Florida Keys Factory Shops.
                  Guests can enjoy a daily continental breakfast, complimentary
                  tea and coffee in the lobby, and free Wi-Fi. Cable TV, small
                  refrigerator, and microwave are included in all rooms at this
                  Florida City Fairway Inn. Select rooms have a pool view and a
                  hardwood floor.
                </p>
                <p className="text-sm">
                  A 24-hour front desk and a business center are available at
                  Fairway Inn for added convenience. Surrounding activities
                  include diving, snorkeling, and fishing. A laundromat, free
                  parking, and vending machine are available as well
                </p>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivitiesDetailsModal;
