"use client";
import { useState } from "react";
import { postData } from "@/data/post";
import { Separator } from "@/components/ui/separator";
import { Gallery, ThreeDots, Verified, Visible } from "@/assets/icons";
import { IPOST } from "@/interfaces/posts";
import PostMenu from "../post-menu";
import PostAvatar from "./avatar";
import DairyActions from "./actions";
import Comments from "./comments";
import DiaryPostImages, { PostImages } from "./images";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Popover from "../popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

type Props = {
  post: IPOST;
  isUser: boolean | string;
  classes?: string;
};

export const PostCard = async ({ post, isUser, classes }: Props) => {
  const [avatarHovered, setAvatarHovered] = useState(false);

  const {
    avatar,
    images,
    caption,
    commentsCount,
    commentsLists,
    diary,
    id,
    files,
    createdAt,
    likedStatus,
    likesCount,
    userinfo,
  } = post;

  const { firstName, lastName, picture } = post?.userinfo[0];

  const user_id = post?.userinfo[0].id;

  // console.log("CreatedAtPost", createdAt);
  // console.log("post created by", user_id);
  // console.log("filess", files);
  return (
    <div
      key={firstName}
      className={cn(
        "w-full max-w-full bg-white h-full shadow-sm py-3  px-7 rounded-[4px]",
        classes,
      )}
    >
      <div className="flex justify-between items-center">
        <HoverCard>
          <HoverCardTrigger asChild>
            <button>
              {createdAt && (
                <PostAvatar
                  createdAt={createdAt}
                  firstName={firstName}
                  lastName={lastName}
                  avatar={picture}
                  user_id={user_id}
                  size="medium"
                />
              )}
            </button>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className="relative m-1 my-1 px-4 w-80"
          >
            <Popover
              createdAt={createdAt}
              firstName={firstName}
              lastName={lastName}
              avatar={picture}
              size="small"
              user_id={user_id}
            />
          </HoverCardContent>
        </HoverCard>
        <PostMenu isUser={isUser} postUserId={userinfo[0]?.id} postId={id} />
      </div>
      <PostText caption={caption} />

      <Link
        scroll={false}
        href={cn(isUser ? `/gopal?view=${id}` : "/gopal?mode=auth")}
      >
        {diary ? (
          <div>
            {files.length < 1 ? null : <DiaryPostImages images={files} />}{" "}
          </div>
        ) : (
          <PostImages images={files} />
        )}
      </Link>

      <DairyActions
        diary={diary}
        postId={id}
        likedStatus={likedStatus}
        likesCount={likesCount}
        commentsCount={commentsCount}
        file={files[0]}
      />

      {commentsLists && (
        <Comments
          commentsLists={commentsLists}
          commentsCount={parseInt(commentsCount)}
          separate={true}
          form={true}
          postId={id}
          userId={user_id}
        />
      )}
    </div>
  );
};

export const PostText = ({ caption }: { caption: string }) => {
  const handleText = () => {
    if (caption.length > 286) {
      return true;
    } else {
      return false;
    }
  };

  function convertTextToHTML(text: string) {
    const regex = /@\[([^\]]+)\]/g;
    return text.replace(
      regex,
      '<span className="text-primary600" style="color: blue; text-decoration: underline;">$1</span>',
    );
  }

  const convertedCaption = convertTextToHTML(caption);

  const firstPart = handleText()
    ? convertedCaption.substring(0, 286)
    : convertedCaption;
  const remainingPart = handleText() ? convertedCaption.substring(286) : "";

  return (
    <div className="md:text-base text-sm font-normal py-2">
      <span dangerouslySetInnerHTML={{ __html: firstPart }} />
      {handleText() && (
        <>
          <span>...</span>{" "}
          <span className="text-primary600 font-semibold cursor-pointer">
            Read More
          </span>
        </>
      )}
      {/* {remainingPart && (
        <span dangerouslySetInnerHTML={{ __html: remainingPart }} />
      )} */}
    </div>
  );
};

const text = `Sharing my adventure in Santorini, a place where blue skies meet the sea,
      and cute white houses hug the cliffs. Walking through the charming
      villages felt like stepping into history, with pretty flowers everywhere.
      The sunsets were like a painting, all pink. Exploring streets, I
      found a peaceful haven, where the breeze carried stories of the past.
      Santorini is not just a spot on the map; it's a cozy memory etched in my
      heart.`;
