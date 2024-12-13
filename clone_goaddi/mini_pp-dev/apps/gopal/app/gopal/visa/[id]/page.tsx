"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { Flex } from "@/components/ui/flex";
import B3 from "@/components/ui/typography/b3";
import Head1 from "@/components/ui/typography/Head1";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarBlank } from "@phosphor-icons/react/dist/icons/CalendarBlank";
import Caption from "@/components/ui/typography/caption";
import { Clock } from "@phosphor-icons/react/dist/icons/Clock";
import { Tag } from "@phosphor-icons/react/dist/icons/Tag";
import { Gear } from "@phosphor-icons/react/dist/icons/Gear";
import { Button } from "@/components/ui/button";
import { requiredDocs } from "../components/dummy";
import { Card } from "@/components/ui/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ModalLayout from "../components/modal-layout";
import Check from "../components/svg/check.svg";
import FailedSvg from "../components/svg/failed.svg";
import ResponseMsg from "../components/response-msg";
import EligibilityForm from "../components/check-eligibility-form";
import { useQuery } from "@tanstack/react-query";
import {
  getAllVisa,
  getVisaRequirement,
} from "@/axios/endpoints/visa.endpoint";
import { Skeleton } from "@/components/ui/skeleton";
import { Chats, Files, TestTube, Ticket } from "@phosphor-icons/react";

