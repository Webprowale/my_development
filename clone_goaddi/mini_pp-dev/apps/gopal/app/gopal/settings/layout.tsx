import { dashboardLinks, goPalSettingsLinks } from "@/data/navlinks";
import LeftSide from "../components/left/sidebar";
import dashboard from "./dashboard.module.css";
import TopBar from "@/components/navigations/desktop/topbar";
import getUser from "@/lib/get-user";
import { redirect } from "next/navigation";
import TopNavbar from "@/components/navigations/mobile/TopNavbar";
import BottomNav from "@/components/navigations/mobile/bottom-nav";

export default async function SettingsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const userId = await getUser();

  if (!userId) return redirect("/gopal?mode=auth");

  return (
    <>
      <DesktopLayout children={children} uId={userId} />
      <MobileLayout children={children} uId={userId} />
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
    <div className="hidden md:flex tracking-[-0.5px] bg-gray-100 w-full max-w-[1760px]  mx-auto flex-col justify-between ">
      <TopBar isUser={uId} />
      <div className="flex justify-start justify-items-stretch items-start gap-10 w-full mt-28 px-12 flex-shrink-0 min-w-0">
        <LeftSide links={goPalSettingsLinks} />
        <div className="main mb-6 !min-w-[75%] w-full  max-w-[90%] relative bg-white min-h-[80vh] h-full rounded">
          {children}
        </div>
      </div>
    </div>
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
    <div className="block md:hidden bg-white">
      {/* Top navbar */}
      {/* <TopNavbar /> */}

      {/* main section of the page */}
      <main className="w-[100%] mx-auto mt-0 overflow-x-hidden">
        {children}
      </main>

      {/* Bottom navigation */}
      {/* <BottomNav /> */}
    </div>
  );
};
