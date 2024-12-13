"use-client";

import LeftSide from "./components/left/sidebar";
import RightSide from "./components/right";
import TopBar from "@/components/navigations/desktop/topbar";
import Middle from "./components/middle";
import { homeLinks } from "@/data/navlinks";
import getUser from "@/lib/get-user";
import BottomNav from "@/components/navigations/mobile/bottom-nav";
import TopNavbar from "@/components/navigations/mobile/TopNavbar";
import FloatingButton from "@/components/navigations/mobile/FloatingButton";

export const dynamic = "force-dynamic";

export default async function Home() {
	const userId = await getUser();

	return (
		<>
			<MobileLayout uId={userId} />
			<DesktopLayout uId={userId} />
		</>
	);
}

const MobileLayout = (uId: any) => {
	return (
		<div className="block md:hidden">
			<TopNavbar />
			<main className="w-full mx-auto mt-0 mb-20">
				<Middle />
			</main>
			<BottomNav />
			<FloatingButton />
		</div>
	);
};

const DesktopLayout = (uId: any) => {
	return (
		<main className="hidden md:flex justify-center tracking-[-0.2px] bg-gray-100 w-full max-w-[1760px] px-10 mx-auto">
			<TopBar isUser={uId} />
			<div className="flex justify-between items-start md:gap-10 w-full relative md:mt-28 mb-40 md:mb-0">
				<div className="left sticky top-28 left-0 z-20 flex-shrink ">
					<LeftSide isUser={uId} links={homeLinks} />
				</div>
				<div className="middle max-w-full flex-auto w-full">
					<Middle />
				</div>
				<div className="right sticky top-28 flex-[0_1_200px] w-[25%]">
					<RightSide isUser={uId} />
				</div>
			</div>
		</main>
	);
};
