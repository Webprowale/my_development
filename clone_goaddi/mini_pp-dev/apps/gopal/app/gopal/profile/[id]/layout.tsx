import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import Sidebar from "./sidebar";
import LeftSide from "../../components/left/sidebar";
import TopBar from "@/components/navigations/desktop/topbar";
import getUser from "@/lib/get-user";
import { homeLinks } from "@/data/navlinks";
import TopNavbar from "@/components/navigations/mobile/TopNavbar";
import BottomNav from "@/components/navigations/mobile/bottom-nav";
import { Plus } from "@phosphor-icons/react/dist/ssr";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile Details || VG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DesktopLayout children={children} />
      <MobileLayout children={children} />
    </>
  );
}

const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="hidden md:flex justify-center tracking-[-0.2px] bg-gray100 w-full max-w-[1700px] px-10 mx-auto">
          <TopBar />

          {/* section below nav bar */}
          <div className="flex justify-between items-start gap-10 w-full relative mt-28">
            {/* left side */}
            <div className="sticky top-28 left-0 z-20 flex-shrink">
              <LeftSide isUser="98" links={homeLinks} />
            </div>
            {/* The middle section */}
            <div className="middle max-w-full flex-auto w-[70%]">
              {children}
            </div>

            {/* Right section */}
            <div className="sticky -top-[1400px] flex-[0_1_200px] w-[30%]">
              <Sidebar isUser={""} />
            </div>
          </div>
        </main>
      </body>
    </html>
  );
};

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="block md:hidden">
      {/* Top navbar */}
      {/* <TopNavbar /> */}

      {/* main section of the page */}
      <main className="w-[100%] mx-auto mt-0 mb-20 overflow-x-hidden">
        {children}
      </main>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};
