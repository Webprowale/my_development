"use client";
import React, { useEffect, useState } from "react";
import PostAvatar from "../dairy-post/avatar";
import PostMenu from "../post-menu";
import { PostText } from "../dairy-post/card";
import DairyActions from "../dairy-post/actions";
import Comments from "../dairy-post/comments";
import { CommentForm } from "../dairy-post/comments/input";
import getUser from "@/lib/get-user";
import { useRouter } from "next/navigation";
import { IPOST } from "@/interfaces/posts";

type Props = {
  post: IPOST;
  isUser?: boolean | string;
  classes?: string;
  userId?: string;
};

const ViewedPost = ({ post, userId }: Props) => {
  const [comments, setComments] = useState([]);

  const router = useRouter();

  // console.log("User Id", userId);

  const {
    avatar,
    caption,
    images,
    commentsCount,
    commentsLists,
    diary,
    id,
    files,
    createdAt,
    likedStatus,
    likesCount,
    userinfo,
  } = post;

  const { firstName, lastName, picture } = post?.userinfo[0];

  useEffect(() => {
    setComments(commentsLists);
  }, []);

  return (
    <div className="mt-2 px-8 relative  w-full">
      <div className="flex justify-between items-center">
        <PostAvatar
          firstName={firstName}
          lastName={lastName}
          avatar={picture}
          size="medium"
        />
        <PostMenu
          isUser={userId ?? false}
          postUserId={userinfo[0]?.id}
          postId={id}
        />
      </div>

      <PostText caption={caption} />

      <DairyActions
        postId={id}
        likedStatus={likedStatus}
        likesCount={likesCount}
        commentsCount={commentsCount}
        diary={false}
      />
      
      <div className="w-full">
        {commentsLists ? (
          <Comments
            commentsLists={commentsLists}
            commentsCount={parseInt(commentsCount)}
            separate={true}
            form={true}
            postId={id}
            isView={true}
          />
        ) : null}
        {/* <Comments comments={comments} form={false} />
        <Comments comments={comments} form={false} /> */}

        {/* <div className="fixed bottom-10 w-[42%] bg-white">
          <CommentForm
            postId={id}
            setComments={setComments}
            comments={comments}
          />
        </div> */}
      </div>
    </div>
  );
};

export default ViewedPost;
