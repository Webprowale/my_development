import Image from "next/image";

import { CiCalendar, CiLocationOn } from "react-icons/ci";
import {
  PiCaretCircleLeftFill,
  PiCaretCircleRightFill,
  PiUsersLight,
} from "react-icons/pi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/post-carousel";
import SectionLayout from "@/components/ui/section-layout";
import { IoIosArrowForward } from "react-icons/io";

function TopDestinations() {
  return (
    <SectionLayout
      title="Top Destinations"
      description="World's most coveted destinations with our top picks 🗺️"
    >
      <div className="grid grid-cols-3 self-center gap-3 mr-4">
        {[...new Array(6)].map(() => (
          <div className="hotel-gallery relative ml-4 w-full h-[450px] self-center group overflow-hidden">
            <img
              src={"/assets/top-destination.png"}
              alt=""
              className="object-cover h-full w-full  group-hover:scale-110 transition-all duration-300"
            />
            <div className="flex absolute bottom-0 left-0 right-0 pb-4 ">
              <div className="flex flex-row justify-between text-white items-center  w-full px-2 py-px ">
                <div className="flex flex-col">
                  <div className=" font-semibold">Lagos, Nigeria</div>
                  <div className="text-normal ">100 tours</div>
                </div>

                <IoIosArrowForward size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
}

export default TopDestinations;
