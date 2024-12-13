"use client";

import { ChatDots, IdentificationCard } from "@phosphor-icons/react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { KanbanCardType } from "@/interfaces";

const KanbanCard = ({ color }: KanbanCardType) => {
  return (
    <div className={`kanban-card bg-white rounded border-t-8 ${color} p-2`}>
      <div className="tags flex items-center gap-2 mb-2">
        <span className="text-sm bg-[#F0F2F5] text-black rounded p-1 px-2">
          Visa
        </span>
      </div>

      <h3 className="flex items-center gap-1 truncate text-sm mb-1">
        <IdentificationCard
          size={22}
          weight="fill"
          className="text-[#787070] flex-shrink-0 "
        />
        <span className="uppercase font-semibold flex-shrink-0">
          APP - 1234
        </span>
        <span className="capitalize flex-shrink-0">Visa Application</span>
      </h3>

      <p className="text-[#676E7E] text-sm font-medium">2024-05-15 08:00 AM</p>

      <Separator className="my-4" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Image
            src={"/assets/avatar.png"}
            width={24}
            height={24}
            alt=""
            className="w-[24px] h-[24px] object-cover rounded-full"
          />
          <h4 className="text-xs font-medium">Emmanuel Adebambo</h4>
        </div>

        <Link href={"#"}>
          <ChatDots size={18} />
        </Link>
      </div>
    </div>
  );
};

export default KanbanCard;
