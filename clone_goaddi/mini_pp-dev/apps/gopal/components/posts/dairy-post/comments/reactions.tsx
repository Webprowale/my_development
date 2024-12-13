import React, { useEffect, useState } from "react";
import { Smiley, Plus } from "@phosphor-icons/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { convertToISOWithIST, convertToRelativeTime } from "@/utils";
import { commentReaction } from "@/axios/endpoints/post.endpoint";
import getUser from "@/lib/get-user";
import { useAuthStore } from "@/store/useAuthStore";

type Reaction = {
  name: string;
  icon: string;
};

export default function Reactions({
  createdAt,
  reactedData,
  commentId,
}: {
  createdAt: string;
  reactedData: any;
  commentId: string;
}) {
  const [open, setOpen] = useState(false);
  const [reactions, setReactions] = useState<Reaction[]>([]);

  useEffect(() => {
    const initialReactions = Object.entries(reactedData[0])
      //@ts-ignore
      .filter(([key, value]) => value > 0)
      .map(([name]) => {
        const icon =
          reactionIcons.find((icon) => icon.name === name)?.icon || "";
        return {
          name,
          icon,
        };
      });
    setReactions(initialReactions);
  }, [reactedData]);

  const { user } = useAuthStore((state) => ({ ...state })) as any;
  const { userId } = user;

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const handleReactionClick = async (index: number) => {
    const clickedReaction = reactionIcons[index];

    const reactionExists = reactions.some(
      (reaction) => reaction.name === clickedReaction.name,
    );

    if (!reactionExists) {
      const updatedReactions = [clickedReaction, ...reactions];
      setReactions(updatedReactions);
    }

    console.log("Post Id", commentId);
    const response = await commentReaction({
      commentId,
      reaction: clickedReaction.name,
    });

    if (response.success) {
      console.log(response);
    } else {
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="h-fit outline-none"
        >
          <DefaultIcon reactions={reactions} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        side="top"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-fit p-2 rounded-full"
      >
        <ReactionsPopover onClick={handleReactionClick} />
      </PopoverContent>
    </Popover>
  );
}

const ReactionsPopover = ({ onClick }: any) => {
  return (
    <ul className="flex gap-2 items-center">
      {reactionIcons.map((reaction, index) => {
        const { name, icon } = reaction;
        return (
          <li className="" key={name} onClick={() => onClick(index)}>
            <img
              src={icon}
              alt={name}
              className="w-8 h-8 cursor-pointer hover:-translate-y-3 hover:scale-150 transition-all duration-200"
            />
          </li>
        );
      })}
    </ul>
  );
};

const DefaultIcon = ({ reactions }: { reactions: Reaction[] }) => {
  return (
    <div className="flex items-center gap-2 w-fit">
      {reactions.length > 0 ? (
        <ul className="flex gap-0 items-center">
          {reactions.reverse().map((reaction: Reaction) => {
            const { name, icon } = reaction;
            return (
              <li className="" key={name}>
                <img
                  src={icon}
                  alt={name}
                  className="w-7 h-7 cursor-pointer hover:-translate-y-3 hover:scale-150 transition-all duration-200"
                />
              </li>
            );
          })}
        </ul>
      ) : null}
      <div className="flex items-center gap-1.5 rounded-full border border-gray-300 px-1 py-1 cursor-pointer">
        <Smiley className="md:text-[12px] text-[10px]" />
        <Plus className="md:text-[12px] text-[10px]" />
      </div>
    </div>
  );
};

const reactionIcons = [
  {
    id: 1,
    icon: "/assets/emoji/laugh.svg",
    name: "smile",
  },
  {
    id: 2,
    icon: "/assets/emoji/flight.svg",
    name: "flight",
  },
  {
    id: 3,
    icon: "/assets/emoji/love.svg",
    name: "love",
  },
  {
    id: 4,
    icon: "/assets/emoji/hot.svg",
    name: "hot",
  },
  {
    id: 5,
    icon: "/assets/emoji/like.svg",
    name: "like",
  },
  {
    id: 6,
    icon: "/assets/emoji/wow.svg",
    name: "wow",
  },
];
