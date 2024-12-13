import UploadPost from "@/components/posts/upload";
import React from "react";
import { Suspense } from "react";
import PostLoader from "@/app/gopal/post-loader";
import Posts from "@/components/posts/dairy-post";
import { getUserId } from "@/lib/get-user";
import { useAuthStore } from "@/store/useAuthStore";

type Props = {
  isUser: any;
};

const Timeline = () => {
  const { user } = useAuthStore((state) => ({ ...state })) as any;

  return (
    <div className="flex-auto w-full flex flex-col gap-7">
      {user.userId ? <UploadPost /> : null}
      <Suspense fallback={<PostLoader />}>
        <Posts isUser={user.userId} />
      </Suspense>
    </div>
  );
};

export default Timeline;
