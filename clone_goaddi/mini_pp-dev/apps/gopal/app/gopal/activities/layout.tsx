import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import LeftSide from "../components/left/sidebar";
import TopBar from "@/components/navigations/desktop/topbar";
import getUser from "@/lib/get-user";
import { homeLinks } from "@/data/navlinks";

import "./style.css";

export const metadata: Metadata = {
  title: "Activities-Gopal",
  description: "Activities || VG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <main className="flex justify-center tracking-[-0.2px] bg-gray100 w-full max-w-[1700px] px-10 mx-auto">
        <TopBar />

        {/* section below nav bar */}
        <section className="flex justify-between gap-10 w-full mt-28">
          {/* left side */}
          <div className="sticky top-28 left-0 z-20">
            <LeftSide isUser="98" links={homeLinks} />
          </div>
          {/* The middle section */}
          <div className="w-full">{children}</div>
        </section>
      </main>
    </body>
  );
}
