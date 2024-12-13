"use client";

import { Button } from "@/components/ui/button";
import { IFollow } from "@/interfaces";
import { cn } from "@/lib/utils";
import { followersToShortCode, getInitials } from "@/utils";
import { SealCheck } from "@phosphor-icons/react";
import Image from "next/image";
import React, { useState } from "react";
import { followUser } from "@/axios/endpoints/user.endpoint";

const Connections = ({
  isVerified = false,
  name,
  followersCount = 10000,
  content = "Discover Inspiring Content here",
  id,
  img,
}: IFollow) => {
  const [isFollowed, setIsFollowed] = useState(false);

  const follow = async () => {
    const response = await followUser({
      followUserId: id,
    });

    setTimeout(() => {
      setIsFollowed(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center py-4 px-3 min-w-[170px] w-full border border-[#E4E7EC] rounded text-center overflow-hidden">
      {img ? (
        <Image
          src={img}
          width={54}
          height={54}
          alt=""
          referrerPolicy="no-referrer"
          className="rounded-full object-cover mb-4"
        ></Image>
      ) : (
        <div className="bg-primary100 rounded-full w-[54px] h-[54px] object uppercase text-2xl font-medium cover mb-4 justify-center flex items-center">
          {getInitials(name)}
        </div>
      )}
      <h3 className="flex items-center gap-1 font-medium mb-2">
        <span>{name}</span>{" "}
        <SealCheck size={14} weight="fill" className="text-primary600" />
      </h3>
      <p className="text-sm text-[#676E7E] font-medium">
        {followersToShortCode(followersCount)} Followers
      </p>
      <span className="text-sm text-[#676E7E] font-medium w-[95%] truncate overflow-hidden">
        Discover Inspiring Content here
      </span>

      <Button
        variant={"default"}
        className={cn(
          "w-full  h-[36px] hover:bg-primary700 mt-3",
          isFollowed ? "bg-primary100 text-primary600" : "bg-primary600",
        )}
        onClick={follow}
      >
        {isFollowed ? "UnFollow" : "Follow"}
      </Button>
    </div>
  );
};

export default Connections;
