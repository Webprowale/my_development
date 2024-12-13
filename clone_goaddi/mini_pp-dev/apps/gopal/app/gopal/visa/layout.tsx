import type { Metadata } from "next";
import LeftSide from "../components/left/sidebar";
import TopBar from "@/components/navigations/desktop/topbar";
import { homeLinks } from "@/data/navlinks";
import {
  DesktopLayout,
  MobileLayout,
} from "@/components/reusable-nav-components/ReusableResponsiveNav";

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
    <>
      <DesktopLayout children={children} />
      <MobileLayout children={children} />
    </>
  );
}
