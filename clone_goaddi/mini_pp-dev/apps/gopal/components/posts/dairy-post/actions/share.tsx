import React, { useEffect } from "react";
import { ShareFat } from "@phosphor-icons/react";
import { usePostStore } from "@/store/usePostStore";

type Props = { postId: string };

const ShareAction = ({ postId }: Props) => {
  const { setPostId, onShareOpen } = usePostStore((state) => state);

  const handleShare = () => {
    setPostId(postId);

    onShareOpen();
  };

  return (
    <div
      onClick={handleShare}
      className="flex items-center  md:gap-1.5 gap-0.5 cursor-pointer"
    >
      <ShareFat className="md:text-xl text-lg" />
      <p className="md:text-base text-sm">0</p>
    </div>
  );
};

export default ShareAction;
