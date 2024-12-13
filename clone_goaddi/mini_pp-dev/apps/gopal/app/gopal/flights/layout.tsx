import type { Metadata } from "next";
import LeftSide from "../components/left/sidebar";
import TopBar from "@/components/navigations/desktop/topbar";
import { homeLinks } from "@/data/navlinks";

export const metadata: Metadata = {
  title: "Fights",
  description: "Activities || VG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <main className="px-[unset] flex justify-center tracking-[-0.2px] bg-gray100 w-full max-w-[1700px] md:px-10 mx-auto">
         <div className="hidden md:block">
         <TopBar />
         </div>
          <div className="relative flex items-start justify-between w-full gap-10 mt-28">
            <div className="hidden md:block sticky left-0 z-20 flex-shrink top-28">
              <LeftSide isUser="98" links={homeLinks} />
            </div>
            <div className="w-full middle ">{children}</div>
          </div>
        </main>
  );
}
