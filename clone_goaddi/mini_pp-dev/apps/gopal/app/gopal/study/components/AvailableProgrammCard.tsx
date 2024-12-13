"use client";
import { CalendarBlank } from "@phosphor-icons/react";
import GoButton from "@/components/goui/button";
import { truncateText } from "@/utils/truncateText";

type Prop = {
  cardVariant?: "v1" | "v2";
  img: string;
  course: string;
  duration: string;
};
const AvailableProgrammCard = ({
  img,
  course,
  duration,
  cardVariant = "v1",
}: Prop) => {
  return (
    <div
      className="bg-white rounded-[4px] p-[0.75rem]"
      style={{
        // box-shadow: 0px 4px 6px 0px #0000000D;
        boxShadow: "0px 10px 15px -3px #0000001A",
        border: "1px solid #E4E7EC",
      }}
    >
      <img
        className="block w-[100%] h-[150px] object-cover rounded-[4px]"
        src={img}
        alt=""
      />
      {cardVariant === "v1" ? (
        <p className="px-[0.375rem] py-[0.188] rounded-[4px] font-[500] text-[0.75rem] text-[#647995] bg-[#E7F0FF] inline-block mt-[0.75rem]">
          Engineering & Technology
        </p>
      ) : (
        <div className="flex items-center gap-[0.375rem] py-[0.7rem]">
          <img
            className="block w-[32px] h-[32px]"
            src="/assets/study/lakehheadUnivercity.svg"
            alt=""
          />
          <p className="text-[#647995] font-[500] text-[0.875rem] ">{course}</p>
        </div>
      )}

      <h2 className="font-[700] text-[1.125rem] text-black">{truncateText(course, 40)}</h2>
      <p className="text-[#647995] text-[0.875rem] font-[500] pb-[0.75rem] flex items-center gap-[0.5rem]">
        <CalendarBlank size={20} />
        <span>{`${duration} years duration`}</span>
      </p>
      <GoButton className="w-[100%] py-[0.5rem] text-[0.875rem] font-[700] ">
        See Details
      </GoButton>
    </div>
  );
};

export default AvailableProgrammCard;
