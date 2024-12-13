"use client";

import Motion from "@/app/auth/components/motion";
import { OnboardSidebar } from "@/interfaces";
import { useSearchParams } from "next/navigation";
import React from "react";

const ProfileSidebar = () => {
  const mode = useSearchParams();

  return (
    <section className="relative flex flex-col justify-between text-center h-full">
      <header className="text-center mt-10">
        <Motion>
          <h2 className="text-[#E7F0FF] font-bold text-[32px] mb-3">
            Set up your profile
          </h2>
        </Motion>
        <Motion>
          <p className="w-[73%] text-center mx-auto text-[#E7F0FF]">
            Enter your information to create your Go Paddi profile. Start
            exploring a world of adventure and discovery with ease. Go Paddi has
            something for everyone.
          </p>
        </Motion>
      </header>

      {/* illustrations */}
      <div className="relative">
        <Motion>
          <img
            src="/assets/onboarding/table.svg"
            alt="table"
          />
        </Motion>
      </div>
    </section>
  );
};

const goPalProfile = [
  {
    heading: "Set up your profile",
    subtitle:
      "Enter your information to create your Go Paddi profile. Start exploring a world of adventure and discovery with ease. Go Paddi has something for everyone.",
    img: "/assets/onboarding/table.svg",
  },
  {
    heading: "Select your travel preferences",
    subtitle:
      "Explore a range of options to discover your perfect travel match.",
    img: "/assets/onboarding/table.svg",
  },
  {
    heading: "Discover Inspiring Travel Stories",
    subtitle:
      "Follow fellow travelers and immerse yourself in a world of captivating content. Find inspiration for your next adventure and connect with a vibrant community united by their love of exploration.",
    img: "/assets/onboarding/table.svg",
  },
];

const goFamily = [
  {
    heading: "Set up your profile",
    subtitle:
      "Enter your information to create your Go Paddi profile. Start exploring a world of adventure and discovery with ease. Go Paddi has something for everyone.",
    img: "/assets/onboarding/table.svg",
  },
  {
    heading: "Certificate of Incorporation Required",
    subtitle:
      "To complete your registration, please upload a scanned copy of your Certificate of Incorporation (CAC). This document serves as verification of your business's legal existence.",
    img: "/assets/onboarding/table.svg",
  },
];

export default ProfileSidebar;
