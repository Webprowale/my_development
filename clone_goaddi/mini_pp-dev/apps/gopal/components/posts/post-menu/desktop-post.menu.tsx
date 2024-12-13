import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { menuList } from "./data";
import { DotsThreeVertical } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import Modal from "@/components/goui/modal";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/components/goui/button";
import { usePostStore } from "@/store/usePostStore";
import { cn } from "@/lib/utils";

type Props = {
  isUser: boolean | string;
  postUserId: string;
  postId: string;
};

const DesktopPostMenu = ({ isUser, postUserId, postId }: Props) => {
  console.log(isUser, postUserId, postId);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DotsThreeVertical className="text-3xl w-7 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-[175px] md:p-4 items-start"
      >
        <DropdownMenuGroup>
          {menuList.map((list) => {
            const { icon, text, user } = list;
            return (
              <React.Fragment key={text}>
                {(postUserId === isUser && user === Boolean(isUser)) ||
                user === null ? (
                  <MenuItem
                    key={text}
                    icon={icon}
                    text={text}
                    postId={postId}
                  />
                ) : null}
              </React.Fragment>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DesktopPostMenu;

const MenuItem = ({
  icon,
  text,
  postId,
}: {
  icon: React.JSX.Element;
  text: string;
  postId: string;
}) => {
  const { onDeleteOpen, setPostId, onShareOpen } = usePostStore(
    (state) => state,
  );
  const router = useRouter();

  const handleButtonClick = () => {
    switch (text) {
      case "Delete Post":
        setPostId(postId);
        onDeleteOpen();
        break;
      case "Share":
        // Perform action for option 2
        setPostId(postId);
        onShareOpen();

        break;
      case "Report":
        // Perform action for option 3
        console.log("reporting a post");
        console.log(postId);
        router.push(`/gopal?reportpost=${postId}`);
        break;
      default:
        // Default action
        console.log("No option selected");
    }
  };

  return (
    <>
      <DropdownMenuItem
        onClick={handleButtonClick}
        className={cn(
          "w-full inline-flex items-center gap-1 cursor-pointer md:px-1 md:py-3",
          text === "Delete Post"
            ? "focus:bg-red-50 group focus:text-red-700"
            : null,
        )}
      >
        {icon}
        <span className="font-medium text-sm">{text}</span>
      </DropdownMenuItem>
    </>
  );
};
