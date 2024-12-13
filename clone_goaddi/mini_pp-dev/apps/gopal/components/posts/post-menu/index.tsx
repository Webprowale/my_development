"use client";
import React, { Suspense } from "react";

import MobileMenuPost from "./mobile-post-menu";
import DesktopPostMenu from "./desktop-post.menu";
import ReportPostModal from "../report-post/ReportPostModal";
import { usePostStore } from "@/store/usePostStore";
import SuccessModal from "../report-post/SuccessModal";

const PostMenu = ({
  isUser,
  postUserId,
  postId,
}: {
  isUser: boolean | string;
  postUserId: string;
  postId: string;
}) => {
  const { reportPostSuccess, setReportPostSucess } = usePostStore(
    (state) => state,
  );
  return (
    <>
      {/* Desktop */}
      <div className="md:flex hidden">
        <DesktopPostMenu
          isUser={isUser}
          postUserId={postUserId}
          postId={postId}
        />
      </div>

      {/* Mobile */}
      <div className="md:hidden flex">
        <MobileMenuPost isUser={isUser} />
      </div>

      {/* Report Post Modals */}
       <Suspense>
         {reportPostSuccess ? <SuccessModal /> : <ReportPostModal />}
       </Suspense>
    </>
  );
};

export default PostMenu;
