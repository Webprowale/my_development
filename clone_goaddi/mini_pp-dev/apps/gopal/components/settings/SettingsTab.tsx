"use client";

import { SettingTabList } from "@/interfaces";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SettingsTab = ({ tabList }: SettingTabList) => {
  const mode = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  //   check if the url has no tab paramenter
  // if it does not it changes the url
  useEffect(() => {
    if (mode.get("tab") === null) {
      router.push(`${path}?tab=${tabList[0].tabName}`);
    }
  }, []);

  //   change active tab
  const changeTab = (stepName: string) => {
    router.push(`${path}?tab=${stepName}`);
  };

  return (
    <div
      className="tab border-y border-y-[#E4E7EC] px-6 flex items-center gap-8"
      role="tab"
    >
      {tabList &&
        tabList.map((tab: any, index: number) => (
          <button
            key={index}
            role="tablist"
            className={`relative text-sm py-4  ${mode.get("tab") === tab?.tabName ? "before:block before:absolute before:w-full before:h-[6px] before:bg-primary600 before:rounded before:bottom-0 font-medium" : "text-[#676E7E]"} `}
            onClick={() => {
              changeTab(tab?.tabName);
            }}
          >
            {tab?.name}
          </button>
        ))}
    </div>
  );
};

export default SettingsTab;
