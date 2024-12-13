"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
// import { postData } from "@/data/post";
import ViewCarousel from "./view-carousel";
import ViewedPost from "./viewed-post";
import { IPOST } from "@/interfaces/posts";
import { getPost, getPostById } from "@/axios/endpoints/post.endpoint";

type Props = {
  userId: any;
};

const ViewPost = ({ userId }: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<IPOST>();
  const [posts, setPosts] = useState([]);

  const mode = useSearchParams().get("view");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, success } = await getPostById({
        postId: mode,
      });
      console.log(data);

      // const getAPost = data[0]?.posts?.find((post: any) => post.id === mode);
      setPost(data[0].postData[0]);
      // setPosts(data[0]?.posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(mode);
    if (mode && pathName.includes("/gopal")) {
      fetchPosts();
      setOpen(true);
    }
  }, [mode, pathName, router]);

  const onClose = () => {
    setOpen(false);
    // console.log("Close Clicked");
    router.replace(pathName, { scroll: false });
  };

  // console.log(open);

  return (
    <>
      {open && !loading ? (
        <Suspense>
          <div className="h-screen w-screen inset-0 fixed bg-slate-900/95 z-[999] overflow-hidden">
            <div className="flex w-full h-full">
              <div className="w-[55%] h-full">
                <ViewCarousel onClose={onClose} images={post?.files} />
              </div>
              <div className="w-[45%] h-full bg-white overflow-y-auto">
                {post ? <ViewedPost post={post} userId={userId} /> : null}
              </div>
            </div>
          </div>
        </Suspense>
      ) : null}
    </>
  );
};

export default ViewPost;
