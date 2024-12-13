"use client";
import Header from "@/components/immigration/header";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "@/components/goui/modal";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ImmigrationPage = () => {
  const [count, setCount] = useState(8);

  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width >= 768 && width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function loadMore(amount: number) {
    setCount(count + amount);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />

      <div className="flex flex-col p-4 md:p-8 bg-white justify-center">
        <div className="flex flex-col gap-1 md:gap-4 mb-10">
          <p className="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl xl:leading-[56px] text-[#1D2433] md:text-center">
            {" "}
            Where Would You Like To Go?
          </p>
          <p className="text-[#676E7E] text-base font-medium md:text-center">
            Select the country of your choice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {[...new Array(count)].map((_, index) => (
            <>
              {index == 1 ? (
                <Link href="/gopal/immigration/details">
                  <article className="border border-[#E4E7EC] rounded-md p-2 relative">
                    <div className="relative">
                      <img
                        src="/assets/immigration/immigration.png"
                        alt=""
                        className="h-[250px] w-full object-cover rounded-md"
                      />

                      <span className="text-white w-[140px] px-3 py-2 border-[1px] border-white tracking-wide absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base font-medium rounded-[4px] text-center">
                        See Packages
                      </span>
                    </div>

                    <div className="trip-details">
                      <div className="mt-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold mb-1">Canada</h3>
                          <span className="text-sm text-[#676E7E]">
                            <img
                              src="/assets/immigration/canada_flag.png
        "
                            />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div></div>
                  </article>
                </Link>
              ) : (
                <Link href="/gopal/immigration/details">
                  <article className="border border-[#E4E7EC] rounded-md p-2 relative">
                    <div className="relative">
                      <img
                        src="/assets/immigration/immigration_image.png"
                        alt=""
                        className="h-[250px] w-full object-cover rounded-md"
                      />
                      <span className="text-[#324A76] bg-[#E0EAFB] tracking-wide py-2 px-3 absolute top-4 left-4 text-sm rounded">
                        4 Packages
                      </span>
                    </div>

                    <div className="trip-details">
                      <div className="mt-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold mb-1">Australia</h3>
                          <span className="text-sm text-[#676E7E]">
                            <img src="/assets/immigration/normal_flag.png" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div></div>
                  </article>
                </Link>
              )}
            </>
          ))}
        </div>

        {count == 16 ? (
          ""
        ) : (
          <div className="flex justify-center mt-6">
            <button
              className={`${
                deviceType === "mobile" ? "w-full" : ""
              } py-[12px] px-[24px] border-[1px] border-[#0D6EFD] text-[#0D6EFD] font-medium text-base rounded-sm hover:bg-[#0D6EFD] hover:text-white `}
              onClick={() => loadMore(4)}
            >
              Load More
            </button>
          </div>
        )}
      </div>

      <div className="flex w-full bg-white pt-8 mb-36">
        <img src="/assets/immigration/down_image.png" />
      </div>
    </>
  );
};

export default ImmigrationPage;
