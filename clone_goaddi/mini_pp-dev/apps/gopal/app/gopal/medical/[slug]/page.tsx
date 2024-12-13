"use client";

import StartAssessmentModal from "@/components/medical/StartAssessmentModal";
import GoBack from "@/components/trip-planner/GoBack";
import { Button } from "@/components/ui/button";
import { addCommasToNumber } from "@/utils";
import {
  AirplaneTakeoff,
  CalendarBlank,
  Chats,
  CheckCircle,
  CheckSquareOffset,
  Clock,
  CurrencyNgn,
  Files,
  Gear,
  Globe,
  ListChecks,
  Tag,
  TestTube,
  Ticket,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = ({ params }: { params: { slug: string } }) => {
  const [eligibilityCheck, setEligibility] = useState(false);
  const router = useRouter();

  const closeEligibility = () => {
    setEligibility(false);
  };

  return (
    <>
      <main className="bg-white pb-60 mb-10 h-auto">
        <section
          id="header"
          className="relative z-10 bg-primary600 w-full h-[376px]"
        >
          <GoBack className="bg-white/20 *:text-white" />
        </section>

        {/* main section  */}
        <div className="w-[90%] md:w-[90%] mx-auto relative z-20 -m-60">
          {/* page title an image */}
          <section className="">
            <h1 className="text-4xl font-semibold mb-10 text-white text-center capitalize">
              {params.slug?.replaceAll("-", " ") || "Eye Services (Optometry)"}
            </h1>
            <Image
              src={"/assets/optometry-landscape.png"}
              width={500}
              height={362}
              className="w-full h-[280px] object-center md:h-[362px] object-cover aspect-video"
              alt=""
            />
          </section>

          {/* Services info */}
          <section className="grid grid-cols-1 md:grid-cols-[25%_75%] md:items-start my-10 gap-10 md:gap-5">
            {/* left */}
            <div className="md:sticky md:top-28">
              <div className="border-l-[3px] border-l-primary600 pl-8 flex flex-col gap-5 mb-5">
                <div className="flex flex-col gap-1">
                  <h3 className="flex items-center gap-1">
                    <CalendarBlank
                      size={15}
                      className="text-primary600"
                      weight="light"
                    />
                    <span className="uppercase tracking-wider font-medium text-sm text-[#676E7E]">
                      Validity
                    </span>
                  </h3>
                  <p className="text-black font-semibold">Up to 2 years</p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="flex items-center gap-1">
                    <Clock
                      size={15}
                      className="text-primary600"
                      weight="light"
                    />
                    <span className="uppercase tracking-wider font-medium text-sm text-[#676E7E]">
                      Processing
                    </span>
                  </h3>
                  <p className="text-black font-semibold">
                    15 - 20 business days
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="flex items-center gap-1">
                    <Tag
                      size={15}
                      className="text-primary600"
                      weight="light"
                    />
                    <span className="uppercase tracking-wider font-medium text-sm text-[#676E7E]">
                      Embassy Visa Fee
                    </span>
                  </h3>
                  <p className="text-black font-semibold flex items-center gap-1">
                    <CurrencyNgn weight="bold" /> {addCommasToNumber(450000)}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="flex items-center gap-1">
                    <Gear
                      size={15}
                      className="text-primary600"
                      weight="light"
                    />
                    <span className="uppercase tracking-wider font-medium text-sm text-[#676E7E]">
                      Service Fee
                    </span>
                  </h3>
                  <p className="text-black font-semibold flex items-center gap-1">
                    {" "}
                    <CurrencyNgn weight="bold" /> {addCommasToNumber(450000)}
                  </p>
                </div>
              </div>
              <Button
                className="bg-primary600 text-white py-6 px-6 rounded hover:bg-primary700 font-normal tracking-wide text-sm"
                onClick={() => {
                  setEligibility(true);
                }}
              >
                Take Eligibility Assessment
              </Button>
            </div>
            {/* right */}
            <div className="">
              <p className="text-[#676E7E] leading-relaxed">
                Unlocking the clarity of sight and the beauty of vision through
                our comprehensive eye care services. From routine check-ups to
                advanced treatments, our experienced team is dedicated to
                safeguarding your ocular health and enhancing your visual
                experience. With state-of-the-art technology and a commitment to
                personalized care, we strive to empower you with the best
                possible outcomes for a brighter, clearer future.
              </p>

              {/* seperator */}
              <div className="seperator w-full h-[1px] bg-[#E4E7EC] my-10"></div>

              {/* help */}
              <section className="">
                <h2 className="font-bold text-3xl mb-5">How Can We Help?</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {helpList.map((help: any, index: number) => (
                    <div
                      className="help border border-primary200 rounded p-4"
                      key={index}
                    >
                      <h3 className="flex items-center  mb-2 text-sm gap-2 text-[#1D2433] font-semibold">
                        {help.icon}
                        <span>{help.title}</span>
                      </h3>
                      <p className="text-sm text-[#676E7E]">{help.subtitle}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* seperator */}
              <div className="seperator w-full h-[1px] bg-[#E4E7EC] my-10"></div>

              {/* Requirement */}
              <section className="requirement">
                <h2 className="font-bold text-3xl mb-5">Requirements</h2>

                {/* list of  */}
                <div className="flex flex-col gap-4">
                  <p className="flex items-center gap-2 border border-primary200 p-3 rounded font-medium">
                    <span>
                      <CheckCircle
                        size={20}
                        className="text-primary600"
                      />
                    </span>
                    <span>Valid Passport</span>
                  </p>
                  <p className="flex items-center gap-2 border border-primary200 p-3 rounded font-medium">
                    <span>
                      <CheckCircle
                        size={20}
                        className="text-primary600"
                      />
                    </span>
                    <span>Letter of Acceptance</span>
                  </p>
                  <p className="flex items-center gap-2 border border-primary200 p-3 rounded font-medium">
                    <span>
                      <CheckCircle
                        size={20}
                        className="text-primary600"
                      />
                    </span>
                    <span>Passport Photo</span>
                  </p>
                </div>
              </section>

              {/* seperator */}
              <div className="seperator w-full h-[1px] bg-[#E4E7EC] my-10"></div>

              {/* Application process */}
              <section
                id="process"
                className="process"
              >
                <h2 className="font-bold text-3xl mb-5">
                  <h2 className="font-bold text-3xl mb-5">
                    Application Process
                  </h2>
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-between relative bg-no-repeat gap-10 md:gap-2">
                  {applicationProcess.map((process: any, index: number) => (
                    <div
                      className="medical-process flex flex-col items-center justify-center text-center my-5 relative z-10"
                      key={index}
                    >
                      <span className="w-[80px] h-[80px] bg-primary100 rounded-full grid place-items-center">
                        {process.icon}
                      </span>
                      <h3 className="font-semibold mt-2">{process.heading}</h3>
                      <p className="text-sm text-[#676E7E]">
                        {process.subtitle}
                      </p>
                    </div>
                  ))}

                  <img
                    src="/assets/process-link.svg"
                    alt=""
                    className="hidden md:block w-[75%] absolute left-[50%] translate-x-[-50%] right-0 top-16"
                  />
                </div>
              </section>

              {/* Bottom banner */}
              <section className="banner-bottom bg-primary100 rounded p-8 flex flex-col gap-2 text-[#1D2433] bg-[url('/assets/dot-corners.png')] bg-cover bg-center bg-no-repeat mt-10">
                <h2 className="text-3xl font-bold">Good Health, Good Life!</h2>
                <p className="text-[#676E7E]">
                  Let us help with approvals, scheduling your procedure,
                  accommodation, transfers and reimbursements.
                </p>
                <Button
                  className="bg-primary600 text-white py-6 px-6 rounded hover:bg-primary700 font-normal tracking-wide text-sm w-max mt-2"
                  onClick={() => {
                    setEligibility(true);
                  }}
                >
                  Take Eligibility Assessment
                </Button>
              </section>
            </div>
          </section>
        </div>
      </main>

      {eligibilityCheck && <StartAssessmentModal close={closeEligibility} />}
    </>
  );
};

const helpList = [
  {
    title: "Worldwide Options",
    subtitle:
      "Choices of leading hospitals which have been vetted and inspected by our team.",
    icon: (
      <Globe
        size={20}
        className="text-primary600"
      />
    ),
  },
  {
    title: "Mediate",
    subtitle:
      "We are on the ground liaising with the hospital and medical teams on your behalf.",
    icon: (
      <Chats
        size={20}
        className="text-primary600"
      />
    ),
  },
  {
    title: "Proper Documentation",
    subtitle: "We look after all your paperwork and documentation.",
    icon: (
      <CheckSquareOffset
        size={20}
        className="text-primary600"
      />
    ),
  },
  {
    title: "Planning",
    subtitle:
      "We provide you with a detailed itinerary for your treatment and care.",
    icon: (
      <ListChecks
        size={20}
        className="text-primary600"
      />
    ),
  },
  {
    title: "Save Time",
    subtitle:
      "We help you by-pass long waiting lists for treatments in any country.",
    icon: (
      <Clock
        size={20}
        className="text-primary600"
      />
    ),
  },
  {
    title: "Travel Plans",
    subtitle: "We look after all your travel, accommodation and transfers.",
    icon: (
      <AirplaneTakeoff
        size={20}
        className="text-primary600"
      />
    ),
  },
];

const applicationProcess = [
  {
    heading: "Eligibility Assessment",
    subtitle:
      "Complete a free assessment form to find out if you qualify for the visa",
    icon: (
      <TestTube
        size={34}
        className="text-primary600"
        weight="bold"
      />
    ),
  },
  {
    heading: "We Will Reach Out",
    subtitle:
      "Once you complete the form, we will contact you to provide further assistance",
    icon: (
      <Chats
        size={34}
        className="text-primary600"
        weight="bold"
      />
    ),
  },
  {
    heading: "Submit Documents",
    subtitle:
      "No need to stand in line at the consulate, we will do it for you",
    icon: (
      <Files
        size={34}
        className="text-primary600"
        weight="bold"
      />
    ),
  },
  {
    heading: "Get Your Visa",
    subtitle:
      "Our system provides real time status updates to keep you informed",
    icon: (
      <Ticket
        size={34}
        className="text-primary600"
        weight="bold"
      />
    ),
  },
];

export default Page;
