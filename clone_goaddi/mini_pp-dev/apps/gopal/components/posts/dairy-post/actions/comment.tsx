"use client";
import React from "react";
import { ChatCircle } from "@phosphor-icons/react";

type Props = {
  commentsCount: string;
};

const CommentAction = ({ commentsCount }: Props) => {
  return (
    <div className="flex items-center md:gap-1.5 gap-0.5">
      <ChatCircle className="md:text-xl text-lg" />
      <p className="md:text-base text-sm">{commentsCount}</p>
    </div>
  );
};

export default CommentAction;
