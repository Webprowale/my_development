import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/utils";
import { Verified } from "@/assets/icons";
import GoButton from "../goui/button";

import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CaretDown,
  CheckSquareOffset,
  GlobeHemisphereWest,
  Lock,
} from "@phosphor-icons/react";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function DropdownMenuCheckboxes() {}

type Props = {
  firstName: string;
  lastName: string;
  avatar?: string;
  picture?: string;
};

type FormAvatarProps = {
  firstName: string;
  lastName: string;
  picture: string;
  loading?: boolean;
  isDirty?: boolean;
  filePreviews?: any;
};

const CreateAvatar = ({ firstName, lastName, picture }: Props) => {
  return (
    <div className="flex gap-2 py-2 items-center px-7">
      <Avatar className="md:w-6 md:h-6 w-5 h-5 cursor-pointer">
        <AvatarImage src={picture} />
        <AvatarFallback>
          {getInitials(`${firstName} ${lastName}`)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <p className="font-satoshi font-semibold md:text-sm text-xs">
          Share your experience with the world
        </p>
      </div>
    </div>
  );
};

export default CreateAvatar;

export const FormAvatar = ({
  firstName,
  lastName,
  loading,
  picture,
  isDirty,
  filePreviews,
}: FormAvatarProps) => {
  return (
    <div className="flex justify-between mt-4">
      <div className="flex gap-2 py-2 items-center cursor-pointer">
        <Avatar className="md:w-14 md:h-14 w-10 h-10 cursor-pointer">
          <AvatarImage src={picture} />
          <AvatarFallback>
            {getInitials(`${firstName} ${lastName}`)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-2">
            <h2 className="font-satoshi font-semibold md:text-sm text-xs">
              {firstName} {lastName}
            </h2>
            <Verified className="w-3 h-3" />
          </div>
          {/* {filePreviews && filePreviews.length > 0 ? ( */}
          {true ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="bg-gray-200 px-2 py-0.5 p-0.5 h-7 rounded-sm w-fit"
                  variant="outline"
                >
                  <div className="flex items-center justify-between gap-3 rounded-sm">
                    <div className="flex items-center gap-1 rounded-sm">
                      <GlobeHemisphereWest size={16} />
                      <p className="text-xs font-medium">Public</p>
                    </div>
                    <CaretDown size={12} />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 p-2">
                {dropData?.map((drop, index) => {
                  const { name, icon, desc } = drop;
                  return (
                    <div
                      key={index}
                      className="flex gap-2 hover:bg-gray-100 p-2"
                    >
                      <div className="">{icon}</div>
                      <div className="flex flex-col">
                        <p className="font-semibold text-sm">{name}</p>
                        <p className="text-xs text-gray-600">{desc}</p>
                      </div>
                    </div>
                  );
                })}
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
      <button
        type="submit"
        className="bg-primary600 text-white rounded-sm px-8 py-[8px] md:text-xs text-xs h-fit w-fit hover:text-primary600 hover:bg-white border border-primary600 hover:border-primary600"
      >
        Post
      </button>
    </div>
  );
};

const dropData = [
  {
    name: "Public",
    icon: <GlobeHemisphereWest size={20} />,
    desc: "Everyone on the platform can see your post",
  },
  {
    name: "Public",
    icon: <CheckSquareOffset size={20} />,
    desc: "Only your followers can see your post.",
  },
  {
    name: "Private",
    icon: <Lock size={20} />,
    desc: "Only you can see your post.",
  },
];
