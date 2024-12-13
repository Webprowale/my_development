"use client";

import { X, CurrencyNgn, Trash, Info } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addCommasToNumber } from "@/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";

const ShareModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();
  const mode = useSearchParams();
  const currentPath = usePathname();

  const handleClose = () => {
    router.push(currentPath, { scroll: false });
  };

  useEffect(() => {
    if (mode.get("share") === "open") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (event: any) => {
        if (event.key === "Escape") {
          router.push(currentPath);
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 w-full h-screen bg-[#00000079] grid place-items-center z-50 backdrop-blur-sm">
          <div className="bg-white w-full md:w-[40%] h-auto max-h-[90vh] p-6 rounded overflow-auto scrollbar-thin">
            <header className="relative z-10 mb-4">
              <Image
                src={`/assets/modal-share.svg`}
                width={70}
                height={70}
                className="mb-4"
                alt=""
              />

              <h3 className="font-semibold text-xl mb-2">Share to</h3>
              <p className="text-sm text-[#647995] w-full md:w-[68%]">
                Select how you'd like to share this trip.
              </p>
              <X
                size={24}
                weight="bold"
                className="absolute right-0 top-[10px] cursor-pointer"
                onClick={() => {
                  handleClose();
                }}
              />
              <img
                src="/assets/modal-lines.svg"
                className="absolute left-0 right-0 top-0 w-full -z-[1]"
                alt=""
              />
            </header>

            {/* Tab toggle */}
            <Tabs defaultValue="users" className="w-full h-full mb-2">
              <div className="">
                <TabsList className="grid w-full grid-cols-2 max-w-max min-h-[40px] mb-8">
                  <TabsTrigger value="users" className="">
                    Go Paddi Users
                  </TabsTrigger>
                  <TabsTrigger value="non" className="">
                    Non - GoPaddi Users
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="users">
                <GoPaddiUsers />
              </TabsContent>
              <TabsContent value="non">
                <NonUsers />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

// The gopaddi for the users tab in the main component tab
const GoPaddiUsers = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="gopaddi-users">
      <div className="flex items-center gap-2">
        <div className="search relative w-full">
          <Input
            className="w-full h-[50px] bg-[#F0F2F5] px-2 rounded font-normal"
            placeholder="Enter username, email address"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {/* search results */}
          {isFocused && (
            <div className="bg-white absolute z-[1] top-14 w-full h-[200px] rounded-sm border border-primary200 shadow-xl">
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
        <Button
          variant={"default"}
          className="bg-primary600 text-white hover:bg-primary700 h-[50px] rounded px-8"
        >
          Add
        </Button>
      </div>

      {/* List of users */}
      <div className="flex flex-col gap-4 mt-5">
        <User />
        <User />
      </div>

      {/* subtotal */}
      <div className="flex items-center justify-between border-y border-y-[#E4E7EC] my-5 py-3">
        <h4 className="text-[#676E7E] flex items-center">
          Subtotal
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info
                  size={18}
                  className="text-primary600 ml-2"
                  weight="bold"
                />
              </TooltipTrigger>
              <TooltipContent className="bg-black/70">
                <div className="flex flex-col gap-2">
                  <div className="">
                    <h4 className="text-[#ABABAB] font-normal">Flights</h4>
                    <p className="text-white flex items-center gap-1">
                      <CurrencyNgn size={18} />
                      110,000{" "}
                    </p>
                  </div>
                  <div className="">
                    <h4 className="text-[#ABABAB] font-normal">Hotels</h4>
                    <p className="text-white flex items-center gap-1">
                      <CurrencyNgn size={18} />
                      110,000{" "}
                    </p>
                  </div>
                  <div className="">
                    <h4 className="text-[#ABABAB] font-normal">Activities</h4>
                    <p className="text-white flex items-center gap-1">
                      <CurrencyNgn size={18} />
                      110,000{" "}
                    </p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h4>
        <p className="flex items-center text-2xl font-medium text-[#1D2433]">
          <CurrencyNgn weight="bold" />
          <span>{addCommasToNumber(11234650)}.00</span>
        </p>
      </div>

      {/* cta */}
      <Button
        variant={"default"}
        className="flex items-center justify-center w-full min-h-[50px] rounded bg-primary600 text-white"
      >
        Share
      </Button>
    </section>
  );
};

const formSchema = z.object({
  markup: z.string({ required_error: "Trip Name is required" }),
});

// Non Gpaddi users
const NonUsers = () => {
  const [isFocused, setIsFocused] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      markup: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <section className="gopaddi-users">
      <div className="flex items-center gap-2">
        <div className="search relative w-full">
          <Input
            className="w-full h-[50px] bg-[#F0F2F5] px-2 rounded font-normal"
            placeholder="Enter username, email address"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {/* search results */}
          {isFocused && (
            <div className="bg-white absolute z-[1] top-14 w-full h-[200px] rounded-sm border border-primary200 shadow-xl">
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
        <Button
          variant={"default"}
          className="bg-primary600 text-white hover:bg-primary700 h-[50px] rounded px-8"
        >
          Add
        </Button>
      </div>

      {/* List of users */}
      <div className="flex flex-col gap-4 mt-5">
        <NoUser />
      </div>

      {/* markup */}
      <div className="form border-t border-t-[#E4E7EC] mt-5 pt-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="markup"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 space-y-0 mb-5">
                  <FormLabel className="text-[#1D2433] text-sm font-normal">
                    Markup
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your markup price"
                      className="w-full border border-[#98A2B3]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      {/* subtotal */}
      <div className="flex flex-col gap-3 border-y border-y-[#E4E7EC] my-5 py-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[#676E7E] text-sm flex items-center">
            Markup
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={15}
                    className="text-primary600 ml-2"
                    weight="bold"
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-black/70">
                  <div className="flex flex-col gap-2">
                    <div className="">
                      <h4 className="text-[#ABABAB] font-normal">Flights</h4>
                      <p className="text-white flex items-center gap-1">
                        <CurrencyNgn size={18} />
                        110,000{" "}
                      </p>
                    </div>
                    <div className="">
                      <h4 className="text-[#ABABAB] font-normal">Hotels</h4>
                      <p className="text-white flex items-center gap-1">
                        <CurrencyNgn size={18} />
                        110,000{" "}
                      </p>
                    </div>
                    <div className="">
                      <h4 className="text-[#ABABAB] font-normal">Activities</h4>
                      <p className="text-white flex items-center gap-1">
                        <CurrencyNgn size={18} />
                        110,000{" "}
                      </p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h4>
          <p className="flex items-center text-base font-medium text-[#1D2433]">
            <CurrencyNgn weight="bold" />
            <span>{addCommasToNumber(0)}.00</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-[#676E7E] text-sm flex items-center">
            Subtotal
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={15}
                    className="text-primary600 ml-2"
                    weight="bold"
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-black/70">
                  <div className="flex flex-col gap-2">
                    <div className="">
                      <h4 className="text-[#ABABAB] font-normal">Flights</h4>
                      <p className="text-white flex items-center gap-1">
                        <CurrencyNgn size={18} />
                        110,000{" "}
                      </p>
                    </div>
                    <div className="">
                      <h4 className="text-[#ABABAB] font-normal">Hotels</h4>
                      <p className="text-white flex items-center gap-1">
                        <CurrencyNgn size={18} />
                        110,000{" "}
                      </p>
                    </div>
                    <div className="">
                      <h4 className="text-[#ABABAB] font-normal">Activities</h4>
                      <p className="text-white flex items-center gap-1">
                        <CurrencyNgn size={18} />
                        110,000{" "}
                      </p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h4>
          <p className="flex items-center text-base font-medium text-[#1D2433]">
            <CurrencyNgn weight="bold" />
            <span>{addCommasToNumber(11234650)}.00</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-[#676E7E] text-sm flex items-center">
            Grand Total
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={15}
                    className="text-primary600 ml-2"
                    weight="bold"
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-black/70">
                  <div className="flex flex-col gap-2">
                    <div className="">
                      <h4 className="text-[#ABABAB] font-normal">Flights</h4>
                      <p className="text-white flex items-center gap-1">
                        <CurrencyNgn size={18} />
                        110,000{" "}
                      </p>
                    </div>
                    <div className="">
                      <h4 className="text-[#ABABAB] font-normal">Hotels</h4>
                      <p className="text-white flex items-center gap-1">
                        <CurrencyNgn size={18} />
                        110,000{" "}
                      </p>
                    </div>
                    <div className="">
                      <h4 className="text-[#ABABAB] font-normal">Activities</h4>
                      <p className="text-white flex items-center gap-1">
                        <CurrencyNgn size={18} />
                        110,000{" "}
                      </p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h4>
          <p className="flex items-center text-base font-medium text-[#1D2433]">
            <CurrencyNgn weight="bold" />
            <span>{addCommasToNumber(11234650)}.00</span>
          </p>
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

      {/* cta */}
      <Button
        variant={"default"}
        className="flex items-center justify-center w-full min-h-[50px] rounded bg-primary600 hover:bg-primary700 text-white"
      >
        Share
      </Button>
    </section>
  );
};

// user component when user search for user to share to
const User = () => {
  return (
    <div className="user flex items-center gap-2">
      <Image src={"/assets/avatar-2.png"} width={48} height={48} alt="" />
      <div className="flex flex-col">
        <h3 className="font-medium mb-1">Janedoe@gmail.com</h3>
        <p className="bg-primary100 text-primary600 text-xs w-max p-1 px-2 font-normal">
          Subscribed
        </p>
      </div>

      <span className="w-[40px] h-[40px] rounded-full border-[2px] border-[#F0F2F5] ml-auto grid place-items-center hover:bg-gray-100 cursor-pointer">
        <Trash size={18} className="text-[#344054]" />
      </span>
    </div>
  );
};

const NoUser = () => {
  return (
    <div className="user flex items-center gap-2">
      <Image
        src={"/assets/share-user-email.png"}
        width={48}
        height={48}
        alt=""
      />
      <div className="flex flex-col">
        <h3 className="font-medium mb-1">Janedoe@gmail.com</h3>
      </div>

      <span className="w-[40px] h-[40px] rounded-full border-[2px] border-[#F0F2F5] ml-auto grid place-items-center hover:bg-gray-100 cursor-pointer">
        <Trash size={18} className="text-[#344054]" />
      </span>
    </div>
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

export default ShareModal;
