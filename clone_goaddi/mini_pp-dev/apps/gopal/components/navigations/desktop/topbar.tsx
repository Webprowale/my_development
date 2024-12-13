"use client";
import GoButton from "@/components/goui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/utils";
import {
  Basket,
  Bell,
  CaretDown,
  ChartPieSlice,
  Eye,
  HandCoins,
  Hourglass,
  House,
  ListChecks,
  MagnifyingGlass,
  PlusSquare,
  SmileyXEyes,
  TrendUp,
  Wallet,
} from "@phosphor-icons/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import AvatarDropdown from "./dropdown";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getUserId } from "@/lib/get-userId";
import PostAvatar from "@/components/posts/dairy-post/avatar";
import { searchUsers } from "@/axios/endpoints/post.endpoint";
import debounce from "lodash.debounce";
import { AxiosResponse } from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Popover from "@/components/posts/popover";
import { useAuthStore } from "@/store/useAuthStore";
import { CreatePopover } from "@/components/CreatePopover";
import { useCreatePostStore } from "@/store/useCreatePostStore";

type Props = {
  showNav?: boolean;
  isUser?: boolean | string;
};

const TopBar = ({ showNav = true, isUser = "98" }: Props) => {
  const [focused, setFocused] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const {
		backLoader		
	} = useCreatePostStore((state) => ({
		...state,
	}));

  // const userId = getUser();

  // useEffect(() => {
  //   if (userId === undefined || !userId) {
  //     router.push("/gopal?mode=auth");
  //   }
  // }, [pathname, router]);
  return (
    <>
      <nav className="fixed top-0 h-20 bg-white w-full" style={{ zIndex: 30 }}>
        <div className="flex items-center justify-between w-full h-full max-w-[1700px] px-10 mx-auto">
          <div className="flex items-center gap-2 ">
            <Logo />
            <Search focused={focused} setFocused={setFocused} />
          </div>

          {showNav && (
            <div className="">
              <TopMenu isUser={isUser} />
            </div>
          )}
        </div>
        {focused ? (
          <div className="absolute top-20 left h-screen w-screen bg-black/80 -z-[1]"></div>
        ) : null}
      </nav>
      {backLoader.active && <div style={{ zIndex: 30 }} className="w-full  h-2 fixed top-20 left-0 transition-all duration-300">
        <div className={cn(`h-full bg-primary rounded-full w-${backLoader.progress}` )}/>
      </div>}
    </>
  );
};

export default TopBar;

export const Logo = () => {
  return (
    <div className="w-fit h-fit relative p-1 bg-primary600 rounded-sm">
      <Image
        src="/assets/logo-white.png"
        alt="GoPaddi Logo"
        width={60}
        height={60}
        className="w-8 h-8"
      />
    </div>
  );
};

interface SearchResult {
  id: string;
  name: string;
  firstname: string;
  picture: string;
  follows: boolean;
  followers: string;
  following: string;
  lastname: string;
}

