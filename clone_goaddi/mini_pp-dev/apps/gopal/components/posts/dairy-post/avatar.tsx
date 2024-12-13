"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Gallery, ThreeDots, Verified, Visible } from "@/assets/icons";
import {
  convertToISOWithIST,
  convertToRelativeTime,
  getInitials,
} from "@/utils";
import moment from "moment";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getUserId } from "@/lib/get-userId";

const PostAvatar = ({
  firstName,
  lastName,
  avatar,
  size,
  user_id,
  noDate,
  createdAt,
}: any) => {
  const mediumImage = "md:w-16 md:h-16 w-14 h-14";
  const smallImage = "md:w-8 md:h-8 w-8 h-8";

  const mediumText =
    "font-satoshi font-semibold md:text-xl text-base text-nowrap hover:underline capitalize";
  const smallText =
    "font-satoshi font-semibold md:text-sm text-xs text-nowrap hover:underline capitalize";
  const mediumIcon = "md:w-fit w-4 h-4";
  const smallIcon = "md:w-4 md:h-4 h-3 w-3";
  const smallTime = "text-slate-500 md:text-xs text-[10px] capitalize";
  const mediumTime = "text-slate-500 md:text-sm text-[12px]";

  const [relative, setRelative] = useState("");

  useEffect(() => {
    const relativeFunc = () => {
      const istTime = convertToISOWithIST(createdAt);
      console.log(istTime);
      const relativeTime = convertToRelativeTime(istTime);
      setRelative(relativeTime);
      return relativeTime;
    };

    if (createdAt) {
      relativeFunc();
    }
  }, []);


  return (
    <div className="flex gap-2 py-2 items-center cursor-pointer">
      <Avatar className={size === "small" ? smallImage : mediumImage}>
        <AvatarImage src={avatar} fetchPriority="high" />
        <AvatarFallback
          className={
            size === "small" ? "text-xs uppercase" : "text-base uppercase"
          }
        >
          {getInitials(`${firstName} ${lastName}`)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="inline-flex items-center gap-2 ">
          <Link href={`/gopal/profile/${user_id}`}>
            <h2 className={size === "small" ? smallText : mediumText}>
              {firstName} {lastName}
            </h2>
          </Link>
          <Verified className={size === "small" ? smallIcon : mediumIcon} />
        </div>
        {noDate ? null : (
          <div className="flex items-center gap-2 ">
            <p className={size === "small" ? smallTime : mediumTime}>
              {/* {moment(createdAt, "YYYYMMDD").fromNow()} | 0 */}
              {relative}
            </p>
            <Visible
              className={
                size === "small"
                  ? "md:w-3 md:h-3 h-3 w-3"
                  : "md:w-[16px] md:h-[16px] h-3 w-3"
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostAvatar;
