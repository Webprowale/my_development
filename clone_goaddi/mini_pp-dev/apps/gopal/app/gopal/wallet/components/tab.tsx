"use client";

import { useLink } from "@/hooks/useLink";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Tab = ({
  data,
}: {
  data: { title: string; link: string; path: string }[];
}) => {
  const router = useRouter();
  const { link, handleClick } = useLink("wallet");
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  // useEffect(() => {
  //   if (!currentTab) {
  //     router.push(`/gopal/wallet?tab=wallet`);
  //   }
  // }, []);

  const handleTabChange = (value: string) => {
    router.push(`/gopal/wallet?tab=${value}`);
  };

  return (
    <div className="flex md:justify-start justify-evenly space-x-5 md:px-5 pt-5 border-y">
      {data.map((value, index) => (
        <div
          key={index}
          className="space-y-4 cursor-pointer"
          onClick={() => {
            handleClick(value.path);
            handleTabChange(value.path);
          }}
        >
          <p
            key={index}
            className={`text-xs ${value.path === currentTab ? "black" : ""}`}
          >
            {value.title}
          </p>
          <div
            className={`h-1 rounded-2xl ${value.path === currentTab ? "bg-primary600" : ""}`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Tab;
