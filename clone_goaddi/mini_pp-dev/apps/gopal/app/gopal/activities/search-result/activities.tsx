import Image from "next/image";
import Link from "next/link";
import { FaClock } from "react-icons/fa6";
import Button from "@/components/goui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/post-carousel";
import { truncateText } from "@/utils/truncateText";

export type ActivitiesType = {
  searchLocation: string;
  activityName: string;
  featureImage: string;
  duration: string;
  adultPrice: string;
  searchId: string;
  activityCode: string;
  description: string;
};

function Activities({
  searchLocation,
  activityName,
  featureImage,
  duration,
  adultPrice,
  searchId,
  activityCode,
  description,
}: ActivitiesType) {

  // console.log(adultPrice);
  const truncatedActivityName = truncateText(activityName, 60);

  return (
    <div>
      <div className="relative py-2">
        <Carousel className="h-[272px]">
          <CarouselContent className="h-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <img
                  src={featureImage}
                  alt=""
                  className="h-[272px] w-full object-cover rounded-t-sm"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex absolute bottom-5 left-0 right-0 justify-center">
            <div className="flex md:gap-8 gap-8 bg-white/20 backdrop-blur-md px-2 py-px rounded-sm">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
        </Carousel>

        <div className=" border rounded-b-sm h-[210px]">
          <div className="px-3 py-3">
            <div className="flex justify-between items-center w-full text-xs flex-wrap">
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activityName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex item-center align-center gap-1"
              >
                <img src="/assets/MapPin.svg" className=" w-6 h-6 p-1" />
                <p className="text-slate-950 font-medium mt-1 text-xs text-nowrap pr-1">
                  {searchLocation}
                </p>
              </Link>
              {/* <div className="flex item-center space-x-1">
                <img src="/assets/Star.svg" className="w-4 h-4 -mb-2" />
                <p className="text-xs">8.5 (436)</p>
              </div> */}
            </div>

            <div className="flex text-start w-full font-bold mt-2 h-[52px]">
              {truncatedActivityName}
            </div>
          </div>

          <hr className="bg-gray-300" />

          <div className="p-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-2 w-1/3 text-xs">
                <span className="font-small text-gray-500 ">From</span>
                <span className="font-semibold text-sm inline-flex items-center">
                  {" "}
                  <del>N</del> {adultPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex text-sm items-center font-small text-gray-500 space-x-1">
                <FaClock height={6} width={6} />
                <span className="font-small text-xs">{duration}</span>
              </div>
            </div>

            <Link
              href={`/gopal/activities/details?destination=${searchLocation}&searchId=${searchId}&activity-code=${activityCode}&price=${adultPrice}`}
            >
              <Button className="w-full py-2 mt-5">View</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
