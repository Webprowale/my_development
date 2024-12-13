"use client";

import React, { useEffect, useState } from "react";
import { faqList } from "./components/dummy";
import { Flex } from "@/components/ui/flex";
import { CheckCircle } from "@phosphor-icons/react/dist/icons/CheckCircle";
import B3 from "@/components/ui/typography/b3";
import VisaRequirementForm from "./components/visa-requirement-form";
import AvailableTravelVisa from "./components/available-travel-visa";
import Head1 from "@/components/ui/typography/Head1";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useVisaStore } from "@/store/useVisaStore";

const Visa = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [fetchVisas, setFetchVisas] = useState([]);
  // const { response, fetchVisas } = useVisaStore();
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

  return (
    <main className="mb-8 visa_root">
      <div className="w-full h-[500px] bg-primary visa_hero relative px-4 md:px-[150px] pt-[15%] ">
        <Flex col className="visa_hero-content relative w-full space-y-3">
          <h1 className="font-black text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white">
            Get Your Travel Visa
          </h1>
          {deviceType === "tablet" || deviceType === "desktop" ? (
            <>
              <Flex gap={2} className="text-white">
                <p className="font-thin">Provided by</p>
                <img src="/assets/visa/Birdview.svg" alt="birdview logo" />
                <p className="font-bold">Birdview Travels</p>
              </Flex>
            </>
          ) : null}
          <VisaRequirementForm
            setFetchVisas={setFetchVisas}
            setIsFetching={setIsFetching}
          />
          {deviceType === "tablet" || deviceType === "desktop" ? (
            <div className="block space-y-3 md:space-y-0 md:gap-2 self-start md:flex md:items-center md:justify-center md:self-center">
              {[
                "Real Time Status Updates",
                "Dedicated Expert Help",
                "Complete Transparency",
              ].map((item, i) => (
                <Flex className="gap-3" key={i} gap={2}>
                  <CheckCircle className="w-[16px] h-[16px] md:w-[28px] md:h-[28px] text-white/75" />
                  <B3 className="font-bold text-sm text-white">{item}</B3>
                </Flex>
              ))}
            </div>
          ) : null}
        </Flex>
      </div>

      <AvailableTravelVisa data={fetchVisas} isFetching={isFetching} />

      <section className="bg-primary100 w-full h-auto pt-8 pb-12">
        <Flex col className="">
          <Head1 className="text-xl xl:text-2xl">
            Frequently Asked Questions
          </Head1>
        </Flex>

        <div className="w-[80%] h-auto mx-auto py-0 centered space-y-4 mt-8">
          <Accordion type="single" collapsible className="w-full">
            {faqList.map((item, index) => (
              <AccordionItem
                value={`item-${index}`}
                className="border-[1px] p-2 my-4 rounded bg-white"
              >
                <AccordionTrigger className="no-underline">
                  {item.triggerLabel}
                </AccordionTrigger>
                <AccordionContent className="p-2 bg-gray-100">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <style jsx>
        {`
          .visa_root{
            {/* border: 1px solid red; */}
          }

          .visa_hero {
            background-image: url(/assets/visa/hero-bg.webp);
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }

          @media (max-width: 768px) {
            .visa_hero {
            background-position: center top ;
           
          }
          }
        `}
      </style>
    </main>
  );
};

export default Visa;
