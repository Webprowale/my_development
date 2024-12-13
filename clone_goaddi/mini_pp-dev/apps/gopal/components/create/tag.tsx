"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MagnifyingGlass, UserPlus } from "@phosphor-icons/react";
import PostAvatar from "../posts/dairy-post/avatar";

type TagProps = {
  open: boolean;
};

const Tag = ({ isOpen, onClose, side }: any) => {
  const onChange = (open: boolean) => {
    console.log(open, isOpen);
    if (!open && onClose) {
      onClose();
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={onChange ?? null}>
      <PopoverTrigger asChild>
        <UserPlus
          weight="bold"
          className="text-slate-600 cursor-pointer"
          size={25}
        />
      </PopoverTrigger>

      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={20}
        className="w-64"
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none mb-3">Tag</h4>
            <div className="relative h-fit">
              <Input
                type="text"
                className="w-full pl-9 h-9 bg-gray-100 focus-visible:bg-none rounded-sm focus:ring-0 focus:outline-none outline-none focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none"
                placeholder="Search"
              />
              <MagnifyingGlass
                size={17}
                className="absolute top-0 left-1.5 bottom-0 text-slate-700 translate-y-1/2"
              />
            </div>
            <div className="flex flex-col">
              {tags.map((tag) => {
                const { firstName, lastName, avatar } = tag;
                return (
                  <PostAvatar
                    key={firstName}
                    firstName={firstName}
                    lastName={lastName}
                    avatar={avatar}
                    size="small"
                    noDate={true}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Tag;

const tags = [
  {
    firstName: "Olajide",
    lastName: "Zaccheaus",
    avatar: "/assets/avatar-4.png",
    verified: true,
  },
  {
    firstName: "Adeniyi",
    lastName: "Tofunmi",
    avatar: "/assets/avatar-3.png",
    verified: false,
  },
  {
    firstName: "Fuad",
    lastName: " Adigun",
    avatar: "/assets/avatar.png",
    verified: false,
  },
];
