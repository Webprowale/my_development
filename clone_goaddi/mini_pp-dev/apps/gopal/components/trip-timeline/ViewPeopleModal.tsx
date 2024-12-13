"use client";

import { X } from "@phosphor-icons/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/utils";
import { useEffect, useRef } from "react";

const ViewPeopleModal = ({ close }: { close: () => void }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    console.log(modalRef.current);
  });
  return (
    <div
      className="fixed inset-0 w-full h-screen bg-[#00000079] grid place-items-center z-50 backdrop-blur-sm"
      ref={modalRef}
    >
      <div className="bg-white w-full md:w-[40%] h-auto max-h-[80vh] p-6 rounded animate-scaleUp overflow-auto">
        <header className="relative z-10 mb-8">
          <Image
            src={`/assets/modal-people.svg`}
            width={70}
            height={70}
            className="mb-4"
            alt=""
          />

          <h3 className="font-semibold text-xl mb-2">People List</h3>
          <p className="text-sm text-[#647995] w-full md:w-[68%]">
            See all the people that can view your timeline
          </p>
          <X
            size={24}
            weight="bold"
            className="absolute right-0 top-[10px] cursor-pointer"
            onClick={() => {
              close();
            }}
          />
          <img
            src="/assets/modal-lines.svg"
            className="absolute left-0 right-0 top-0 w-full -z-[1]"
            alt=""
          />
        </header>

        {/* The peoples list */}
        <div className="people-list flex flex-col gap-6 overflow-auto scrollbar-thin scrollbar-corner-black scrollbar-track-white scrollbar-thumb-primary600 h-[350px] ">
          <Member
            avatar="/assets/avatar.png"
            name="Serena Williams"
            username="@serenaW"
            role="owner"
          />
          <Member
            avatar="/assets/avatar.png"
            name="Serena Williams"
            username="@serenaW"
            role="member"
          />
          <Member
            avatar="/assets/avatar.png"
            name="Serena Williams"
            username="@serenaW"
            role="member"
          />
          <Member
            avatar="/assets/avatar.png"
            name="Serena Williams"
            username="@serenaW"
            role="member"
          />
          <Member
            avatar="/assets/avatar.png"
            name="Serena Williams"
            username="@serenaW"
            role="member"
          />
          <Member
            avatar="/assets/avatar.png"
            name="Serena Williams"
            username="@serenaW"
            role="member"
          />
          <Member
            avatar="/assets/avatar.png"
            name="Serena Williams"
            username="@serenaW"
            role="owner"
          />
          <Member
            avatar="/assets/avatar.png"
            name="Serena Williams"
            username="@serenaW"
            role="owner"
          />
        </div>
      </div>
    </div>
  );
};

type MemberProps = {
  avatar: string;
  name: string;
  username: string;
  role: "owner" | "member" | "guest";
};

const Member = ({ avatar, name, username, role }: MemberProps) => {
  const RoleStyle = (role: string) => {
    if (role === "owner") {
      return `bg-primary100 text-primary600`;
    } else if (role === "member") {
      return `bg-[#FEF4E6] text-[#7A4504]`;
    } else if (role === "guest") {
      return `bg-[#F0F2F5] text-[#344054]`;
    }
  };
  return (
    <div className="flex items-center justify-between">
      <div className="left relative flex items-center gap-2">
        <div className="avatar relative w-max">
          <Avatar className="w-[54px] h-[54px] cursor-pointer">
            <AvatarImage src={avatar} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="status w-[16px] h-[16px] bg-green-600 border-2 border-white rounded-full absolute bottom-0 right-0"></div>
        </div>
        <div className="name">
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-[#676E7E]">{username}</p>
        </div>
      </div>
      <div className="right">
        <span
          className={`text-sm capitalize p-2 px-3 rounded font-normal ${RoleStyle(role)}`}
        >
          {role}
        </span>
      </div>
    </div>
  );
};

export default ViewPeopleModal;
