//@ts-nocheck

import Middle from "./components/middle";
import { homeLinks } from "@/data/navlinks";
import getUser from "@/lib/get-user";
import { redirect } from "next/navigation";
import { getUserId } from "@/lib/get-userId";
import TopBar from "@/components/navigations/desktop/topbar";
import LeftSide from "../components/left/sidebar";
import RightSide from "../components/right";
import Timeline from "./components/trip-timeline";

export default async function Home() {
  const userId = await getUser();
  console.log("Trip Timeline", userId);

  // if (!userId) return redirect("/gopal?mode=auth");

  return (
    <main className="flex justify-center tracking-[-0.2px] bg-gray-100 w-full max-w-[1760px]  px-10 mx-auto">
      <TopBar isUser="98" />

      {/* section below nav bar */}
      <div className="flex justify-between items-start gap-10 w-full relative mt-28">
        {/* left side */}
        <div className="left sticky top-28 left-0 z-20 flex-shrink">
          <LeftSide isUser={userId} links={homeLinks} />
        </div>
        {/* The middle section */}
        <div className="middle max-w-full flex-auto w-full">
          <Timeline />
        </div>
        {/* Right section */}
        <div className="right sticky top-28 flex-[0_1_200px]  w-[25%]">
          <RightSide isUser={userId} />
        </div>
      </div>
    </main>
  );
}
