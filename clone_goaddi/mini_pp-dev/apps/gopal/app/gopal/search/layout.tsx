import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import TopBar from "@/components/navigations/desktop/topbar";
import getUser from "@/lib/get-user";
import { homeLinks } from "@/data/navlinks";
import LeftSide from "../components/left/sidebar";
import Sidebar from "./sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Search",
  description: "Search || VG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="flex justify-center tracking-[-0.2px] bg-gray100 w-full max-w-[1700px] px-10 mx-auto">
          <TopBar />

          {/* section below nav bar */}
          <div className="flex justify-between items-start gap-10 w-full relative mt-28">
            {/* left side */}
            <div className="sticky top-28 left-0 z-20 flex-shrink">
              <LeftSide isUser="98" links={homeLinks} />
            </div>
            {/* The middle section */}
            <div className="middle max-w-full flex-aut w-full">{children}</div>

            {/* Right section */}
            <div className="sticky -top-[1400px] flex-[0_1_200px] w-[25%]">
              {/* <div className="h-[580px] overflow-y-scroll"> */}
              <Sidebar isUser={""} />
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
