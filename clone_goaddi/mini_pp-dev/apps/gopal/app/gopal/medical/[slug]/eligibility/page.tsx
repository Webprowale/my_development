"use client";

import InformationForm from "@/components/medical/InformationForm";
import PlansForm from "@/components/medical/PlansForm";
import SuccessModal from "@/components/medical/SuccessModal";
import GoBack from "@/components/trip-planner/GoBack";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const mode = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);

  const closeSuccess = () => {
    setIsSuccess(false);
  };

  //   redirect to the url below on page load
  useEffect(() => {
    router.replace(`${currentPath}?step=info`);
  }, []);

  const active = `bg-white text-[#1D2433] font-medium`;

  return (
    <>
      <main className="min-h-[80vh] bg-primary100 pb-36 mb-10">
        {/* page banner */}
        <section
          id="banner"
          className="relativez-10 bg-primary600 w-full h-[340px] bg-[url('/assets/medical-hero.png')] bg-cover bg-center bg-no-repeat"
        >
          <GoBack className="bg-white/20 *:text-white z-20 relative" />
        </section>

        {/* section */}
        <section className="relative eligibility w-[90%] md:w-[70%] mx-auto bg-white rounded px-8 py-12 -mt-40 z-20">
          <header>
            <h1 className="text-[#1D2433] text-4xl font-bold mb-1">
              Eligibility Assessment
            </h1>
            <p className="text-[#647995] text-sm">
              Answer a few questions to see how we can help
            </p>
          </header>

          {/* Tabs */}
          <div className="grid grid-cols-2 w-max my-6">
            {Steps.map((step: any, index: number) => (
              <div
                className={`flex items-center gap-2 p-2 px-3 text-[#1D2433] border border-[#E4E7EC] w-max cursor-pointer ${mode.get("step") === step.step ? active : " font-normal bg-[#F7F9FC] text-[#98A2B3]"}`}
                key={index}
                onClick={() => {
                  router.push(`${currentPath}?step=${step.step}`);
                }}
              >
                <span className="w-[22px] h-[22px] rounded-full border grid place-items-center text-sm">
                  {step.id}
                </span>
                <span>{step?.name}</span>
              </div>
            ))}
          </div>

          {/* Forms */}
          {mode.get("step") === "info" && <InformationForm />}
          {mode.get("step") === "plan" && <PlansForm />}
        </section>
      </main>

      <Suspense>
        <SuccessModal />
      </Suspense>
    </>
  );
};

const Steps = [
  { id: 1, name: "Information", step: "info" },
  { id: 2, name: "Plans", step: "plan" },
];

export default Page;
