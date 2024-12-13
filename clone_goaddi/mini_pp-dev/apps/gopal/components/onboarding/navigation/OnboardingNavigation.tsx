"use client";

import { OnboardingNavType } from "@/interfaces";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";

type Page = {
  pages: OnboardingNavType[];
};
const OnboardingNavigation = ({ pages }: Page) => {
  const [currentPage, setCurrentPage] = useState(null);
  const mode = useSearchParams();

  return (
    <>
      {/* navigation */}

      <div className="onboard-nav mt-8 mb-6 border border-[#E4E7EC] max-w-max flex items-center rounded">
        {pages.map((page: any, index) => (
          <Link
            href={page.link}
            className={`page flex items-center gap-2 px-4 py-3 text-sm ${
              mode.get("step") == page.step
                ? "bg-white font-medium"
                : "bg-[#F7F9FC] text-[#98A2B3]"
            }`}
            key={index}
            onClick={() => {
              setCurrentPage(page.step);
            }}
          >
            <span
              className={`w-[22px] h-[22px] grid place-content-center border rounded-full text-sm ${
                currentPage == page.id ? "border-black " : "border-[#D0D5DD] "
              }`}
            >
              {page.id}
            </span>
            <div className="text-sm">{page.name}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default OnboardingNavigation;
