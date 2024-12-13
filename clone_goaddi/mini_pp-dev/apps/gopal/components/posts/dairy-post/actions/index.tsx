"use client";

import React from "react";
import ShareAction from "./share";
import LikeAction from "./like";
import CommentAction from "./comment";
import BookmarkAction from "./bookmark";
type Props = {
  postId: string;
  likesCount: string;
  likedStatus: boolean;
  commentsCount: string;
  diary?: boolean;
  file?: string;
};
const DairyActions = ({
  postId,
  likesCount,
  likedStatus,
  commentsCount,
  diary,
  file
}: Props) => {
  return (
    <div className="flex justify-between w-full my-5">
      <div className="flex md:gap-7 gap-4 items-center ">
        <LikeAction
          postId={postId}
          likesCount={likesCount}
          likedStatus={likedStatus}
        />
        <CommentAction commentsCount={commentsCount} />
        <ShareAction postId={postId} />
        <BookmarkAction postImage={file} postId={postId} />
      </div>

      {diary && (
        <button className="py-1.5 px-5 rounded bg-primary100/70 md:text-sm text-xs font-medium text-primary600 hover:text-white hover:bg-primary600 hover:scale-105 transition-all">
          View Diary
        </button>
      )}
    </div>
  );
};

export default DairyActions;
