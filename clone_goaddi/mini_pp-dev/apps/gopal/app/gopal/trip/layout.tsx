import TopBar from "@/components/navigations/desktop/topbar";
import LeftSide from "../components/left/sidebar";
import { homeLinks } from "@/data/navlinks";

import getUser from "@/lib/get-user";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const userId = await getUser();
  return (
    <div className="tracking-[-0.5px] bg-gray-100 w-full max-w-[1760px]  mx-auto flex flex-col justify-between ">
      {/* @ts-ignore */}
      <TopBar isUser={userId} />
      <div className="flex justify-start justify-items-stretch items-start gap-10 w-full mt-28 px-12 flex-shrink-0 min-w-0">
        {/* left side */}
        <div className="left sticky top-28 left-0 z-20 flex-shrink">
          <LeftSide links={homeLinks} />
        </div>

        {/* The middle section */}
        <div className="middle max-w-full flex-auto w-full">{children}</div>
      </div>
    </div>
  );
}
