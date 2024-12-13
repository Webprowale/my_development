"use client";

import TopBar from "@/components/navigations/desktop/topbar";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navigation from "@/components/onboarding/navigation/OnboardingNavigation";
import OnboardingNavigation from "@/components/onboarding/navigation/OnboardingNavigation";
import ProfileSidebar from "@/components/onboarding/sidebar/ProfileSidebar";

export default function OnboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const pathName = usePathname();

  useEffect(() => {}, []);

  return (
    <div className="flex items-center max-h-screen h-screen overflow-hidden">
      <div className="left-side w-[45%] h-full py-8 px-14 bg-white overflow-auto scrollbar-none">
        <header className="flex items-center justify-between">
          <Link href={"/"}>
            <Image
              src={"/assets/logo-blue.svg"}
              alt="GoPaddi logo blue"
              className="w-[auto] h-[auto]"
              width={56}
              height={56}
            />
          </Link>

          <p className="text-[#676E7E]">
            Made an error?{" "}
            <span
              className="text-primary600 font-medium cursor-pointer"
              onClick={goBack}
            >
              Go back
            </span>
          </p>
        </header>

        {pathName.includes("gopal") && (
          <OnboardingNavigation pages={goPalNavlinks} />
        )}
        {pathName.includes("gobusiness") && (
          <OnboardingNavigation pages={goBusinessNavlinks} />
        )}
        {pathName.includes("gofamily") && (
          <OnboardingNavigation pages={goFamilyLinks} />
        )}

        {children}
      </div>
      <div className="right-side w-[55%] h-full bg-primary700">
        <Suspense>
          <ProfileSidebar />
        </Suspense>
      </div>
    </div>
  );
}

const goPalNavlinks = [
  {
    id: 1,
    name: "Profile Setup",
    link: "/onboarding/gopal?step=profile",
    step: "profile",
  },
  {
    id: 2,
    name: "Travel Style",
    link: "/onboarding/gopal?step=interest",
    step: "interest",
  },
  {
    id: 3,
    name: "Connect and explore",
    link: "/onboarding/gopal?step=connect",
    step: "connect",
  },
];

const goBusinessNavlinks = [
  {
    id: 1,
    name: "Basic information",
    link: "/onboarding/gobusiness?step=profile",
    step: "profile",
  },
  {
    id: 2,
    name: "Document Upload",
    link: "/onboarding/gobusiness?step=document",
    step: "document",
  },
];

const goFamilyLinks = [
  {
    id: 1,
    name: "Basic information",
    link: "/onboarding/gofamily?step=profile",
    step: "profile",
  },
];
