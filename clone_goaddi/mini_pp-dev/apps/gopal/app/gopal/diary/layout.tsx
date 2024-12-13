import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import TopBar from "@/components/navigations/desktop/topbar";
import { homeLinks } from "@/data/navlinks";
import LeftSide from "../components/left/sidebar";
import Sidebar from "./sidebar";
// import Sidebar from "../profile/[id]/sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Diary",
  description: "Travel Diary || Gopal",
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
            <div className="middle  w-full">{children}</div>

            {/* Right section */}
            <div className="right sticky top-28 flex-[0_1_200px] w-[25%]">
              <Sidebar />
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
