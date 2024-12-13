"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";

import { twMerge } from "tailwind-merge";
import { tabs } from "../constants";
import { getUserId } from "@/lib/get-userId";

const Tabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const userID = getUserId()
  const { id } = params; 
  console.log(id);

  const tabList = Object.keys(tabs);
  const firstTab = tabList[0];
  const currentTab = searchParams.get("tab") ?? firstTab;

  const handleTabChange = (index: string) => {
    // console.log(`new page is here ${index}`);
    router.push(`${id}/?tab=${index}`);
  };

  if (!tabList.includes(currentTab)) {
    router.push(`?tab=${firstTab}`);
  }

  return (
    <div className="flex flex-col">
      <div className="flex mb-4 border-b-white-500 border-b-2">
        {tabList.map((tab, index) => (
          <>
         {tabs[tab].title==='Saved'&&id!==userID?
        '':

          <button
            key={index}
            className={twMerge(
              "py-2 pb-4 mx-4 font-medium text-gray-500",
              currentTab === tab &&
                "pb-2.5 border-b-4 border-b-blue-500 text-black rounded",
            )}
            onClick={() => handleTabChange(tab)}
          >
            {tabs[tab].title}
          </button>
        }
          </>
        ))}
      </div>

      <div>{tabs[currentTab]?.content}</div>
    </div>
  );
};

export default Tabs;
