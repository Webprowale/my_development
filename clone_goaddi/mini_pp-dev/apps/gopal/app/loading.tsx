"use client";

import type { Metadata } from "next";
import TopBar, { TopMenu } from "@/components/navigations/desktop/topbar";
import Image from "next/image";


export const metadata: Metadata = {
  title: "Fetching pages",
};

const Error = () => {
  return (
    <>
      <TopBar showNav={false} />
      <main className="flex flex-col items-center justify-center w-full h-screen">
        <Image
          src="/assets/loader/go-pal-loader.gif"
          width={100}
          height={100}
          alt="loading"
          className=" block mt-8"
        ></Image>
        
      </main>
    </>
  );
};

export default Error;
