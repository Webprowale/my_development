import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  convertToISOWithIST,
  convertToRelativeTime,
  getInitials,
} from "@/utils";
import { Verified } from "@/assets/icons";
import Reactions from "./reactions";
import CommentReply from "./reply";
import Link from "next/link";
import { DeleteCommentModal } from "./delete-comment-modal";

type Props = {
  name: string;
  avatar: string;
  username: string;
  text: string;
  createdAt: string;
  commentsNum?: number;
  verified: boolean;
  isView: boolean;
  commentId: string;
  postId: string;
  repliesCount: number;
  handleIsReply: (commentid: string, username: string) => void;
  repliesData: any;
  reactedData: any;
  commentOwnerId: string;
};

const Comment = ({
  handleIsReply,
  avatar,
  username,
  name,
  text,
  commentId,
  commentsNum,
  verified,
  postId,
  createdAt,
  repliesData,
  reactedData,
  isView,
  repliesCount,
  commentOwnerId
}: Props) => {
  const [relative, setRelative] = useState("");
  const [openReply, setOpenReply] = useState(false);

  useEffect(() => {
    const relativeFunc = () => {
      const istTime = convertToISOWithIST(createdAt);
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
    <div className="">
      <div className="flex max-w-md w-full justify-between">
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
              <p className="text-slate-900 md:text-base text-sm max-w-md">
                {text}
              </p>
              <div className="flex items-center gap-4 group">
                <p className="text-slate-600 md:text-xs text-[10px] ">
                  {relative}
                </p>
                <Reactions
                  createdAt={createdAt}
                  reactedData={reactedData}
                  commentId={commentId}
                />
                <button
                  type="button"
                  onClick={() =>
                    handleIsReply(commentId, username == "" ? name : username)
                  }
                  className="text-xs font-medium text-gray-600"
                >
                  Reply
                </button>
               
                <DeleteCommentModal commentId={commentId} commentOwnerId={commentOwnerId}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-md w-full">
        {!openReply && repliesCount && repliesCount > 0 ? (
          <>
            {isView ? (
              <button
                onClick={() => setOpenReply(true)}
                className="flex gap-x-2 w-[300px] items-center pt-1"
              >
                <div className="h-[1px] w-24 bg-gray-300 rounded-lg"></div>
                <div className="text-nowrap text-slate-400 font-medium text-xs ">
                  {`View ${repliesCount} ${repliesCount > 1 ? "replies" : "reply"}`}
                </div>
              </button>
            ) : (
              <Link
                href={`/gopal?view=${postId}`}
                className="flex gap-5 w-[300px] items-center pt-1"
              >
                <div className="h-[1px] w-24 bg-gray-300 rounded-lg"></div>
                <div className="text-nowrap text-slate-400 font-medium text-xs ">
                  {`View ${repliesCount} ${repliesCount > 1 ? "replies" : "reply"}`}
                </div>
              </Link>
            )}
          </>
        ) : (
          <div className="w-full">
            <div className="flex flex-col gap-y-3 items-start ml-8 transition-all">
              {repliesData?.map((reply) => {
                const {
                  commentId,
                  commentsNum,
                  comment,
                  createdAt,
                  repliesData,
                  reactedData,
                } = reply;
                const { firstName, lastName, picture, username } =
                  reply?.userinfo[0];
                return (
                  <CommentReply
                    commentId={commentId}
                    key={commentId}
                    // repliesData={repliesData}
                    reactedData={reactedData}
                    avatar={picture}
                    createdAt={createdAt}
                    username={username}
                    name={`${firstName} ${lastName}`}
                    text={comment}
                    commentsNum={commentsNum}
                    verified={false}
                    commentOwnerId={commentOwnerId}
                  />
                );
              })}
            </div>
            {openReply && repliesCount > 0 ? (
              <button onClick={() => setOpenReply(false)} className="ml-auto">
                <div className="text-nowrap text-slate-400 font-medium text-xs ">
                  Hide
                </div>
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
