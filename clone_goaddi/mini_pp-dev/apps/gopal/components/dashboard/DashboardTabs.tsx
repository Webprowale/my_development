"use client";

import { SettingTabList } from "@/interfaces";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

const DashboardTabs = ({ tabList }: SettingTabList) => {
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

  return (
    <div
      className="tab rounded bg-white px-6 flex items-center gap-8 overflow-scroll"
      role="tab"
    >
      {tabList &&
        tabList.map((tab: any, index: number) => (
          <Link
            href={`${path}?tab=${tab.tabName}`}
            key={index}
            role="tablist"
            className={`py-[1.313rem] hide-scrollbar  text-nowrap relative text-sm md:py-4 flex items-center gap-1 hover:text-[#1D2433]  ${mode.get("tab") === tab?.tabName ? "before:block before:absolute before:w-full before:h-[6px] text-[#1D2433] before:bg-primary600 before:rounded before:bottom-0 font-medium" : "text-[#676E7E] "} `}
          >
            {tab?.name}

            {tab.notification > 0 && (
              <span className="bg-primary600 text-xs text-white grid place-items-center w-[20px] h-[20px] rounded-full">
                {tab?.notification}
              </span>
            )}
          </Link>
        ))}
    </div>
  );
};

export default DashboardTabs;
