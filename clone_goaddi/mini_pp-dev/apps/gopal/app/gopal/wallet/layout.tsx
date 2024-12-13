import TopBar from "@/components/navigations/desktop/topbar";
import { homeLinks } from "@/data/navlinks";
import { ReactNode } from "react";
import LeftSide from "../components/left/sidebar";
import RightSection from "./sections/right";
import TopNavbar from "@/components/navigations/mobile/TopNavbar";
import BottomNav from "@/components/navigations/mobile/bottom-nav";
import { Plus } from "@phosphor-icons/react/dist/ssr";

export default function Layout({
  uId,
  children,
}: {
  uId: any;
  children: ReactNode;
}) {
  return (
    <>
      <DesktopLayout children={children} uId={uId} />
      <MobileLayout children={children} uId={uId} />
    </>
  );
}

const DesktopLayout = ({
  children,
  uId,
}: {
  children: React.ReactNode;
  uId?: any;
}) => {
  return (
    <main className="hidden md:flex justify-center tracking-[-0.2px] bg-gray-100 w-full max-w-[1760px] px-10 mx-auto overflow-x-hidden">
      <TopBar isUser={uId} />

      {/* section below nav bar */}
      <div className="flex justify-between items-start md:gap-10 w-full relative md:mt-28 mb-40 md:mb-0">
        {/* left side */}
        <div className="left sticky top-28 left-0 z-20 flex-shrink ">
          <LeftSide isUser={uId} links={homeLinks} />
        </div>
        {/* The middle section */}
        <div className="middle max-w-full flex-auto w-full">{children}</div>
        <div className="right sticky top-28 flex-[0_1_200px] w-[25%] flex-shrink-0">
          <RightSection isUser={uId} />
        </div>
      </div>
    </main>
  );
};

const MobileLayout = ({
  children,
  uId,
}: {
  children: React.ReactNode;
  uId?: any;
}) => {
  return (
    <div className="block md:hidden">
      {/* Top navbar */}
      <TopNavbar />

      {/* main section of the page */}
      <main className="w-[100%] mx-auto mt-0 mb-20 overflow-x-hidden">
        {children}
      </main>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};