export const Search = ({ focused, setFocused }: any) => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = debounce(async (searchQuery: string) => {
    try {
      if (searchQuery) {
        setSearching(true);
        setLoading(true);

        const response = await searchUsers({
          keyword: searchQuery,
          type: "user",
        });

        console.log(response);

        setTimeout(() => {
          setLoading(false);
          setSearchResults(response.result);
          if (!response.result.length) {
            setError(
              `Oops! "<span style= "color:#0D6EFD;">${searchQuery}</span>" does not exist.`,
            );
            console.error(`"${searchQuery}" does not exist.`, error);
          }
        }, 1000);
      }
    } catch (error) {
      setError("Error fetching search results. Please try again later.");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      console.error("Error fetching search results:", error);
    }
  }, 100);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery) {
      setLoading(true);
      debouncedSearch(searchQuery);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearching(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="relative h-fit ">
      <div className="relative">
        <Input
          type="text"
          className={cn(
            "transition-all duration-300 pl-9 bg-gray-100 focus-visible:bg-none rounded-sm focus:outline-none outline-none",
            focused ? "w-[450px]" : "w-[250px]",
          )}
          placeholder="Search"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <MagnifyingGlass
          size={19}
          weight="bold"
          className={cn(
            "absolute top-0.5 left-1.5 bottom-0 text-slate-700 translate-y-1/2",
            focused ? "text-primary600" : "",
          )}
        />
      </div>

      {focused && !query ? (
        <div className="bg-white absolute z-[1] top-14 w-[450px] h-[500px] rounded-sm shadow-sm border border-primary200 ">
          <div className="px-4 py-3 border border-b-gray-300 ">
            <div className="text-sm text-gray-600">Start your search here</div>
          </div>
          <div className="flex flex-col items-center h-[80%] justify-center gap-2 ">
            <img src="/assets/search.svg" alt="" className="w-24" />
            <p className="text-slate-700 text-sm">Search users</p>
          </div>
        </div>
      ) : null}

      {searching && query ? (
        <>
          {!searchResults?.length && error && query ? (
            <div className="bg-white absolute z-[1] top-14 w-[450px] h-[500px] px-4 rounded-sm shadow-sm border border-primary200 py-3 ">
              <div className="flex flex-col justify-center items-center w-full h-full">
                <SmileyXEyes
                  weight="bold"
                  size={33}
                  className="text-primary600"
                />
                <p className="text-sm text-center font-medium text-gray-600 mt-3 w-[200px]">
                  <span dangerouslySetInnerHTML={{ __html: error }}></span>
                </p>
              </div>
            </div>
          ) : null}

          {loading && (
            <div className="bg-white flex flex-col absolute z-[2] top-14 w-[450px] h-[500px] overflow-y-scroll rounded-sm shadow-sm border border-primary200 ">
              <div className="px-4 py-3 border border-b-gray-300 ">
                <div className="text-sm text-gray-600">Accounts</div>
              </div>

              {Array.from({
                length: 20,
              })?.map(() => {
                return (
                  <div className="flex items-center space-x-4 px-4 py-2">
                    <Skeleton className="md:w-9 md:h-9 w-8 h-8 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-3 w-[100px]" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {searchResults?.length ? (
            <div className="bg-white flex flex-col  absolute z-[1] top-14 w-[450px] h-[500px] overflow-y-scroll rounded-sm shadow-sm border border-primary200">
              <div className="sticky w-full z-[3] px-4 py-3 border bg-white border-b-gray-300 ">
                <div className="text-sm text-gray-600">Accounts</div>
              </div>

              {searchResults?.slice(0, 20).map((user, index) => {
                const {
                  id,
                  firstname,
                  lastname,
                  follows,
                  picture,
                  followers,
                  following,
                } = user;

                return (
                  <div className="hover:bg-gray-100 px-4">
                    {/* <PostAvatar
                      firstName={firstname}
                      lastName={lastname}
                      avatar={picture}
                      size="small"
                      noDate
                    /> */}

                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <button>
                          <PostAvatar
                            firstName={firstname}
                            lastName={lastname}
                            avatar={picture}
                            size="small"
                            user_id={id}
                            noDate
                          />
                        </button>
                      </HoverCardTrigger>
                      <HoverCardContent
                        align="start"
                        side="right"
                        sideOffset={30}
                        className="relative m-1 my-1 px-4 w-80"
                      >
                        <Popover
                          createdAt=""
                          firstName={firstname}
                          id={id}
                          lastName={lastname}
                          follows={follows}
                          followers={followers}
                          following={following}
                          avatar={picture}
                          size="small"
                          user_id={id}
                        />
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                );
              })}

              <div className="sticky bottom-0 z-[4]  cursor-pointer hover:bg-gray-50 w-full flex items-center gap-2 px-4 py-2 border bg-white border-b-gray-300 ">
                <div className="p-2 rounded-full bg-primary100">
                  <Eye className="text-primary600" weight="bold" size={20} />
                </div>
                <div className="text-sm text-gray-700">
                  <Link href={`/gopal/search?search=${query}`}>
                    See all the result for "{query}"
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};
const extractCloudinaryLink = (str) => {
  const regex = /(https:\/\/res\.cloudinary\.com\/[^\s]+)/;
  const match = str?.match(regex);
  return match ? match[0] : null;
};
export const TopMenu = ({ isUser }: Props) => {
  const { user } = useAuthStore((state) => ({ ...state })) as any;
  const { firstName, lastName, picture, userId } = user;
  // console.log("users top", user, { picture: extractCloudinaryLink(picture) });

  return (
    <div className="flex items-center">
      <ul className="flex gap-5 items-center">
        {isUser
          ? menuItems.map((item) => {
              const { name, icon, href } = item;
              return (
                <li key={name} className="">
                  <Link
                    className="flex flex-col items-center text-slate-600 gap-1 cursor-pointer group"
                    href={href ?? ""}
                  >
                    {icon}
                    <p
                      className={`text-xs group-hover:text-slate-800 ${
                        name === "Home"
                          ? "text-slate-800 font-semibold"
                          : "text-slate-600"
                      }`}
                    >
                      {name}
                    </p>
                  </Link>
                </li>
              );
            })
          : null}
      </ul>

      {isUser ? <div className="mx-7 w-px h-9 bg-gray-300" /> : null}
      <ul className="flex gap-5 items-center">
        {isUser ? (
          <>
            <li>
              <Link href="/gopal/subscription">
                <GoButton className="text-xs">Subscribe</GoButton>
              </Link>
            </li>
            {addOnItems?.map((item) => {
              const { name, icon } = item;
              if (name === "Create") {
                return (
                  <div key={name}>
                    <CreatePopover icon={icon} name={name} />
                  </div>
                );
              } else
                return (
                  <li
                    key={name}
                    className="flex flex-col items-center text-slate-600 gap-1 cursor-pointer"
                  >
                    <Link
                      href={item.link ? item.link : ""}
                      className="flex flex-col items-center"
                    >
                      {icon}
                      <p className="text-xs">{name}</p>
                    </Link>
                  </li>
                );
            })}

            {isUser && user ? (
              <AvatarDropdown
                avatar={picture ? extractCloudinaryLink(picture) : ""}
                firstName={firstName}
                lastName={lastName}
                userId={userId}
              />
            ) : null}
          </>
        ) : (
          <>
            <li>
              <Link href="/auth/sign-in">
                <GoButton className="text-xs font-medium">Sign in</GoButton>
              </Link>
            </li>

            <li>
              <Link href="/auth/sign-up">
                <GoButton className="text-xs bg-primary200  text-primary600 border-primary200 font-medium">
                  Sign up
                </GoButton>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

const IconSize = 24;

const menuItems = [
  {
    name: "Home",
    icon: <House weight="fill" className="text-slate-800" size={IconSize} />,
    href: "/gopal",
  },
  {
    name: "Dashboard",
    icon: <ChartPieSlice size={IconSize} />,
    href: "/gopal/dashboard",
  },
  {
    name: "Wallet",
    icon: <Wallet size={IconSize} />,
    href: "/gopal/wallet?tab=wallet",
  },
  {
    name: "Trip Timeline",
    icon: <Hourglass size={IconSize} />,
    href: "/gopal/trip-timeline",
  },

  {
    name: "Plan a trip",
    icon: <ListChecks size={IconSize} />,
    href: "/gopal/trip-planner",
  },
  {
    name: "Commission for life",
    icon: <HandCoins size={IconSize} />,
    href: "/gopal/commission",
  },
];

const addOnItems = [
  {
    name: "Notification",
    icon: <Bell size={IconSize} />,
    link: "/gopal/notification",
  },
  {
    name: "Wishlist",
    icon: <Basket size={IconSize} />,
    link: "/gopal/wishlist",
  },
  {
    name: "Create",
    icon: <PlusSquare size={IconSize} />,
  },
];
