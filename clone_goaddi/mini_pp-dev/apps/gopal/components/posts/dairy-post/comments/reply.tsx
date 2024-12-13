import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  convertToISOWithIST,
  convertToRelativeTime,
  getInitials,
} from "@/utils";
import { Verified } from "@/assets/icons";
import Reactions from "./reactions";
import { DeleteCommentModal } from "./delete-comment-modal";

type Props = {
  name: string;
  avatar: string;
  username: string;
  text: string;
  createdAt: string;
  commentsNum?: number;
  verified: boolean;
  commentId: string;
  reactedData: any;
  commentOwnerId: string
  //   handleIsReply: (commentid: string, username: string) => void;
  //   repliesData: any;
};

const CommentReply = ({
  name,
  text,
  avatar,
  createdAt,
  commentId,
  verified,
  reactedData,
  commentOwnerId
}: Props) => {
  const [relative, setRelative] = useState("");

  useEffect(() => {
    const relativeFunc = () => {
      const istTime = convertToISOWithIST(createdAt);
      console.log(istTime);
      const relativeTime = convertToRelativeTime(istTime);
      setRelative(relativeTime);
      return relativeTime;
    };

    if (createdAt === "Just now") {
      setRelative(createdAt);
    } else {
      relativeFunc();
    }
  }, []);

  return (
    <div className="flex gap-2 pt-4 pb-5 items-start cursor-pointer">
      <Avatar className="md:w-12 md:h-12 w-10 h-10">
        <AvatarImage src={avatar} />
        <AvatarFallback className="uppercase">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex gap-5 items-end">
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-2">
            <h2 className="font-satoshi capitalize font-semibold md:text-base text-base">
              {name}
            </h2>
            {verified ? <Verified className="md:w-fit w-4 h-4" /> : null}
          </div>
          <p className="text-slate-900 md:text-base text-sm max-w-md">{text}</p>
          <div className="flex items-center gap-4 group">
            <p className="text-slate-600 md:text-xs text-[10px] text">
              {relative}
            </p>
            <Reactions
              reactedData={reactedData}
              createdAt={createdAt}
              commentId={commentId}
            />
             <DeleteCommentModal commentId={commentId} commentOwnerId={commentOwnerId}/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentReply;
