"use client";
import GoButton from "@/components/goui/button";
import { MapPin, ShareFat, Heart, CalendarBlank } from "@phosphor-icons/react";

type Props = {
  name: string;
  location: string;
  price?: string | number;
  rating?: string | number;
};
const whiteBtnVariant =
  "py-[1.031rem] px-[0.75rem] bg-[#ffffff] border-[#E4E7EC] border-[1px]";
const HotelsHeader = ({ name, location, price, rating }: Props) => {
  return (
    <div className="w-full">
      <nav className="flex flex-col gap-[1rem] md:flex-row md:justify-between w-full">
        <div className="w-full">
          <div>
            <h2 className="font-[700] text-[1.5rem] ">
              {name || "Rivera Resort, Lekki"}
            </h2>
            <p className="text-[1rem] font-[500] pt-[0.5rem] pb-[0.75rem]">
              {location ||
                "18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki Phase1"}
            </p>
          </div>

          <div className="flex justify-between w-full">
            <GoButton
              className={`py-[1.031rem] px-[0.75rem] bg-[transparent] border-[#E4E7EC] border-[1px] flex item-center gap-[0.375rem]`}
            >
              <span className="flex items-center gap-[0.25rem] text-primary font-[700] text-[1rem]">
                <MapPin size={20} />
                <span>Show in map</span>
              </span>
              <div className="bg-[#E4E7EC] w-[1px] h-[15px]">{/* Line */}</div>
              <span className="flex items-center text-[#676E7E] font-[500] text-[1rem] gap-[0.32rem]">
                <img
                  src="/assets/Star.svg"
                  alt=""
                ></img>
                <span>{rating}</span>
              </span>
              <div className="bg-[#E4E7EC] w-[1px] h-[15px]">{/* Line */}</div>
              <span className="flex items-center text-[#676E7E] gap-[0.25rem] text-primary font-[500] text-[1rem]">
                <CalendarBlank
                  size={20}
                  weight="fill"
                  className="
                text-gray-500"
                />
                <span className="text-gray-500">4 Nights / 5 Days</span>
              </span>
            </GoButton>
          </div>
        </div>

        <div className="flex flex-col items-end gap-[.7rem]">
          <div className="flex items-center gap-[0.6rem]">
            <GoButton
              className="
                       gap-x-2 inline-flex items-center border-[#E4E7EC] border-[1px]
                        w-[50%] text-[#1D2433] text-[1rem] font-[700]
                        py-[0.5rem] px-[1.25rem] md:w-[109px]
                        bg-[transparent]

                        "
            >
              <ShareFat size={20} />
              Share
            </GoButton>
            <GoButton
              className={`
              inline-flex items-center gap-x-2
                        bg-[transparent]
                        py-[0.5rem] px-[1.25rem]
                         border-[#E4E7EC] border-[1px]
                        w-[50%] text-[#1D2433] text-[1rem] font-[700] md:w-[170px]`}
            >
              <Heart size={20} />
              Add to wishlist
            </GoButton>
          </div>
          {/* <p className="inline-flex items-center gap-2 text-[#1D2433] font-[700] text-[1.75rem] mt-10">
            ₦{price}{" "}
            <span className="text-xs text-gray-500 font-normal">
              per person
            </span>
          </p> */}
        </div>
      </nav>
    </div>
  );
};

export default HotelsHeader;