const VisaDetails = () => {
  const pathname = usePathname();
  const visaId = pathname.split("/")[3];
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("status");
  const visaTypeId = searchParams.get("visa-type");
  const destinationId = searchParams.get("destination");
  const router = useRouter();
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width >= 768 && width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let requirements: any;
  let requirements2: any;

  const data = {
    countryId: destinationId,
    visaTypeId: visaTypeId,
  };

  const { data: visaRequirementData, isLoading } = useQuery({
    queryKey: ["getAllVisa"],
    queryFn: () => getAllVisa(),
  });

  const filteredVisa = visaRequirementData?.data?.filter(
    (visa: any, i: number) => i === Number(visaId),
  )[0];

  console.log(filteredVisa);

  try {
    requirements = filteredVisa?.requirement1
      ? JSON.parse(filteredVisa.requirement1)
      : null;
  } catch (error) {
    console.error("Error parsing requirements:", error);
    requirements = null;
  }

  try {
    requirements2 = filteredVisa?.requirement2
      ? JSON.parse(filteredVisa.requirement2)
      : null;
  } catch (error) {
    console.error("Error parsing requirements:", error);
    requirements2 = null;
  }

  function capitalizeFirstLetter(str: string) {
    return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
  }

  let country = filteredVisa?.country || "";
  let title = filteredVisa?.title || "";
  let formattedString = `${country} ${title}`;
  let capitalizedString = capitalizeFirstLetter(formattedString);

  const eligibiltyProcessContent = [
    {
      id: 1,
      icon: <TestTube color="#0D6EFD" size={28} />,
      title: "Check Your Eligibility",
      description:
        "Complete a free assessment form to find out if you qualify for the visa",
    },
    {
      id: 2,
      icon: <Chats color="#0D6EFD" size={28} />,
      title: "We Will Reach Out",
      description:
        "Complete a free assessment form to find out if you qualify for the visa",
    },
    {
      id: 3,
      icon: <Files color="#0D6EFD" size={28} />,
      title: "Submit Documents",
      description:
        "No need to stand in line at the consulate, we will do it for you",
    },
    {
      id: 4,
      icon: <Ticket color="#0D6EFD" size={28} />,
      title: "Get Your Visa",
      description:
        "Our system provides real time status updates to keep you informed",
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      ) : (
        <main className="mb-8 visa_details_root">
          <div className="w-full h-[400px] bg-primary visa_details_hero relative centered">
            <Flex gap={2} col>
              <h1 className="font-black text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white">
                {capitalizedString}
              </h1>
              <Flex gap={2} className="text-white">
                <p className="font-thin">Provided by</p>
                <img src="/assets/visa/Birdview.svg" alt="birdview logo" />
                <p className="font-bold">Birdview Travels</p>
              </Flex>
            </Flex>
          </div>

          {/* HANDLING TABLET && DESKTOP && MOBILE RESPONSIVENESS */}
          <section className="bg-white w-full h-full p-4 md:p-6 lg:p-8 xl:p-12 md:grid md:grid-cols-12 relative">
            {deviceType === "mobile" ? (
              <div className="flex flex-col gap-9 mb-9">
                <p className="text-text-secondary text-left">
                  The study permit is a document we issue that allows foreign
                  nationals to study at designated learning institutions (DLIs)
                  in Canada. Most foreign nationals need a study permit to study
                  in Canada. Make sure you have all the documents you need
                  before you apply. You should apply before you travel to
                  Canada.
                </p>
                <hr className="w-full border-neutral400 mt-6" />
              </div>
            ) : null}
            <aside className="col-span-3">
              <div className="w-full h-auto md:sticky md:top-[140px]">
                <div className="min-w-40 border-l-[4px] border-primary space-y-3 pl-8 ">
                  <Flex col className="items-start gap-1">
                    <Flex gap={1} className="">
                      <CalendarBlank size={16} className="text-primary" />
                      <Caption>validity</Caption>
                    </Flex>

                    <h1 className="font-bold text-black text-lg">
                      {filteredVisa?.validity}
                    </h1>
                  </Flex>

                  <Flex col className="items-start gap-1">
                    <Flex gap={1}>
                      <Clock size={16} className="text-primary" />
                      <Caption>Processing</Caption>
                    </Flex>

                    <h1 className="font-bold text-black text-lg">
                      {filteredVisa?.processingTime}
                    </h1>
                  </Flex>

                  <Flex col className="items-start gap-1">
                    <Flex gap={1}>
                      <Tag size={16} className="text-primary" />
                      <Caption>Embassy Visa Fee</Caption>
                    </Flex>

                    <h1 className="font-bold text-black text-lg">{`₦ ${filteredVisa?.visaFee}`}</h1>
                  </Flex>

                  <Flex col className="items-start gap-1">
                    <Flex gap={1}>
                      <Gear size={16} className="text-primary" />
                      <Caption>Service Fee</Caption>
                    </Flex>

                    <h1 className="font-bold text-black text-lg">{`₦ ${filteredVisa?.serviceFee}`}</h1>
                  </Flex>
                </div>

                <Button
                  onClick={() => {
                    router.push(
                      `/gopal/visa/0?visa-type=${visaTypeId}&destination=${destinationId}&status=eligibility-check`,
                    );
                    setIsOpen(true);
                  }}
                  className="mt-11"
                >
                  Check Your Eligibility
                </Button>
              </div>
            </aside>
            <div className="col-span-9 h-auto space-y-16">
              {deviceType !== "mobile" ? (
                <p className="text-text-secondary text-left">
                  The study permit is a document we issue that allows foreign
                  nationals to study at designated learning institutions (DLIs)
                  in Canada. Most foreign nationals need a study permit to study
                  in Canada. Make sure you have all the documents you need
                  before you apply. You should apply before you travel to
                  Canada.
                </p>
              ) : null}

              <hr className="w-full border-neutral400 mt-6" />
              <div className="relative w-full space-y-6 mt-6">
                <Head1 className="text-3xl">Eligibility Criteria</Head1>

                <div className="acc mt-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-4"
                  >
                    {requirements2?.map((item: any, index: number) => (
                      <AccordionItem
                        value={`item-${index}`}
                        className="border-[1px] rounded bg-white"
                      >
                        <AccordionTrigger className="no-underline hover:no-underline px-6 p-2">
                          <Flex gap={2}>
                            <p className="text-primary font-black text-lg">
                              0{index + 1}.
                            </p>
                            {/* THE SPLIT FUNCTION IS USED TO HANDLE THE 
                            0.1, 0.2 etc COMING FROM BACKEND  */}
                            <p className="text-lg font-medium text-text">
                              {item?.description?.split(".")[1]}
                            </p>
                          </Flex>
                        </AccordionTrigger>
                        <AccordionContent className="p-2 bg-gray-100">
                          {item.description}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>

              <div className="relative w-full space-y-6 mt-6">
                <Head1 className="text-3xl">Application Process</Head1>
                {deviceType === "mobile" ? (
                  eligibiltyProcessContent.map((content: any) => {
                    const { id, icon, title, description } = content;

                    return (
                      <div key={id} className="flex gap-3">
                        <div>
                          <p className="w-11 h-11 bg-[#E7F0FF] rounded-full flex items-center justify-center">
                            {icon}
                          </p>
                        </div>
                        <div>
                          <p className="font-bold text-base leading-6 tracking-[-0.5px] text-[#1D2433]">
                            {title}
                          </p>
                          <p className="font-normal text-sm leading-[22px] tracking-[-0.5px] text-[#676E7E]">
                            {description}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="precess relative mt-4 h-[292px]">
                    <Image
                      src={"/assets/visa/app-process.png"}
                      alt="process"
                      fill
                      className=""
                    />
                  </div>
                )}
              </div>

              <div className="relative w-full space-y-6 mt-6">
                <Head1 className="text-3xl">Required Documents</Head1>

                <div className="precess relative mt-4 grid grid-cols-1 md:grid-cols-3  gap-5 w-full ">
                  {requiredDocs?.map((item, i) => (
                    <Card className="border border-primary200 rounded p-4 space-y-4">
                      <Flex gap={2} className="">
                        <item.icon size={24} className="text-primary" />
                        <h1 className="font-bold text-text text-lg">
                          {item.label}
                        </h1>
                      </Flex>

                      {Array.isArray(requirements) ? (
                        <B3 className="text-sm font-regular text-text-secondary text-left mt-2">
                          {i === 0 && requirements[0]?.description}
                          {i === 1 && requirements[1]?.description}
                          {i === 2 && requirements[2]?.description}
                        </B3>
                      ) : null}
                    </Card>
                  ))}
                </div>
              </div>

              <div className="get-ready w-full rounded text-center md:text-left mt-12 bg-primary100 h-[250px] p-12 space-y-5">
                <Head1 className="text-3xl">Application Process</Head1>

                <B3 className="text-sm font-regular text-text-secondary md:text-left mt-">
                  Complete our free assessment form to check your eligibility
                  and we will contact you for further assistance and
                  information.
                </B3>

                <Button
                  onClick={() => {
                    router.push(
                      `/gopal/visa/0?visa-type=${visaTypeId}&destination=${destinationId}&status=eligibility-check`,
                    );
                    setIsOpen(true);
                  }}
                  className="mt-11"
                >
                  Check Your Eligibility
                </Button>
              </div>
            </div>

            {currentQuery === "eligibility-pass-successfully" && (
              <ModalLayout
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                closeModalRoute={"/gopal/visa?tabs=all-visa"}
              >
                <ResponseMsg
                  icon={Check}
                  title="Congrats Champ!"
                  spanText="qualified"
                  text="We will reach out to you on next steps"
                />
              </ModalLayout>
            )}

            {currentQuery === "eligibility-failed" && (
              <ModalLayout
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                closeModalRoute={"/gopal/visa?tabs=all-visa"}
              >
                <ResponseMsg
                  icon={FailedSvg}
                  title="Nothing To Worry About"
                  spanText="not qualified"
                  text="But we will reach out to you with alternative solutions"
                />
              </ModalLayout>
            )}

            {currentQuery === "eligibility-check" && (
              <ModalLayout
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                closeModalRoute={`/gopal/visa/0?visa-type=${visaTypeId}&destination=${destinationId}`}
              >
                <EligibilityForm />
              </ModalLayout>
            )}
          </section>

          <style jsx>
            {`
              .visa_details_root .visa_details_hero {
                background-image: url(/assets/visa/canada-banner-big.webp);
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
              }

              .get-ready {
                background-image: url(/assets/visa/get-ready.png);
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
              }
            `}
          </style>
        </main>
      )}
    </>
  );
};

export default VisaDetails;
