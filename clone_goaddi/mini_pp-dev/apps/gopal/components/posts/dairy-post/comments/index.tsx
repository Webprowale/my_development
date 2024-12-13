import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Comment from "./comment";
import { ICOMMENT } from "@/interfaces/posts";
import { CommentForm } from "./input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

type Props = {
  commentsLists: any;
  separate?: boolean;
  isView?: boolean;
  form?: boolean;
  postId?: any;
userId?: string;
  commentsCount: number;
};

const Comments = ({
  commentsLists,
  isView,
  separate,
  form,
  postId,
  commentsCount,
  userId
}: Props) => {
  const [comments, setComments] = useState(commentsLists);
  const [isReply, setIsReply] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [commentUsername, setCommentUsername] = useState(null);


  const handleIsReply = (commentid, username) => {
    setIsReply(true);
    setCommentId(commentid);
    setCommentUsername(username);
  };

  return (
    <div className="pb-20 relative h-full w-full">
      {separate ? <Separator /> : null}

      {comments?.length ? (
        <div className="my-4">
          <p className="mb-2 md:text-base text-sm text-gray-800 font-medium">
            Comments
          </p>
          <div className="w-full">
            {isView ? (
              <>
                {comments?.length
                  ? comments?.map((com: any) => {
                      const {
                        commentId,
                        commentsNum,
                        comment,
                        createdAt,
                        repliesData,
                        reactedData,
                        repliesCount,
                        userinfo
                      } = com;
                      const { firstName, lastName, picture, username, id } =
                        com?.userinfo[0];
                      return (
                        <Comment
                          handleIsReply={handleIsReply}
                          commentId={commentId}
                          key={commentId}
                          isView={isView}
                          postId={postId}
                          repliesCount={repliesCount}
                          repliesData={repliesData}
                          avatar={picture}
                          createdAt={createdAt}
                          username={username}
                          name={`${firstName} ${lastName}`}
                          text={comment}
                          commentsNum={commentsNum}
                          verified={false}
                          reactedData={reactedData}
                          commentOwnerId={id}

                        />
                      );
                    })
                  : null}
              </>
            ) : (
              <>
                {comments?.length
                  ? comments?.slice(0, 1)?.map((com: any) => {
                      const {
                        commentId,
                        commentsNum,
                        comment,
                        createdAt,
                        repliesData,
                        reactedData,
                        repliesCount
                        
                      } = com;
                      const { firstName, lastName, picture, username, id } =
                        com?.userinfo[0];
                      return (
                        <Comment
                          handleIsReply={handleIsReply}
                          commentId={commentId}
                          isView={isView}
                          key={commentId}
                          repliesCount={repliesCount}
                          repliesData={repliesData}
                          avatar={picture}
                          postId={postId}
                          createdAt={createdAt}
                          username={username}
                          name={`${firstName} ${lastName}`}
                          text={comment}
                          commentsNum={commentsNum}
                          verified={false}
                          reactedData={reactedData}
                          commentOwnerId={id}
                        />
                      );
                    })
                  : null}
              </>
            )}
          </div>
          {commentsCount > 2 ? (
            <ViewAllComments postId={postId} commentsCount={commentsCount} />
          ) : null}
        </div>
      ) : null}

      <div className={cn(isView ? " bg-white w-[41vw] bottom-0 fixed" : "")}>
        {form ? (
          <CommentForm
            commentUsername={commentUsername}
            commentId={commentId}
            setIsReply={setIsReply}
            isReply={isReply}
            postId={postId}
            setComments={setComments}
            comments={comments}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Comments;

const ViewAllComments = ({
  commentsCount,
  postId,
}: {
  commentsCount: number;
  postId: string;
}) => {
  console.log(commentsCount);
  const { user } = useAuthStore((state) => ({ ...state })) as any;
  return (
    <div className="relative">
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-[350px] h-[0.5px] my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <Link
          scroll={false}
          href={cn(user.userId ? `/gopal?view=${postId}` : "/gopal?mode=auth")}
          className="absolute px-3 text-nowrap font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900"
        >
          View all {commentsCount - 2} comments
        </Link>
      </div>
    </div>
  );
};
