"use client";

import { X } from "@phosphor-icons/react";
import Image from "next/image";
import { default as MultiSelect } from "react-select";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials, handleCopyClick } from "@/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddPeopleModal = ({ close }: { close: () => void }) => {
  const location = window.location.href;
  return (
    <div className="fixed inset-0 w-full h-screen bg-[#00000079] grid place-items-center z-50 backdrop-blur-sm">
      <div className="bg-white w-full md:w-[40%] h-full max-h-[90vh] p-6 rounded overflow-auto">
        <header className="relative z-10 mb-8">
          <Image
            src={`/assets/modal-add-people.svg`}
            width={70}
            height={70}
            className="mb-4"
            alt=""
          />

          <h3 className="font-semibold text-xl mb-2">Add new people</h3>
          <p className="text-sm text-[#647995] w-full md:w-[68%]">
            Add new people to view your trip timeline
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

        {/* modal main section */}
        <section className="flex flex-col justify-between h-max">
          {/* add user modal */}
          <AddUserInput />

          {/* list of members */}
          <div className="flex flex-col">
            <h3 className="text-[#647995] text-sm mb-4 mt-2">
              Number of People (20)
            </h3>
            <div className="people-list flex flex-col flex-grow gap-6 overflow-auto scrollbar-thin scrollbar-corner-black scrollbar-track-white scrollbar-thumb-primary600 h-[220px] ">
              <Member
                avatar="/assets/avatar.png"
                name="Serena Williams"
                username="@serenaW"
                role="owner"
                isOwner={true}
              />
              <Member
                avatar="/assets/avatar.png"
                name="Serena Williams"
                username="@serenaW"
                role="owner"
                isOwner={false}
              />
              <Member
                avatar="/assets/avatar.png"
                name="Serena Williams"
                username="@serenaW"
                role="owner"
                isOwner={false}
              />
              <Member
                avatar="/assets/avatar.png"
                name="Serena Williams"
                username="@serenaW"
                role="owner"
                isOwner={false}
              />
              <Member
                avatar="/assets/avatar.png"
                name="Serena Williams"
                username="@serenaW"
                role="owner"
                isOwner={false}
              />
              <Member
                avatar="/assets/avatar.png"
                name="Serena Williams"
                username="@serenaW"
                role="owner"
                isOwner={false}
              />
              <Member
                avatar="/assets/avatar.png"
                name="Serena Williams"
                username="@serenaW"
                role="owner"
                isOwner={false}
              />
            </div>
          </div>

          {/* Copy link to add people */}
          <div className="copy border-t border-t-[#E4E7EC] mt-4 pt-4">
            <div className="flex flex-col gap-2">
              <h3 className="flex items-center gap-2 text-sm text-[#647995]">
                Copy link to add people to trip timeline{" "}
                <span className="text-[#865503] bg-[#FEF6E7] py-2 px-2 font-medium rounded text-xs">
                  view access
                </span>
              </h3>
              <div className="copy-link flex items-center gap-2 ">
                <h4 className="py-2 px-4 bg-[#F0F2F5] w-[70%] truncate flex-shrink-0 text-[#676E7E]">
                  {location}
                </h4>
                <Button
                  variant={"default"}
                  className="text-primary600 bg-primary100 hover:bg-primary200 ease-linear duration-150 py-2 px-6 text-sm"
                  onClick={() => {
                    handleCopyClick(location);
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const AddUserInput = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div className="">
      <form className="flex items-center gap-2">
        <div className="input flex items-center bg-[#F0F2F5] w-[80%] rounded px-2">
          <MultiSelect
            options={options}
            className="flex-grow self-stretch !bg-transparent !border-none border-transparent"
            isMulti
            id="multi-select"
          />
          <select
            id="roles"
            className="bg-transparent text-[#647995]"
          >
            <option value="Member">Member</option>
            <option value="Guest">Guest</option>
          </select>
        </div>
        <Button
          variant={"default"}
          className="hover:bg-primary700 w-[20%] h-[50px] rounded"
        >
          Send invite
        </Button>
      </form>
    </div>
  );
};

type MemberProps = {
  avatar: string;
  name: string;
  username: string;
  role: "owner" | "member" | "guest";
  isOwner: boolean;
};

const Member = ({
  avatar,
  name,
  username,
  role,
  isOwner = false,
}: MemberProps) => {
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
        {isOwner ? (
          <span
            className={`text-sm capitalize p-3 px-4 rounded font-normal ${RoleStyle(role)}`}
          >
            {role}
          </span>
        ) : (
          <Select>
            <SelectTrigger className="p-2 ">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="guest">Guest</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default AddPeopleModal;
