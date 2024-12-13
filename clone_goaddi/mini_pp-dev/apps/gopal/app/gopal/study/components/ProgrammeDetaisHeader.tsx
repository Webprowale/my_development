"use client";
import GoButton from "@/components/goui/button";

import { CalendarBlank, Clock, Gear } from "@phosphor-icons/react";

type Prop = {
  universityName: string;
  mainImage: string;
  title: string;
  content: string;
  overviewImage: string;
  duration: string;
  deadline: string;
  fee: string;
};

const ProgrammeDetaisHeader = ({
  universityName,
  mainImage,
  title,
  content,
  overviewImage,
  duration,
  deadline,
  fee,
}: Prop) => {
  return (
    <div className="md:flex md:items-center bg-[#e7f0ff]">
      <div className="p-[1rem] md:p-[unset]  md:w-[45%] md:px-[5rem]">
        <div className="flex items-center gap-[0.375rem] py-[0.7rem] justify-center md:justify-start">
          <img
            className="block w-[32px] h-[32px]"
            // src="/assets/study/lakehheadUnivercity.svg"
            src={mainImage}
            alt="university logo"
          />
          <p className="text-[#647995] font-[500] text-[0.875rem] ">
            {universityName}
            {/* Lakehead University */}
          </p>
        </div>
        <h2 className="text-[#000000] font-[700]  text-center  text-[1.5rem] md:text-[2.5rem] 2xl:text-[3.5rem] md:text-left md:leading-[48px]">
          {title}
          {/* Digital Communication and Media */}
        </h2>

        <p className="text-[1rem] text-[#676E7E] text-left pt-[1.5rem]">
          {content}
          {/* If technology is your forte and you possess analytical thinking and attention to detail, the IT world is eagerly seeking individuals like you. */}
        </p>

        <div
          className="p-[1rem] w-[100%] relative z-[100] lg:w-[821px] bg-white  md:px-[3rem] md:py-[2rem]
            grid gap-[2rem] md:gap-[3rem] grid-cols-2 lg:grid-cols-4 my-[1.5rem] md:mt-[3.25rem]
            "
          // style={{'border':'1px solid red'}}
        >
          <div>
            <p className="text-[#676E7E] font-[700] text-[0.75rem] tracking-widest flex items-center gap-[.5rem]">
              {/* icon */}
              <CalendarBlank
                style={{
                  color: "#0D6EFD",
                }}
                size={20}
              />
              <span>Duration</span>
            </p>
            <p className="text-[#000000] text-[1.125rem] font-[700] ">{`${duration} years`}</p>
          </div>

          <div>
            <p className="text-[#676E7E] font-[700] text-[0.75rem] tracking-widest flex items-center gap-[.5rem]">
              {/* icon */}
              <Clock
                size={20}
                style={{
                  color: "#0D6EFD",
                }}
              />
              <span className="text-nowrap block">Application Deadline</span>
            </p>
            <p className="text-[#000000] text-[1.125rem] font-[700] ">
              {deadline}
            </p>
          </div>

          <div>
            <p className="text-[#676E7E] font-[700] text-[0.75rem] tracking-widest flex items-center gap-[.5rem]">
              {/* icon */}
              <Gear
                size={20}
                style={{
                  color: "#0D6EFD",
                }}
              />
              <span>Application Fee</span>
            </p>
            <p className="text-[#000000] text-[1.125rem] font-[700] ">{`₦${fee}`}</p>
          </div>

          <GoButton className="py-[1rem] px-[2rem]">Apply Now</GoButton>
        </div>
      </div>

      <img
        className="hidden md:block  md:w-[55%]"
        // src="/assets/study/ProgrammeHeaderSectionimg.svg"
        src={overviewImage}
        alt=""
      />
    </div>
  );
};

export default ProgrammeDetaisHeader;
