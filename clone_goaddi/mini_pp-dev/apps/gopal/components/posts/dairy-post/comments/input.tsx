"use client";

import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/useAuthStore";
import { commentPost } from "@/axios/endpoints/post.endpoint";
import { ArrowBendUpRight, Smiley, X } from "@phosphor-icons/react";
import useClickOutside from "@/hooks/useClickOutside";

const formSchema = z.object({
  comment: z
    .string()
    .min(1, { message: "Comment must be at least 1 character" })
    .max(300, {
      message: "Comment must not be longer than 300 characters.",
    }),
});

interface CommentsProps {
  setComments: any;
  comments: any;
  postId: string;
  isReply: boolean;
  setIsReply: Dispatch<SetStateAction<boolean>>;
  commentId: string;
  commentUsername: string;
}

export const CommentForm: React.FC<CommentsProps> = ({
  commentId,
  commentUsername,
  isReply,
  setIsReply,
  comments,
  setComments,
  postId,
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasEmoji, setHasEmoji] = useState(false);

  const { user } = useAuthStore((state) => ({ ...state })) as any;
  const { firstName, lastName, picture } = user;

  // console.log("users top", user);

  const emojiRef = useClickOutside(() => setShowEmojis(false));

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const { isDirty } = form.formState;

  const commentValue = form.watch("comment");
  console.log(commentValue);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      if (isReply) {
        const foundRepliedComment = comments.find(
          (id) => id.commentId == commentId,
        );

        if (!foundRepliedComment) {
          console.log("Could not find comment to reply to");
        }
        // Reply to a comment
        const response = await commentPost({
          postId: postId,
          parentId: commentId,
          promotion: false,
          comment: data.comment,
        });
        if (response.success) {
          const newData = comments.map((parent) => {
            if (parent.commentId === commentId) {
              return {
                ...parent,
                repliesData: [
                  { ...response?.data[0].commentData[0] },
                  ...parent.repliesData,
                ],
              };
            }
            return parent;
          });

          setComments(newData);
          console.log("commentId", commentId, newData);
        } else {
          toast.error("Sorry, couldn't reply to this comment");
        }
      } else {
        // Post Comment
        const response = await commentPost({
          postId: postId,
          promotion: false,
          comment: data.comment,
        });

        if (response.success) {
          setComments([
            // {
            //   createdAt: "Just now",
            //   comment: data.coment,
            //   id: comments.length + 9999999 + user.userId,
            //   userinfo: [{ ...user }],
            // },
            { ...response?.data[0].commentData[0] },
            ...comments,
          ]);
        } else {
          toast.error("Sorry, couldn't comment on a post");
        }
        console.log(response);
      }

      // router.refresh();
      // toast.success(data.comment);
      form.reset();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // console.log("Key pressed:", event.key);
    if (event.key === "Enter" && !event.shiftKey) {
      // console.log("Enter key pressed without Shift");
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  const addEmoji = (e: any) => {
    let sym: string[] = e.unified.split("-");
    let codesArray: number[] = [];
    // console.log("ran")
    setHasEmoji(true);
    sym.forEach((el: string) => codesArray.push(parseInt("0x" + el, 16)));
    let emoji: string = String.fromCodePoint(...codesArray);
    form.setValue("comment", form.getValues("comment") + emoji);
  };

  return (
    <>
      <Separator className="h-[0.5px] bg-gray-200 mb-1" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div ref={emojiRef} className="w-full relative">
            {isReply ? (
              <div className="flex justify-between w-full">
                <div className="inline-flex items-center gap-x-2 text-primary600 text-sm">
                  <ArrowBendUpRight size={16} className="text-primary600" />
                  replying to @{commentUsername}
                </div>
                <button
                  type="button"
                  onClick={() => setIsReply(false)}
                  className="p-1 cursor-pointer"
                >
                  <X size={16} className="text-gray-500 " />
                </button>
              </div>
            ) : null}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* <Textarea
                      placeholder="Post a comment"
                      className="resize-y border-none focus:border-none focus-visible:ring-0 focus:border-0  outline-none focus:outline-none w-[calc(100%-130px)] placeholder:md:text-lg"
                    /> */}
                    <textarea
                      placeholder={
                        isReply
                          ? `Reply to ${commentUsername}`
                          : "Post a comment"
                      }
                      {...field}
                      onKeyDown={handleKeyDown}
                      className=" md:w-[calc(100%-130px)] w-[calc(100%-95px)] min-h-[80px] border-none outline-none py-1 md:text-base text-sm resize-none"
                      name=""
                    ></textarea>
                  </FormControl>
                  {/* <FormMessage className="md:text-base text-sm mt-6" /> */}
                  {commentValue.length > 300 && (
                    <FormMessage className="text-red-500 md:text-base text-sm mt-6">
                      Please keep your comment under 300 characters.
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <div className="relative md:bottom-2 bottom-4 w-10 h-10">
              <button
                className="button"
                type="button"
                onClick={() => setShowEmojis(!showEmojis)}
              >
                <Smiley weight="bold" className="text-slate-600" size={27} />
              </button>
              {showEmojis && (
                <div className="absolute z-10 w-10 h-10 right-0 top-10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                  <Picker
                    set=""
                    data={data}
                    theme="light"
                    onEmojiSelect={addEmoji}
                  />
                </div>
              )}
            </div>

            <button
              disabled={
                loading || (!isDirty && !hasEmoji) || commentValue.length > 300
              }
              className={`ml-auto absolute md:bottom-4 bottom-6  right-0 bg-primary600 md:text-base text-base text-white rounded-sm md:px-10 px-7 md:py-2 py-1.5 ${
                loading || (!isDirty && !hasEmoji) || commentValue.length > 300
                  ? "opacity-30"
                  : "opacity-100"
              }`}
              type="submit"
            >
              {isReply ? "Reply" : "Post"}
            </button>
          </div>
        </form>
      </Form>
      <Separator className="h-[0.5px] bg-gray-200 mt-1" />
    </>
  );
};
