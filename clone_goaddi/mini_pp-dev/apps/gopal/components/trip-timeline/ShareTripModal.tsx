"use client";
import { CaretRight, MagnifyingGlass, X } from "@phosphor-icons/react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { getInitials, handleCopyClick } from "@/utils";
import { Checkbox } from "../ui/checkbox";
import { LocateOff } from "lucide-react";

const ShareTripModal = ({ close }: { close: () => void }) => {
  const [isFollower, setIsFollower] = useState(false);

  const changeIsFollower = () => {
    setIsFollower(true);
  };

  const closeModal = () => {
    close();
  };

  return (
    <div className="fixed inset-0 w-full h-screen bg-[#00000079] grid place-items-center z-50 backdrop-blur-sm">
      {!isFollower && (
        <Share changeModal={changeIsFollower} close={closeModal} />
      )}
      {isFollower && <ShareWithFollowers close={closeModal} />}
    </div>
  );
};

// The first page of the modal
const Share = ({
  changeModal,
  close,
}: {
  changeModal: () => void;
  close: () => void;
}) => {
  const location = window.location.href;
  return (
    <div className="bg-white w-full md:w-[40%] h-full max-h-[90vh] p-6 rounded overflow-auto">
      <header className="relative z-10 mb-8">
        <Image
          src={`/assets/modal-share.svg`}
          width={70}
          height={70}
          className="mb-4"
          alt=""
        />

        <h3 className="font-semibold text-xl mb-2">Share to</h3>
        <p className="text-sm text-[#647995] w-full md:w-[68%]">
          Select how you'd like to share this post.
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

      {/* Modal main section */}
      <div className="share-post">
        {/* copy to clipboard */}
        <div className="flex flex-col gap-2 pb-5">
          <h3 className="font-medium text-[#647995]">
            Copy link to share post
          </h3>
          <div className="copy-link flex items-center gap-2 ">
            <h4 className="py-2 px-4 bg-[#F0F2F5] w-[70%] flex-shrink-0 truncate">
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
        {/* share with followers */}
        <div className="p-4 py-8 border-y border-[#E4E7EC]">
          <div
            className="flex items-center px-3 bg-[#F7F9FC] gap-2 cursor-pointer"
            onClick={() => {
              changeModal();
            }}
          >
            <Image
              src={"/assets/share-with-followers.svg"}
              width={60}
              height={60}
              className="w-[60px] h-[60px]"
              alt=""
            />
            <p>Share with your followers</p>

            <CaretRight size={32} className="ml-auto" />
          </div>
        </div>

        {/* Social links */}
        <div className="social grid grid-cols-2 md:grid-cols-6 gap-x-4 gap-y-6  py-5">
          {socialLinks.map((platform: any, index: number) => (
            <a
              href="https://www.google.com"
              target="_blank"
              className="platform flex flex-col items-center justify-center gap-2 hover:bg-primary100 rounded-md p-2"
            >
              <Image
                src={platform?.image}
                width={50}
                height={50}
                className="h-[50px] w-[50px]"
                alt={`${platform?.name} icon`}
              />
              <p className="text-xs">{platform.name}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// the component shown when you click share with followers
const ShareWithFollowers = ({ close }: { close: () => void }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="bg-white w-full md:w-[40%] h-full max-h-[90vh] p-6 rounded overflow-hidden">
      <header className="relative z-10 mb-7">
        <Image
          src={`/assets/modal-share-followers.svg`}
          width={70}
          height={70}
          className="mb-4"
          alt=""
        />

        <h3 className="font-semibold text-xl mb-2">
          Share with your followers
        </h3>
        <p className="text-sm text-[#647995] w-full md:w-[68%]">
          Who would you like to share this with?
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

      {/* main section */}
      <section className="flex flex-col justify-between">
        <div className="search relative">
          <Input
            className="w-full h-[50px] bg-[#F0F2F5] pl-8 font-normal"
            placeholder="Search"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <MagnifyingGlass
            size={20}
            weight="light"
            className="absolute top-[50%] translate-y-[-50%] left-2 text-[#667185]"
          />

          {/* search results */}
          {isFocused && (
            <div className="bg-white absolute z-[1] top-14 w-full h-[250px] rounded-sm border border-primary200 shadow-xl">
              <div className="px-4 py-3 border border-b-gray-300 ">
                <div className="text-sm text-gray-600">
                  Start your search here
                </div>
              </div>
              <div className="flex flex-col items-center h-[80%] justify-center gap-2 ">
                <img src="/assets/search.svg" alt="" className="w-12" />
                <p className="text-slate-700 text-sm">Search for users...</p>
              </div>
            </div>
          )}
        </div>

        <div className="suggested my-2">
          <h3 className="text-sm py-2 text-[#647995]">Recent</h3>
          <div className="list flex flex-col gap-6 overflow-auto scrollbar-none h-[300px] ">
            <Member
              avatar="/assets/avatar.png"
              name="Serena Williams"
              username="@serenaW"
            />
            <Member
              avatar="/assets/avatar.png"
              name="Serena Williams"
              username="@serenaW"
            />
            <Member
              avatar="/assets/avatar.png"
              name="Serena Williams"
              username="@serenaW"
            />
            <Member
              avatar="/assets/avatar.png"
              name="Serena Williams"
              username="@serenaW"
            />
            <Member
              avatar="/assets/avatar.png"
              name="Serena Williams"
              username="@serenaW"
            />
            <Member
              avatar="/assets/avatar.png"
              name="Serena Williams"
              username="@serenaW"
            />
            <Member
              avatar="/assets/avatar.png"
              name="Serena Williams"
              username="@serenaW"
            />
          </div>
        </div>
        <Button
          variant={"default"}
          className="bg-primary600 text-white hover:bg-primary700 w-full py-3"
        >
          Send
        </Button>
      </section>
    </div>
  );
};

type MemberProps = {
  avatar: string;
  name: string;
  username: string;
};

// follower
// This component is used to display the list of followers to share
const Member = ({ avatar, name, username }: MemberProps) => {
  return (
    <label
      htmlFor={name}
      className="flex items-center justify-between cursor-pointer"
    >
      <div className="left relative flex items-center gap-3">
        <div className="avatar relative w-max">
          <Avatar className="w-[54px] h-[54px] cursor-pointer">
            <AvatarImage src={avatar} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="name">
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-[#676E7E]">{username}</p>
        </div>
      </div>
      <div className="right">
        <Checkbox id={name} />
      </div>
    </label>
  );
};

// Social media platforms details
const socialLinks = [
  {
    id: 1,
    name: "Facebook",
    image: "/assets/facebook.svg",
  },
  {
    id: 2,
    name: "Whatsapp",
    image: "/assets/whatsapp_icon.svg",
  },
  {
    id: 3,
    name: "X",
    image: "/assets/x_icon.svg",
  },
  {
    id: 4,
    name: "Instagram",
    image: "/assets/facebook.svg",
  },
  {
    id: 5,
    name: "Telegram",
    image: "/assets/telegram.svg",
  },
  {
    id: 6,
    name: "Snapchat",
    image: "/assets/facebook.svg",
  },
  {
    id: 7,
    name: "Reddit",
    image: "/assets/reddit.svg",
  },
  {
    id: 8,
    name: "SMS",
    image: "/assets/sms.svg",
  },
  {
    id: 9,
    name: "Email",
    image: "/assets/email.svg",
  },
  {
    id: 10,
    name: "More",
    image: "/assets/more.svg",
  },
];

export default ShareTripModal;
