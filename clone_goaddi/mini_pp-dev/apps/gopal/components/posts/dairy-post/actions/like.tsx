"use client";
import React, { useState } from "react";
import { Heart } from "@phosphor-icons/react";
import { toast } from "sonner";
import { likePost } from "@/axios/endpoints/post.endpoint";
import { getUserId } from "@/lib/get-userId";

type Props = {
  postId: string;
  likesCount: string;
  likedStatus: boolean;
};

const LikeAction = ({ postId, likesCount, likedStatus }: Props) => {
  const [isLiked, setIsLiked] = useState(likedStatus);
  const [likes, setLikes] = useState(parseInt(likesCount));

  // const userId = getUserId()

  const handleLike = async () => {
    // Like a post
    const like = async () => {
      if (!postId) {
        console.log("PostId not found");
      }

      setLikes(likes + 1);

      setIsLiked(true);

      const likeResponse = await likePost({
        postId,
        promotion: false,
        action: "like",
      });

      const { success } = likeResponse;

      if (!success) {
        setIsLiked(false);
      }
    };

    // Unlike a post
    const unlike = async () => {
      setLikes(likes - 1);

      setIsLiked(false);

      const likeResponse = await likePost({
        postId,
        promotion: false,
        action: "like",
      });

      const { success } = likeResponse;
      if (!success) {
        setIsLiked(false);
      }
    };

    if (!isLiked) {
      like();
    } else {
      unlike();
    }
  };

  return (
    <div
      onClick={handleLike}
      className="flex items-center group md:gap-1.5 gap-0.5 cursor-pointer"
    >
      <Heart
        weight={isLiked ? "fill" : "regular"}
        color={isLiked ? "#FF0707" : ""}
        className="hover:text-red-500 md:text-xl text-lg group-hover:scale-110 transition-all"
      />
      <p className="md:text-base text-sm">{likes}</p>
    </div>
  );
};

export default LikeAction;
