"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { IPOST } from "@/interfaces/posts";
import { getPost, getPostById } from "@/axios/endpoints/post.endpoint";
import { revalidatePath } from "next/cache";
import { PostCard } from "./card";
import PostLoading from "./loading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axios from "@/axios";
import DeletePost from "../delete-post";
import SharePost from "../share-post";
import ReactPullToRefresh from "react-pull-to-refresh";
import Spinner from "@/components/goui/spinner";
import { BsChatDots } from "react-icons/bs";

type Props = {
  post: IPOST;
  isUser: string;
  isProfilePost?: boolean;
};

export function PostReaction() {
  return (
    <p className="w-fit ml-6 px-2 text-xs font-medium text-gray-500 flex items-center gap-1  py-1 bg-gray-100 rounded-sm">
      <BsChatDots /> <span>You made a comment on this post</span>
    </p>
  );
}

const Posts = ({
  isUser,
  className,
  isProfilePost,
}: {
  isUser: string;
  className?: string;
  isProfilePost?: boolean;
}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchedPosts, setFetchedPosts] = useState<{ [key: string]: boolean }>(
    {},
  );
  const observer = useRef<IntersectionObserver | null>(null);
  const pathname = useSearchParams();
  const router = useRouter();

  const mode = useSearchParams().get("mode");


  const fetchPosts = async () => {
    setLoading(true);
    const { data, success } = await getPost();
    console.log("list of posts");
    console.log(data);
    setLoading(false);
    setPosts(data[0]?.posts);
  };

  // const handleIntersection = useCallback(
  //   async (entries) => {
  //     entries.forEach(async (entry) => {
  //       if (entry.isIntersecting) {
  //         const postId = entry.target.getAttribute("data-postid");

  //         if (postId && entry.isIntersecting) {
  //           if (!fetchedPosts[postId]) {
  //             const postdata = await getPostById({
  //               postId: postId,
  //             });

  //             console.log("Fectched Posts", fetchedPosts);
  //             // Update the specific post with fetched data
  //             setPosts((prevPosts) =>
  //               prevPosts.map((post) =>
  //                 post.id === postId
  //                   ? { ...post, ...postdata.data[0].postData[0] }
  //                   : post,
  //               ),
  //             );

  //             setFetchedPosts((prevFetchedPosts) => ({
  //               ...prevFetchedPosts,
  //               [postId]: true,
  //             }));
  //           }
  //         } else if (!entry.isIntersecting) {
  //           setFetchedPosts((prevFetchedPosts) => ({
  //             ...prevFetchedPosts,
  //             [postId]: false,
  //           }));
  //           console.log("refetch, not working");
  //         }
  //       }
  //     });
  //   },
  //   [fetchedPosts],
  // );

  const onRefreshPost = async () => {
    try {
      setLoading(true);
      const { data, success } = await getPost();
      console.log("list of posts 1");
      console.log(data);
      setPosts(data[0]?.posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (mode === "refresh") {
      router.replace("/gopal");
      setLoading(true);
      setTimeout(() => {
        fetchPosts();
        router.refresh();
        setLoading(false);
      }, 3000);
    }
  }, [mode, pathname, router]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, success } = await getPost();
      setPosts(data[0]?.posts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // useEffect(() => {
  //   if (observer.current) observer.current.disconnect();

  //   observer.current = new IntersectionObserver(handleIntersection, {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.1,
  //   });

  //   const elements = document.querySelectorAll(".post-card");
  //   elements.forEach((element) => observer.current?.observe(element));

  //   return () => observer.current?.disconnect();
  // }, [posts, handleIntersection]);

  // console.log(data);

  // if (!data) {
  //   return null;
  // }

  // revalidatePath("/gopal");

  return (
    <>
      <ReactPullToRefresh
        onRefresh={onRefreshPost}
        // icon={<Spinner />}
        // loading={<Spinner />}
        // disabled={loading}
        className="my-6"
      >
        <div className="flex flex-col items-center justify-center gap-7">
          {posts ? (
            posts.length !== 0 ? (
              posts.map((post: any, index) => {
                if (!post.files.length) {
                  return null;
                }
                return (
                  <div
                    key={`post-${index}`}
                    // data-postid={post.id}
                    className="post-card w-full flex flex-col justify-start"
                  >
                    {isProfilePost ? <PostReaction /> : null}
                    <PostCard post={post} isUser={isUser} classes={className} />
                  </div>
                );
              })
            ) : (
              <div className="bg-white p-4 w-full text-center">
                <div className="flex items-center justify-center">
                  <img src="/Chill.svg" alt="" />
                </div>
                <h2 className="font-[600] translate-y-[-20px]">No Timelines yet!</h2>
              </div>
            )
          ) : (
            <div className="bg-white p-4 w-full text-center">
              <div className="flex items-center justify-center">
                <img src="/Chill.svg" alt="" />
              </div>
              <h2 className="font-[600]">No Posts yet!</h2>
            </div>
          )}
        </div>
      </ReactPullToRefresh>

      {/* {loading && <PostLoading />} */}

      <DeletePost posts={posts} setPosts={setPosts} />
      <SharePost />
    </>
  );
};

export default Posts;
