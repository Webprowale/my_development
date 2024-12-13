import GoButton from "@/components/goui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/post-carousel";
import { IoIosArrowForward } from "react-icons/io";
import { TiHeartOutline } from "react-icons/ti";
import { RiMapPinLine } from "react-icons/ri";
import {
  Images,
  WifiHigh,
  BowlFood,
  User,
  Hoodie,
  Martini,
  Broom,
  Alarm,
  Wind,
} from "@phosphor-icons/react";

import { naira } from "@/utils/money";

const listItems = [
  "13m²",
  "•",
  "Non-smoking",
  "•",
  "Hairdryer",
  "•",
  "Air conditioned",
  "•",
  "Telephone",
  "•",
  "Smart TV",
  "•",
  "Lift/Elevator Access",
  "•",
  "Tea/Coffee Maker",
  "•",
  "Room Safe",
  "Television",
  "•",
  "Wireless Internet",
  "•",
  "Mood Lighting",
  "•",
  "Swimming Pool",
  "•",
  "Free Toiletries",
  "•",
  "24hr Security",
  "•",
  "Desk",
];
const SelectedRooms = ({ title, desc }: any) => {
  return (
    <div
      className="flex items-start w-[100%] bg-white p-[1rem] rounded-[4px]
        border-[1px] 
        "
      // style={{'border':'1px solid red'}}
    >
      <div className="w-full">
        {/* first row contianing heanding and show map */}
        <div className="flex items-start justify-between">
          <div className="">
            <h2 className="text-[1rem] font-[700] ">{title}</h2>
            <GoButton className="mt-[0.813rem] py-[0.513rem] px-[1rem] ">
              Added to Total
            </GoButton>
          </div>
          <div className="flex flex-col">
            <p className="text-[#1D2433] font-[700] text-[1rem] ">
              {naira(90000)}
            </p>
            {/* <p className="text-[#676E7E] text-[0.875rem]">
              Incl. taxes per night
            </p> */}
          </div>
        </div>
        <p className="flex flex-wrap text-base text-gray-500 items-center  pt-[0.75rem]">
          {desc}
        </p>
        {/* <div className="flex gap-[.5rem] flex-wrap">
          {listItems.map((d, index) => (
            <p key={index} className="text-[#676E7E] font-[500] text-[1rem]">
              {d}
            </p>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default SelectedRooms;
