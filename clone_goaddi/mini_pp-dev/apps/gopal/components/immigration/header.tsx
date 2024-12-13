"use client";

import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Button from "../goui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import "./style.css";
import { useEffect, useState } from "react";

type Props = {
  title: string;
};
function Header() {
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
    <header className="header p-4 w-full h-[520px] flex justify-center">
      <div className="w-full flex flex-col justify-center">
        <div className="flex justify-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl xl:leading-[64px] font-black text-white">
          Immigration Packages
        </div>
        {deviceType !== "mobile" ? (
          <div className="flex justify-center items-center gap-2 mt-1">
            <span className="font-normal text-sm text-white">Provided by</span>
            <span className="p-1 border-[1.13px] border-white rounded-full bg-[#F0F2F5]">
              <img src="/assets/immigration/birdview.png" />
            </span>

            <span className="text-base font-bold text-white">
              Birdview Travels
            </span>
          </div>
        ) : null}

        <div className="flex flex-col md:flex-row md:justify-between gap-2 bg-[#000031]/40 p-4 md:p-6 lg:p-8 xl:p-12 mt-8 rounded-sm">
          <div className="w-full">
            <Select>
              <SelectTrigger className="w-full h-[50px]">
                <SelectValue
                  placeholder="Destination Country"
                  className="md:p-8"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="">
                  <SelectLabel>Destination Country</SelectLabel>
                  <SelectItem value="est">
                    Eastern Standard Time (EST)
                  </SelectItem>
                  <SelectItem value="cst">
                    Central Standard Time (CST)
                  </SelectItem>
                  <SelectItem value="mst">
                    Mountain Standard Time (MST)
                  </SelectItem>
                  <SelectItem value="pst">
                    Pacific Standard Time (PST)
                  </SelectItem>
                  <SelectItem value="akst">
                    Alaska Standard Time (AKST)
                  </SelectItem>
                  <SelectItem value="hst">
                    Hawaii Standard Time (HST)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Select>
              <SelectTrigger className="w-full h-[50px]">
                <SelectValue placeholder="Immigration Package" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Immigration Package</SelectLabel>
                  <SelectItem value="study_permit">Study Permit</SelectItem>
                  <SelectItem value="investor_visa">Investor Visa</SelectItem>
                  <SelectItem value="rising_talent_visa">
                    Rising Talent Visa
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Button
              className="w-full h-[50px]"
              // className={`${deviceType === "mobile" ? "w-full" : ""} !px-6 !py-4`}
            >
              See Requirements
            </Button>
          </div>

          {deviceType === "mobile" ? (
            <div className="mt-[20px] flex flex-col gap-8">
              <div className="block space-y-3 md:space-y-0 md:gap-2 self-start md:flex md:items-center md:justify-center md:self-center">
                <div className="flex gap-1 items-center">
                  <CheckCircle
                    size={26}
                    className="w-[16px] h-[16px] md:w-[28px] md:h-[28px]"
                    color="#86B7FE"
                  />
                  <span className="font-bold text-sm text-white">
                    Real Time Status Updates
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <CheckCircle
                    size={26}
                    className="w-[16px] h-[16px] md:w-[28px] md:h-[28px]"
                    color="#86B7FE"
                  />
                  <span className="font-bold text-sm text-white">
                    Dedicated Expert Help
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <CheckCircle
                    className="w-[16px] h-[16px] md:w-[28px] md:h-[28px]"
                    size={26}
                    color="#86B7FE"
                  />
                  <span className="font-bold text-sm text-white">
                    Complete Transparency
                  </span>
                </div>
              </div>

              <div className="flex justify-center items-center gap-2 mt-1">
                <span className="font-normal text-sm text-white">
                  Provided by
                </span>
                <span className="p-1 border-[1.13px] border-white rounded-full bg-[#F0F2F5]">
                  <img src="/assets/immigration/birdview.png" />
                </span>

                <span className="text-base font-bold text-white">
                  Birdview Travels
                </span>
              </div>
            </div>
          ) : null}
        </div>

        {deviceType !== "mobile" ? (
          <div className="flex justify-around font-bold text-sm text-white mt-8 px-16">
            <span className="flex gap-1 items-center">
              <CheckCircle size={26} color="#86B7FE" />
              <span>Real Time Status Updates</span>
            </span>
            <span className="flex gap-1 items-center">
              <CheckCircle size={26} color="#86B7FE" />
              Dedicated Expert Help
            </span>
            <span className="flex gap-1 items-center">
              <CheckCircle size={26} color="#86B7FE" />
              Complete Transparency
            </span>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
