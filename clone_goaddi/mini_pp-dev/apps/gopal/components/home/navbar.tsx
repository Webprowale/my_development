"use client";
import React, { useEffect, useState } from "react";
import GoButton from "../goui/button";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import getUserId from "@/lib/get-user";
import AvatarDropdown from "../navigations/desktop/dropdown";
import { getProfileAPi } from "@/axios/endpoints/user.endpoint";
import { useAuthStore } from "@/store/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/utils";

type Props = {};

const Navbar = (props: Props) => {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);

  const scrollDirection = useScrollDirection();

  const { user } = useAuthStore((state: any) => ({ ...state }));

  const { data, isLoading } = useQuery({
    queryKey: ["getProfileAPi",user.userId],
    queryFn: () => getProfileAPi({ userId: user.userId }),
    enabled: typeof user.userId == "string",
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (scrollPosition > 300) {
        setScrolledDown(true);
      } else {
        setScrolledDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed flex justify-center items-center top-0 w-full z-[99999] h-20 transition-all duration-500",
        scrolled ? "nav_glass" : "",
        scrollDirection === "down" ? "-top-24" : "top-0",
      )}
    >
      <div className="mx-auto max-w-[1470px] justify-center  grid grid-cols-3 items-center w-full  px-4">
        <Logo />
        <Menu setActive={setActive}>
          <Link href="/features">
            <li className="list-none">Features</li>
          </Link>
          <MenuItem setActive={setActive} active={active} item="Products">
            <div className="text-sm grid grid-cols-1 gap-10 p-2">
              <ProductItem
                title="GoPal"
                href="/products/gopal"
                src="/assets/landing/nav/gopal.svg"
                description="Learn more about GoPal"
              />
              <ProductItem
                title="Get Started"
                href="/get-started"
                src="/assets/landing/nav/company/get-started.svg"
                description="Book your dream trip today - begin here!"
              />
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Company">
            <div className="text-sm grid grid-cols-1 gap-10 p-2">
              <ProductItem
                title="About Us"
                href="/company/about-us"
                src="/assets/landing/nav/company/about-us.svg"
                description="Learn more about our company's story and mission"
              />
              <ProductItem
                title="Contact Us"
                href="/company/contact"
                src="/assets/landing/nav/company/contact.svg"
                description="Get in touch with us - we'd love to hear from you!"
              />
              <ProductItem
                title="Get Started"
                href="/get-started"
                src="/assets/landing/nav/company/get-started.svg"
                description="Book your dream trip today - begin here!"
              />
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Resources">
            <div className="text-sm grid grid-cols-1 gap-10 p-2">
              <ProductItem
                title="Faqs"
                href="/faqs"
                src="/assets/landing/nav/faqs.svg"
                description="Learn more about our company's story and mission"
              />
              <ProductItem
                title="Get Started"
                href="/get-started"
                src="/assets/landing/nav/company/get-started.svg"
                description="Book your dream trip today - begin here!"
              />
            </div>
          </MenuItem>
        </Menu>

        {isLoading ? (
          <div className="">Loading...</div>
        ) : (
          <>
            {data ? (
              <Link
                href="/gopal"
                className="flex cursor-pointer col-span-1 gap-x-2 ml-auto items-center"
              >
                <Avatar className="md:w-9 md:h-9 w-8 h-8">
                  <AvatarImage src={data?.profilePicture} />
                  <AvatarFallback className="bg-primary200 font-medium uppercase">
                    {getInitials(data?.firstName + " " + data?.lastName)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              // <AvatarDropdown
              //   avatar={data?.profilePicture}
              //   firstName={data?.firstName}
              //   lastName={data?.lastName}
              //   userId={user.userId}
              // />
              <div className="flex col-span-1 gap-x-2 ml-auto items-center">
                <Link href="/auth/sign-in" className="">
                  <button className="text-primary600 font-medium text-xs bg-primary100 px-9 py-2.5 rounded-sm">
                    Login
                  </button>
                </Link>
                <Link href="/auth/sign-up?account=GoPal" className="">
                  <button className="text-white font-medium  text-xs bg-primary600 px-7 py-2.5 rounded-sm">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

const Logo = () => {
  return (
    <Link
      href="/gopal"
      className="w-fit col-span-1  h-fit relative py-1.5 px-2 rounded-sm"
    >
      <Image
        src="/assets/logo-blu.svg"
        alt="GoPaddi Logo"
        width={120}
        height={60}
        className="w-24 h-16"
      />
    </Link>
  );
};

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9]"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white backdrop-blur-sm rounded-sm overflow-hidden shadow-sm"
              >
                <motion.ul
                  layout // layout ensures smooth animation
                  className="w-max  h-full px-1 py-1.5"
                >
                  {children}
                </motion.ul>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="flex col-span-1 place-content-center place-items-center place-self-center justify-center items-center gap-6 py-6 text-primary1000 text-base font-semibold"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link
      href={href}
      className="flex space-x-2 group hover:bg-primary600 rounded-sm px-3 py-2 transition-all"
    >
      <div className="bg-primary600 rounded-sm w-14 h-12 flex justify-center items-center">
        {/* <Image
          src={src}
          width={140}
          height={70}
          alt={title}
          className="flex-shrink-0 rounded-md shadow-2xl"
        /> */}

        <img src={src} alt="" className="h-8 w-fit" />
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-1 text-black group-hover:text-white">
          {title}
        </h4>
        <p className="max-w-sm w-full text-neutral-900 text-xs font-normal  group-hover:text-gray-100">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link {...rest} className="text-neutral-700  hover:text-black ">
      {children}
    </Link>
  );
};
