import { Button } from "@/components/ui/button";
import {
  CopySimple,
  ShareNetwork,
  SpeakerHigh,
  ThumbsDown,
  ThumbsUp,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Carddchat: React.FC<Props> = (props) => {
  return (
    <div className="flex-auto min-w-[300px] max-w-[320px] pb-[6px] bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      <div className="px-2 pt-1 flex flex-col space-y-1 w-full">
        <h5 className="mb-2 text-[18px] font-bold text-gray-900 dark:text-white text-wrap w-full line-clamp-2">
          {props.title}
        </h5>
        <p className="text-[14px] font-[400] text-[#6F7481] text-wrap w-full line-clamp-2">
          {props.description}
        </p>
        <p className="text-[14px] font-[400] text-[#6F7481] text-wrap w-full line-clamp-2">
          {props.body}
        </p>
      </div>

      <Link href={props.imageSrc} className="flex justify-center m-3">
        <div className="w-[300px] h-[220px]">
          <img
            src={props.imageSrc}
            alt={props.imageAlt}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Link>

      {/* <div className="flex justify-start space-x-1 mt-2">
      <Button variant="link" size="icon">
        <ThumbsUp size={14} color="#0D6EFD" />
      </Button>
      <Button variant="link" size="icon">
        <ThumbsDown size={14} />
      </Button>
      <Button variant="link" size="icon">
        <CopySimple size={14} />
      </Button>
      <Button variant="link" size="icon">
        <ShareNetwork size={14} />
      </Button>
      <Button variant="link" size="icon">
        <SpeakerHigh size={14} />
      </Button>
    </div> */}
    </div>
  );
};

interface Props {
  title: string;
  description: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
}

export default Carddchat;
