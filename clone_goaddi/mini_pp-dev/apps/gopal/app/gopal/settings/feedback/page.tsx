"use client";

import SettingsHeader from "@/components/settings/SettingsHeader";
import { useSearchParams } from "next/navigation";
import Feed from "./Feed";
import Recommend from "./Recommend";
import Bugs from "./Bugs";

const FeedBack = () => {
  const mode = useSearchParams();

  return (
    <main>
      <SettingsHeader
        heading="Settings"
        subheading="Feedback"
        tabLink={links}
      />
      {mode.get("tab") === "feed" && <Feed />}
      {mode.get("tab") === "features" && <Recommend />}
      {mode.get("tab") === "bugs" && <Bugs />}
    </main>
  );
};


const links = [
  {
    id: 1,
    name: "Feedback",
    tabName: "feed",
    isActive: false,
  },
  {
    id: 2,
    name: "Recommend Features",
    tabName: "features",
    isActive: true,
  },
  {
    id: 3,
    name: "Report Bugs",
    tabName: "bugs",
    isActive: true,
  },
];
export default FeedBack;
