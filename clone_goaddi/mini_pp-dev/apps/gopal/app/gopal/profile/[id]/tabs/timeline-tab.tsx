import Posts, { PostReaction } from "@/components/posts/dairy-post";
import Timeline from "../../../components/middle/timeline";
import { getUserId } from "@/lib/get-userId";
import { BsChatDots } from "react-icons/bs";
import PostLoader from "@/app/gopal/post-loader";
import { Suspense } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getUserPost } from "@/axios/endpoints/post.endpoint";
import { PostCard } from "@/components/posts/dairy-post/card";
import { useParams } from "next/navigation";


function TimelineTab() {

  const { user } = useAuthStore((state) => ({ ...state })) as any;

  // const user_id = user.userId;
  const {id:user_id } = useParams()

  const {data:posts,isLoading} = useQuery({
    // @ts-ignore
      queryFn:()=> getUserPost({userID:user_id}),
      queryKey:['getUserPost',user_id],
      enabled:typeof user_id ==='string',
      'select':(data)=> data[0]?.posts
  })
  console.log({user_id})
  return (
    <div>
      {/* <h1>Hello:{JSON.stringify(posts)}</h1> */}
     <Suspense fallback={<PostLoader />}>

          {/* <Posts isUser={user_id} isProfilePost={true} /> */}

          <div className="flex flex-col items-center justify-center gap-7">
    {
      posts ? (
        posts?.length !== 0 ? (
          posts?.map((post: any, index) => {
            if (!post?.files?.length) {
              return null;
            }
            return (
              <div
                key={`post-${index}`}
                // data-postid={post.id}
                className="post-card w-full flex flex-col justify-start"
              >
                {/* {isProfilePost ?: null} */}
                <PostReaction /> 
                {/* @ts-ignore */}
                <PostCard post={post} isUser={user_id} classes={''} />
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
        </Suspense>
      {/* <Timeline isUser={isUser} /> */}
     
    </div>
  );
}

export default TimelineTab;
