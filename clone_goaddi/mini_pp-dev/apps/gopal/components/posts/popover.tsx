"use client";
import React, { useState } from "react";
import PostAvatar from "./dairy-post/avatar";
import { User } from "@phosphor-icons/react";
import { fetchFollowersAndFollowApi, followUser } from "@/axios/endpoints/user.endpoint";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/goui/spinner";

type Props = {};

const Popover = ({
  id,
  firstName,
  lastName,
  avatar,
  follows,
  followers,
  following,
  user_id
}: any) => {
  const [follow, setFollow] = useState(follows);
  const [followerss, setFollowerss] = useState(followers);
  const caption = `Chasing waterfalls and summiting mountains, one adventure at a time. Exploring the world's hidden gems and pushing my limits. Follow along for epic stories and breathtaking photos!`;

  const followFunc = async () => {
    try {
      setFollow(!follow);

      if (follow) {
        setFollowerss(parseInt(followerss) - 1);
      } else {
        setFollowerss(parseInt(followerss) + 1);
      }

      const response = await followUser({
        followUserId: id,
      });

      console.log(response);
    } catch (error) {}
  };

  const { data: followData, isLoading: loaddingFollowData } = useQuery({
    queryKey: ["fetchFollowersAndFollowApi",user_id],
    queryFn: () => fetchFollowersAndFollowApi(user_id),
    refetchOnWindowFocus: false,
    enabled:typeof user_id ==='string'
  });
  console.log({'id':typeof user_id})
  return (
    <div className="bg-white rounded-sm w-full flex flex-col">
      <PostAvatar
        firstName={firstName}
        lastName={lastName}
        avatar={avatar}
        size="small"
        user_id={user_id}
        noDate
      />
      <p className="text-[13px] tracking-tight font-normal text-gray-800">
        {caption.substring(0, 60)}
        {caption.length > 60 ? <span>...</span> : null}{" "}
      </p>

      <div className="grid grid-cols-4 mt-2 w-full">
        <img src="/assets/pop-1.png" className="w-16 h-20 rounded-sm" alt="" />
        <img src="/assets/pop-2.png" className="w-16 h-20 rounded-sm" alt="" />

        <div className="flex flex-col justify-between py-1 px-1 w-16 h-20 border-primary600 border rounded-sm">
          <User className="text-primary600" size={18} />
          <p className="text-xs">Followers</p>
          <p className="text-sm font-medium">
            {
          loaddingFollowData?
          <Spinner />
          :
         <>
         { followData?.followers?.length}
         </>
         }

            
          </p>
        </div>
        <div className="flex flex-col justify-between py-1 px-1 w-16 h-20 border-primary600 border rounded-sm">
          <User className="text-primary600" size={18} />
          <p className="text-xs">Following</p>
          <p className="text-sm font-medium">
          {
          loaddingFollowData?
          <Spinner />
          :
         <>
         { followData?.following?.length}
         </>
         }
            {/* {followData?.following?.length ?? 0} */}
            </p>
        </div>
      </div>
      {follow ? (
        <button
          onClick={() => followFunc()}
          className="border border-primary100 bg-primary100 rounded-sm w-full  hover: text-center mt-3 text-xs font-normal text-primary600 py-2 hover:bg-primary200 hover:text-primary600"
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={() => followFunc()}
          className="bg-primary600 rounded-sm w-full text-center mt-3 text-xs font-normal text-white py-2 hover:bg-primary700"
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default Popover;
