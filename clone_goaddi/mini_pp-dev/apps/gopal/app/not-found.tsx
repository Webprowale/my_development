"use client";

import type { Metadata } from "next";
import TopBar, { TopMenu } from "@/components/navigations/desktop/topbar";
import Image from "next/image";
import Link from "next/link";
import Mentions from "rc-mentions";

export const metadata: Metadata = {
  title: "Error 404 - Go Paddi",
  description: "An Error occurred!",
};

const Error = () => {
  return (
    <>
      <TopBar showNav={false} />
      <main className="flex flex-col items-center justify-center pt-10">
        <Image
          src="/assets/error-img.svg"
          width={450}
          height={369.98}
          alt="error page illustration"
          className=" block mt-8"
        ></Image>
        <h1 className="text-primary1100 font-bold mb-3 text-3xl mt-8">
          Error 404 - Page not found
        </h1>
        <p className=" text-[#676E7E] mb-5 w-full md:w-[33%] text-center">
          The page you requested seems to be missing. Head back to the homepage
          or try searching for it.
        </p>
        <Link
          href={"/gopal"}
          className="inline-block mt-4 bg-primary600 hover:bg-primary800 ease-in duration-150 text-white capitalize py-2 px-12 rounded-md "
        >
          Home
        </Link>
      </main>
    </>
  );
};

export default Error;
