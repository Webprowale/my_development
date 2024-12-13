"use client";
import React from "react";

import ViewedPost from "@/components/posts/view-post/viewed-post";
import post from "./data";

const Sidebar = (isUser: any) => {
  return (
    <div className="bg-white w-full h-[720px] px-4 py-4">
      <ViewedPost post={post} />
    </div>
  );
};

export default Sidebar;
