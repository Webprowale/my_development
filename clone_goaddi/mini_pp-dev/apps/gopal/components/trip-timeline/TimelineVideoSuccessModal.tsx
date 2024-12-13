import { X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TimelineVideoSuccessModal = ({ close }: { close: () => void }) => {
  return (
    <div className="fixed inset-0 w-full h-screen bg-[#00000063] backdrop-blur-sm grid place-items-center z-50">
      <div className="relative min-w-[50%] max-w-[50%] bg-white p-6 pb-5 rounded-md">
        <div className="banner relative">
          <Image
            src={"/assets/trip-timeline/timeline-ready.svg"}
            width={100}
            height={310}
            alt=""
            className="w-full h-[310px]"
          />
          <button
            className="grid place-items-center w-[26px] h-[26px] rounded-full bg-white text-primary600 absolute top-6 right-10"
            onClick={() => {
              close();
            }}
          >
            <X
              size={15}
              weight="bold"
            />
          </button>
        </div>
        <h3 className="text-center font-bold mt-5 text-2xl mb-2">
          {" "}
          Your Trip Timeline Video is Ready!
        </h3>
        <p className="font-normal leading-relaxed text-center text-[#1D2433]">
          We have a special video for your{" "}
          <span className="font-bold">Bahamas family trip</span> timeline,
          capturing the best moments of your journey. Share it with friends and
          family, or simply revisit the memories whenever you like.
        </p>

        <div className="actions flex items-center justify-center gap-2 mt-12 mb-10">
          <Link
            href={"/"}
            className="inline-block py-3 px-6 rounded bg-primary100 text-primary600 ease-linear duration-100 hover:bg-primary200  text-sm"
          >
            Go to dashboard
          </Link>
          <Link
            href={"/"}
            className="inline-block py-3 px-8 rounded bg-primary600 text-white ease-linear duration-100 hover:bg-primary700  text-sm"
          >
            View video
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TimelineVideoSuccessModal;
