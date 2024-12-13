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
import { Trash } from "@phosphor-icons/react";

type Props = {
  posts: any;
  setPosts: any;
};

const DeletePost = ({ posts, setPosts }: Props) => {
  const { onDeleteClose, isDeleteOpen, postId } = usePostStore(
    (state) => state,
  );
  console.log(posts, postId);

  const handlePostDelete = async () => {
    try {
      const response = await deletePost({ postId });

      console.log(response);

      if (response.success) {
        toast.success("Post deleted successfully");
        console.log(postId);
        const newPosts = posts?.filter((post: any) => post?.id !== postId);
        console.log(newPosts);
        setPosts(newPosts);
        onDeleteClose();
      } else {
        toast.error("Something went wrong");
        onDeleteClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Suspense>
      <Modal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
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
            <Trash weight="bold" className="w-7 h-7 text-primary600" />
          </div>
          <DialogHeader>
            <DialogTitle className="mt-6 text-xl">Delete Post?</DialogTitle>
            <DialogDescription className="text-lg max-w-md">
              Heads up! Deleting this post is permanent. It will disappear from
              your profile, your followers' feeds, and search results.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 flex justify-between items-center gap-x-3">
            <GoAuthButton
              type="submit"
              onClick={() => onDeleteClose()}
              variant="secondary"
              className="w-full py-3  md:text-sm mt-8 font-medium transition-all"
            >
              Cancel
            </GoAuthButton>

            <GoAuthButton
              type="submit"
              onClick={handlePostDelete}
              className="w-full bg-red-600 py-3 md:text-sm mt-8 font-medium transition-all border-red-600 hover:bg-red-500 group-hover:text-white hover:text-white hover:border-red-500"
            >
              Delete
            </GoAuthButton>
          </div>
        </div>
      </Modal>
    </Suspense>
  );
};

export default DeletePost;
