"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import MaskText from "./animations/maskText";

type Props = {
  yProgress: any;
};

const Offer = ({ yProgress }: Props) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(yProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(yProgress, [0, 1], [0, -5]);

  return (
    <motion.div className="bg-white py-6 w-full">
      <div className="flex flex-col justify-center gap-y-3 py-12 items-center">
        <p className="text-sm text-gray-600 font-medium ">What We Offer</p>
        <h3 className="text-4xl font-extrabold inline-flex justify-center gap-y-1 items-center flex-col text-gray-950">
          The world at your fingertips,
          <span>literally!</span>
        </h3>
      </div>
      <div ref={container} className="relative">
        {data.map((p, i) => {
          const targetScale = 1 - (data.length - i) * 0.05;
          return (
            <EachOffer
              key={`p_${i}`}
              targetScale={targetScale}
              progress={scrollYProgress}
              i={i}
              {...p}
              range={[i * 0.25, 1]}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default Offer;

const EachOffer = ({
  title,
  description,
  progress,
  targetScale,
  range,
  bg,
  i,
  cardBg,
}: {
  bg: string;
  title: string;
  progress: any;
  targetScale: number;
  i: number;
  range: number[];
  description: string[];
  cardBg: string;
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      style={{
        top: `calc(10vh + ${i * 25}px)`,
      }}
      className="max-h-[800px] h-full flex justify-center items-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
        }}
        className={cn(
          `origin-top relative bg-primary100 mx-auto max-w-[1470px] w-full grid grid-cols-2 items-center h-[calc(80vh)] py-8 px-6 rounded-md mb-10`,
          bg,
        )}
      >
        <div className="text-gray-950 flex flex-col gap-y-4 justify-start">
          <MaskText
            phrases={[title]}
            delay={0.1}
            className="text-4xl font-bold"
          />
          {/* <div className="text-4xl font-bold">{title}</div> */}
          {/* <p className="">{description}</p> */}
          <MaskText
            phrases={description}
            delay={0.2}
            className="text-start text-xl font-medium text-gray-500 max-w-[580px] text-nowrap"
          />
        </div>
        <div
          className={cn(
            "bg-primary600 relative h-full w-full rounded-sm overflow-hidden flex justify-center",
            cardBg,
            i === 0 ? "flex justify-center items-end" : "",
            i === 1 ? "flex justify-center items-start" : "",
            i === 2 ? "flex justify-center items-end" : "",
          )}
        >
          {/* <TravelConnection /> */}

          <img
            src={`/assets/landing/offer/${i + 1}.svg`}
            className={cn("w-[95%] h-fit", i === 0 ? "bottom-0  w-[80%]" : "")}
            alt=""
          />
        </div>
      </motion.div>
    </div>
  );
};

const data = [
  {
    title: "Travel, Community, Connection",
    description: [
      "Connect with fellow travelers, share travel stories,",
      "and find inspiration for your next trip.",
      // "photos, and find inspiration for your next trip. GoPaddi fosters",
      // "a vibrant online community where you can learn from others",
      // "and create lasting travel memories.",
    ],
    bg: "bg-primary100",
    cardBg: "bg-primary600",
  },
  {
    title: "Options to choose from",
    description: [
      "Explore a wide range of options when it comes to",
      "booking flights, hotels, and activities.",
      // "GoPaddi streamlines the entire booking process, saving you",
      // "time and frustration.",
    ],
    bg: "bg-neutral200",
    cardBg: "bg-neutral800",
  },
  {
    title: "Unforgettable Experiences",
    description: [
      "Take advantage of curated vacation packages and",
      "recommendations tailored to your interests.",
      // "tailored to your interests, whether it's adventure tours, cultural",
      // "immersion, or relaxing beach getaways.",
    ],
    bg: "bg-success100",
    cardBg: "bg-success900",
  },
  {
    title: "Expert Support Every Step of the Way",
    description: [
      "Get round-the-clock, personalized help with Visa, Medical,",
      "Study and Immigration processes from industry experts.",
      // "experts are available to answer your questions and provide",
      // "assistance throughout.",
    ],
    bg: "bg-secondary100",
    cardBg: "bg-secondary600",
  },
];

const BookingEngine = () => {
  return (
    <div className="relative">
      <div className="grid grid-cols-6 gap-x-2 w-full">
        <div className="">
          <div className="">Ney</div>
        </div>
      </div>
    </div>
  );
};

const TravelConnection = () => {
  return (
    <div className="relative tracking-tighter">
      <div className="bg-white w-full rounded-2xl max-w-[600px]  -rotate-[17deg]">
        <img
          src="/assets/landing/offer/post1.png"
          className="max-h-[600px] h-full max-w-[300px] w-full"
          alt=""
        />
      </div>
    </div>
  );
};
