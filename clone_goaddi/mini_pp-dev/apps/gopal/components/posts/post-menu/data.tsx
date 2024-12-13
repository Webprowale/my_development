"use client";
import {
  DotsThreeVertical,
  UserPlus,
  Bookmark,
  Copy,
  ShareFat,
  Flag,
  Trash,
  NotePencil,
} from "@phosphor-icons/react";

const IconColor = "#344054";
const IconSize = 21;

export const menuList = [
  {
    icon: (
      <UserPlus
        color={IconColor}
        size={IconSize}
      />
    ),
    text: "Follow",
    user: false,
  },
  {
    icon: (
      <NotePencil
        color={IconColor}
        size={IconSize}
      />
    ),
    text: "Edit Post",
    user: true,
  },
  {
    icon: (
      <Bookmark
        color={IconColor}
        size={IconSize}
      />
    ),
    text: "Add to favourite",
    user: null,
  },

  {
    icon: (
      <Copy
        color={IconColor}
        size={IconSize}
      />
    ),
    text: "Copy Link",
    user: null,
  },
  {
    icon: (
      <ShareFat
        color={IconColor}
        size={IconSize}
      />
    ),
    text: "Share",
    user: null,
  },
  {
    icon: (
      <Flag
        color={IconColor}
        size={IconSize}
      />
    ),
    text: "Report",
    user: null,
  },
  {
    icon: (
      <Trash
        size={IconSize}
        className="text-[#344054] group-hover:text-red-700"
      />
    ),
    text: "Delete Post",
    user: true,
  },
];
