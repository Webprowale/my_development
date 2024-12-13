"use client";
import Link from "next/link";
import "../style.css";
import {
  Student,
  PottedPlant,
  ShootingStar,
  Suitcase,
} from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ImmigrationDetails = () => {
  const router = useRouter();
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

  return (
    <main className="flex justify-center items-center h-full">
      <div className="p-4 md:p-8 bg-white max-w-screen-xl w-full">
        <div className="flex flex-col md:flex-row gap-3">
          {deviceType !== "mobile" ? (
            <>
              <div className="flex flex-col gap-3 w-full md:w-[328px] h-[587px] md:h-auto">
                <img
                  src="/assets/immigration/details/dets- (1).png"
                  className="w-full h-3/5 md:h-full object-cover"
                />
                <img
                  src="/assets/immigration/details/dets- (3).png"
                  className="w-full h-2/5 md:h-full object-cover"
                />
              </div>
              <div className="w-full md:w-[300px]">
                <img
                  src="/assets/immigration/details/dets- (5).png"
                  className="w-full h-auto md:h-[587px] object-cover"
                />
              </div>
            </>
          ) : null}

          <div className="flex flex-col gap-3">
            <div className="flex gap-3 h-full ">
              <img
                src="/assets/immigration/details/dets- (4).png"
                className="w-2/6 object-cover"
              />
              <img
                src="/assets/immigration/details/dets- (2).png"
                className="w-4/6 object-cover min-w-0"
              />
            </div>

            <div className="banner h-full w-full ">
              <div
                className={`${deviceType === "mobile" ? "!pl-4" : ""} flex flex-col justify-start items-start p-8 `}
              >
                <div className="text-lg md:text-3xl lg:text-4xl xl:text-5xl xl:leading-[64px] font-black text-white md:w-full">
                  Canada Immigration Packages
                </div>
                <div className="flex justify-center gap-2 mt-1">
                  <span className="font-normal text-sm text-white">
                    Provided by
                  </span>
                  <div className="p-1 border-[1.13px] border-white rounded-full bg-[#F0F2F5]">
                    <img src="/assets/immigration/birdview.png" />
                  </div>

                  <span className="text-sm md:text-base font-bold text-white">
                    Birdview Travels
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="
        grid grid-cols-2 md:grid-cols-4 mt-3 md:mt--0
        //flex flex-col md:flex-row 
        md:px-4 md:py-8 justify-center gap-3"
        >
          <div
            className="flex h-[126px] md:h-[210px] flex-col gap-2 items-center justify-center border-[1px] border-[#E4E7EC] rounded-sm bg-white hover:bg-[#E7F0FF] hover:text-[#0D6EFD] cursor-pointer"
            onClick={() =>
              router.push("/gopal/immigration/details/more-details")
            }
          >
            <Suitcase
              size={deviceType === "mobile" ? 36 : 42}
              color="#0D6EFD"
              weight="bold"
            />

            <p className="font-bold text-base md:text-xl text-center">
              Work Permit
            </p>
          </div>

          <div
            className="flex h-[126px] md:h-[210px] flex-col gap-3 justify-center items-center border-[1px] border-[#E4E7EC] rounded-sm bg-white hover:bg-[#E7F0FF] hover:text-[#0D6EFD] cursor-pointer"
            onClick={() =>
              router.push("/gopal/immigration/details/more-details")
            }
          >
            <p>
              {" "}
              <Student
                size={deviceType === "mobile" ? 36 : 42}
                color="#0D6EFD"
                weight="bold"
              />{" "}
            </p>
            <p className="font-bold text-base md:text-xl text-center">
              Study Permit
            </p>
          </div>

          <div
            className="flex h-[126px] md:h-[210px] flex-col gap-3 justify-center items-center border-[1px] border-[#E4E7EC] rounded-sm bg-white hover:bg-[#E7F0FF] hover:text-[#0D6EFD] cursor-pointer"
            onClick={() =>
              router.push("/gopal/immigration/details/more-details")
            }
          >
            <p>
              {" "}
              <PottedPlant
                size={deviceType === "mobile" ? 36 : 42}
                color="#0D6EFD"
                weight="bold"
              />{" "}
            </p>
            <p className="font-bold text-base md:text-xl text-center">
              Investor Visa
            </p>
          </div>

          <div
            className="flex h-[126px] md:h-[210px] flex-col gap-3 justify-center items-center border-[1px] border-[#E4E7EC] rounded-sm bg-white hover:bg-[#E7F0FF] hover:text-[#0D6EFD] cursor-pointer"
            onClick={() =>
              router.push("/gopal/immigration/details/more-details")
            }
          >
            <p>
              {" "}
              <ShootingStar
                size={deviceType === "mobile" ? 36 : 42}
                color="#0D6EFD"
                weight="bold"
              />{" "}
            </p>
            <p className="font-bold text-base md:text-xl text-center">
              Rising Talent Visa
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ImmigrationDetails;
