"use client";
import GoButton from "@/components/goui/button";
import { MapPin, ShareFat } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  PiFacebookLogo,
  PiLinkedinLogo,
  PiWhatsappLogo,
  PiXLogo,
} from "react-icons/pi";

type LibertyType = {
  activityName: string;
  departureAndReturn: string;
  adultPrice: string;
  meetUpPoint: string;
};

const whiteBtnVariant =
  "py-[1.031rem] px-[0.75rem] bg-[#ffffff] border-[#E4E7EC] border-[1px]";

const ActivityHeader = ({
  activityName,
  adultPrice,
  meetUpPoint,
}: LibertyType) => {
  // console.log(adultPrice);
  const currentUrl = window.location.href;
  console.log(currentUrl);

  return (
    <div className="w-full">
      <nav className="flex flex-col gap-[1rem] md:flex-row md:justify-between w-full">
        <div className="w-full">
          <div>
            <h2 className="font-[700] text-[1.5rem] ">{activityName}</h2>
            <p className="text-[1rem] font-[500] pt-[0.5rem] pb-[0.75rem]">
              {meetUpPoint}
            </p>
          </div>

          <div className="flex justify-between w-full">
            <GoButton
              className={`flex items-center px-[0.75rem] bg-[transparent] border-[#E4E7EC] border-[1px] gap-[0.375rem]`}
            >
              <div className="flex items-center gap-[0.25rem] text-primary font-[700] text-[1rem]">
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activityName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <MapPin size={20} />
                  <span>Show in map</span>
                </Link>
              </div>
              {/* <div className="bg-[#E4E7EC] w-[1px] h-[15px]">Line</div> */}
              {/* <span className="flex items-center text-[#676E7E] font-[500] text-[1rem] gap-[0.32rem]">
                <img src="/assets/Star.svg" alt=""></img>
                <span>8.5(436)</span>
              </span> */}
              {/* <div className="bg-[#E4E7EC] w-[1px] h-[15px]">Line</div> */}
              {/* <span className="flex items-center text-[#676E7E] gap-[0.25rem] text-primary font-[500] text-[1rem]">
                <CalendarBlank
                  size={20}
                  weight="fill"
                  className="
                text-gray-500"
                />
                <span className="text-gray-500">4 Nights / 5 Days</span>
              </span> */}
              <span>
                <button className="bg-blue-500 hover:bg-blue-700 sm:w-auto w-[100%] text-white font-bold py-2 px-4 rounded-sm sm:ms-2 my-3 sm:my-0">
                  Check Avaiability
                </button>
              </span>
            </GoButton>

            {/* <GoButton
              className={` py-[1.031rem] px-[2.594rem] font-[700] text-[0.875rem]`}
            >
              Select Room
            </GoButton> */}
          </div>
        </div>

        <div className="flex flex-col items-end w-96">
          <div className="flex items-center">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  className="gap-x-2 inline-flex items-center border-[#E4E7EC] border-[1px] text-[#1D2433] text-[1rem] font-[700] py-[0.5rem] px-[1.25rem] md:w-[109px] bg-[transparent]"
                  variant="link"
                >
                  <ShareFat size={20} />
                  Share
                </Button>
              </HoverCardTrigger>

              <HoverCardContent className="flex items-center justify-between w-80 bg-white border opacity-80">
                <FacebookShareButton
                  url={currentUrl}
                  className="cursor-pointer border"
                >
                  <PiFacebookLogo size={40} />
                </FacebookShareButton>
                <WhatsappShareButton
                  url={currentUrl}
                  className="cursor-pointer border"
                >
                  <PiWhatsappLogo size={40} />
                </WhatsappShareButton>
                <TwitterShareButton
                  url={currentUrl}
                  className="cursor-pointer border"
                >
                  <PiXLogo size={40} />
                </TwitterShareButton>
                <LinkedinShareButton
                  url={currentUrl}
                  className="cursor-pointer border"
                >
                  <PiLinkedinLogo size={40} />
                </LinkedinShareButton>
              </HoverCardContent>
            </HoverCard>

            {/* <GoButton
              className={`
              inline-flex items-center gap-x-2
                        bg-[transparent]
                        py-[0.5rem] px-[1.25rem]
                         border-[#E4E7EC] border-[1px]
                        w-[50%] text-[#1D2433] text-[1rem] font-[700] md:w-[170px]`}
            >
              <Heart size={20} />
              Add to wishlist
            </GoButton> */}
          </div>
          <p className="inline-flex items-center gap-2 text-[#1D2433] font-[700] text-[1.75rem] mt-10">
            ₦ {adultPrice}
            <span className="text-xs text-gray-500 font-normal">
              per person
            </span>
          </p>
        </div>
      </nav>
    </div>
  );
};

export default ActivityHeader;
