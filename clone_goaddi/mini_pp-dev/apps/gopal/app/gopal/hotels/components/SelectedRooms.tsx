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

const TextWithIcon = ({ text, icon }: any) => (
  <div className="text-[#1D2433] font-[500] flex items-center gap-[0.375rem]">
    {icon}
    <p className=" text-[1rem] text-nowrap">{text}</p>
  </div>
);

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
const SelectedRooms = () => {
  return (
    <div
      className="flex items-start w-[100%] bg-white py-[1.5rem] pl-[1.5rem] rounded-[4px]
        border-[1px]
        "
      // style={{'border':'1px solid red'}}
    >
      <div>
        <Carousel className="w-[233px] h-full ">
          <CarouselContent className="h-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <img
                  src={"/assets/hotel.png"}
                  alt=""
                  className=" h-full max-h-full w-full"
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
        <p className="flex items-center gap-[0.313] text-primary font-[700] mt-[0.625rem]">
          <Images size={20} />
          <span>View gallery</span>
        </p>
      </div>

      <div className="w-full">
        {/* first row contianing heanding and show map */}
        <div className="flex items-start justify-between px-[1rem] mb-[0.8rem]">
          <div className="w-[60%]">
            <h2 className="text-[1.25rem] font-[700] ">King Size Room</h2>
            <GoButton className="my-[0.813rem] py-[0.813rem] px-[2.563rem]">
              Select
            </GoButton>
          </div>
          <div className="w-[35%] flex flex-col  	">
            <p className="text-[#1D2433] font-[700] text-[1.25rem]">₦ 0.00</p>
            <p className="text-[#676E7E] text-[0.875rem]">
              Incl. taxes per night
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-[0.625rem] px-[1rem] pb-[0.75rem]">
          <TextWithIcon text="1 King size bed" icon={<BowlFood size={20} />} />
          <TextWithIcon text="2 Bathrooms" icon={<WifiHigh size={20} />} />
          <TextWithIcon text="Sleeps 2" icon={<WifiHigh size={20} />} />
        </div>
        <div className="flex gap-[.5rem] flex-wrap px-[1rem]">
          {listItems.map((d, index) => (
            <p key={index} className="text-[#676E7E] font-[500] text-[1rem]">
              {d}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectedRooms;
