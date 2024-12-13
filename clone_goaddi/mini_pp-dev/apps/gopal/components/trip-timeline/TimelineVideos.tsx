"use client";

import {
  DownloadSimple,
  ShareFat,
  Video,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import TimelineVideoModal from "./TimelineVideoModal";

const TimelineVIdeos = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeVideoModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="h-[288px] rounded overflow-hidden w-full relative p-3 cursor-pointer">
        <div className="group relative h-full z-20 flex flex-col justify-between">
          <div className="control flex items-center justify-between">
            <span
              className="w-[32px] h-[32px] rounded-full grid place-items-center bg-[#00000033] ease-linear duration-150 hover:bg-[#0000007d]"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <Video
                size={18}
                weight="fill"
                className="text-white"
              />
            </span>
            <span className="w-[32px] h-[32px] rounded-full hidden group-hover:grid place-items-center bg-[#00000033] transition-all ease-linear duration-150 hover:bg-[#0000007d]">
              <ShareFat
                size={18}
                weight="fill"
                className="text-white"
              />
            </span>
          </div>
          <div className="details">
            <p className="truncate bg-[#101928bf] text-white rounded p-2 backdrop-blur-sm group-hover:hidden">
              Bahamas Vacation Trip
            </p>
            <a
              href={
                "https://videos.pexels.com/video-files/6247699/6247699-hd_1920_1080_24fps.mp4"
              }
              className="flex bg-primary600 group-hover:flex py-3 px-6 rounded absolute right-0 bottom-[-50%] group-hover:bottom-0 ease-in delay-75 duration-100 items-center gap-2 text-white hover:bg-primary700 text-sm"
              download={true}
            >
              Download
              <DownloadSimple
                size={15}
                weight="fill"
              />
            </a>
          </div>
        </div>
        <Image
          src={"/assets/trip-timeline/timeline-video.png"}
          alt="timeline video thumbnail"
          width={100}
          height={100}
          className="absolute inset-0 w-full h-full z-10 object-cover"
        />
      </div>

      {isOpen && <TimelineVideoModal close={closeVideoModal} />}
    </>
  );
};

export default TimelineVIdeos;
