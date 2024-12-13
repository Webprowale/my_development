"use client";
import React, { Suspense, useEffect, useState } from "react";
import Button, { GoAuthButton } from "@/components/goui/button";
import Modal from "@/components/goui/modal";
import { usePostStore } from "@/store/usePostStore";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { deletePost } from "@/axios/endpoints/post.endpoint";
import { toast } from "sonner";
import { ShareNetwork, Trash } from "@phosphor-icons/react";

type Props = {
  postId: any;
};

const SharePost = () => {
  const { onShareClose, isShareOpen, postId } = usePostStore((state) => state);

  const handleCopy = async () => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(
        `http://localhost:3000/gopal?view=${postId}`,
      );
      toast.success("Link copied to clipboard");
    } else {
      document.execCommand(
        "copy",
        true,
        `http://localhost:3000/gopal?view=${postId}`,
      );
      toast.success("Link copied to clipboard");
    }
  };
  return (
    <Suspense>
      <Modal
        isOpen={isShareOpen}
        onClose={onShareClose}
        trigger={<p></p>}
        className="sm:max-w-[600px]"
      >
        <img
          className="absolute top-0 w-full h-fit z-[-1]"
          src="/assets/modal-lines.svg"
          alt="modal-lines"
        />
        <div className="z-10">
          <div className="p-5 bg-primary100 w-fit rounded-[4px]">
            <ShareNetwork weight="bold" className="w-7 h-7 text-primary600" />
          </div>
          <DialogHeader>
            <DialogTitle className="mt-2 text-xl">Share to</DialogTitle>
            <DialogDescription className="text-sm max-w-md mb-4">
              Select how you'd like to share this post.
            </DialogDescription>

            <div className="pt-5">
              <p className="pb-1 text-sm max-w-md text-muted-foreground">
                Copy link to share post
              </p>
              <div className="flex gap-2 items-center mt-2">
                <div className=" px-3 py-1.5 text-sm rounded-sm bg-gray-100 text-gray-600 w-fit">
                  http://localhost:3000/gopal?view={postId}
                </div>
                <button
                  onClick={handleCopy}
                  className="bg-primary200 font-medium text-primary600 text-sm px-2 py-1 rounded-sm"
                >
                  Copy
                </button>
              </div>
            </div>
            <div></div>
          </DialogHeader>
        </div>
      </Modal>
    </Suspense>
  );
};

export default SharePost;
