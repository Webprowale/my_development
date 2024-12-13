"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "@phosphor-icons/react";

import FirstForm from "./components/FirstForm";
import SecondForm from "./components/SecondForm";
import { ThirdForm } from "./components/ThirdForm";

const ElegibilityAssesment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const degree = searchParams.get("tab");
  const [information, setInformation] = useState<any>({});


  useEffect(() => {
    if (!degree) {
      router.push(
        `/gopal/study/elegibility-assesment?tab=eligibility-assessment`,
      );
    }
  }, [degree, router]);

  const blue_desk =
    "/assets/blue-desk-with-lamp-books-pencils-clock-background-is-blue-wall-desk-is-made-wood-lamp-is-black 1.svg";
  const Vector = "/assets/backbtn.svg";
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(step + 1);
  };


  console.log(information);

  return (
    <div className="bg-[#E7F0FF]">
      <header>
        <Image
          className="w-full"
          width={930}
          height={20}
          src={blue_desk}
          alt="Background Image"
        />
      </header>
      <div
        onClick={() => router.back()}
        className="text-white border w-7 border-gray-400 flex justify-center z-20 relative mt-[-16%] ml-8 mb-8 cursor-pointer"
      >
        <Image
          className="w-5 h-5"
          width={930}
          height={20}
          src={Vector}
          alt="Back Button"
        />
      </div>
      <main className="md:w-[70%] 2xl:w-[65%] relative z-10 flex justify-center mx-auto bg-white md:mt-8 pb-5 pt-8">
        <div className="md:w-[80%] mx-auto">
          <h2 className="text-[1.3rem] font-bold">Eligibility Assessment</h2>
          <p className="text-[.68rem]">
            Answer a few questions to get matched to your dream program
          </p>

          <div className="flex items-center mt-7">
            <button className="flex items-center justify-center h-8 px-2 my-1 border text-[.7rem] space-x-1">
              {degree === "Post-graduate" ? (
                <div className="flex items-center justify-center bg-primary600 h-5 w-5 rounded-full">
                  <Check color="white" size={13} />
                </div>
              ) : (
                <div className="rounded-full h-5 border border-black w-5">
                  1
                </div>
              )}
              <p>Information</p>
            </button>
            <button
              className={`flex items-center justify-center h-8 px-2 my-1 border text-[.7rem] space-x-1 ${
                degree === "Post-graduate" ? "" : "bg-gray-100 text-gray-400"
              }`}
            >
              <div
                className={`rounded-full h-5 border w-5 ${degree === "Post-graduate" ? "border border-black" : "text-black"}`}
              >
                2
              </div>
              <p>Grade</p>
            </button>
          </div>

          <div className="mt-5">
            {degree === "eligibility-assessment" && <FirstForm setInformation={setInformation} />}
            {degree === "Under-graduate" && <SecondForm />}
            {degree === "Post-graduate" && <ThirdForm information={information} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ElegibilityAssesment;
