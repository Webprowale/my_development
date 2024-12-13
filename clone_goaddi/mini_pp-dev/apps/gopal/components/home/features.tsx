"use client";
import React, { useRef } from "react";
import GoButton from "../goui/button";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  yProgress: any;
};

const Features = ({ yProgress }: Props) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // const scale = useTransform(yProgress, [0, 1], [0, 1]);
  // const rotate = useTransform(yProgress, [0, 1], [0, 0]);

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);
  const norx = useTransform(scrollYProgress, [0, 1], ["1%", "50%"]);

  return (
    <motion.div className="w-full bg-white ">
      <div className="flex flex-col justify-center gap-y-3 py-12 items-center">
        <p className="text-sm text-gray-600 font-medium ">Features</p>
        <h3 className="text-4xl font-extrabold inline-flex justify-center gap-y-1 items-center flex-col text-gray-950">
          Experience the Future<span>of Travel</span>
        </h3>
      </div>
      {/* <div ref={targetRef} className="w-full">
        <motion.div style={{ x }} className="flex w-full gap-10">
          {data.map((d, i) => {
            return <EachFeature {...d} />;
          })}
        </motion.div>
      </div> */}
      <section ref={targetRef} className="relative h-[200vh] ">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-4">
            {data.map((d, i) => {
              return <EachFeature {...d} />;
            })}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Features;

const EachFeature = ({
  title,
  desc,
  image,
}: {
  title: string;
  desc: string;
  image: string;
}) => {
  return (
    <div className="w-[32vw] flex flex-col justify-between gap-y-3 bg-neutral-100 px-5 pt-8 rounded-sm ">
      <div className="w-full">
        <h2 className="text-black text-2xl font-semibold">{title}</h2>
        <p className="text-black font-normal text-sm mb-3 mt-2">{desc}</p>
        <GoButton className="px-16 py-2.5 rounded-sm">Get Started</GoButton>
      </div>

      {/* <div className="mt-5 rounded-md h-[400px] bg-white"></div> */}

      <img
        src={`/assets/landing/features/${image}.svg`}
        alt=""
        className="w-full max-h-[400px] h-full pt-5"
      />
    </div>
  );
};

const data = [
  {
    title: "Trip Planner",
    desc: "GoPaddi makes it easy to create and manage your itinerary, collaborate with friends, and split payments.",
    image: "3",
  },
  {
    title: "Go Paddi",
    desc: "GoPaddi offers complete travel support with AI and human assistance.",
    list: [
      {
        head: "24/7 AI Assistant",
        desc: "Get instant answers to any travel question - flights, hotels, visas, health, activities, and more.",
      },
      {
        head: "Dedicated Relationship Managers",
        desc: "Receive personalized advice, booking help, and problem-solving support throughout your trip - like a travel concierge!",
      },
    ],
    image: "4",
  },
  {
    title: "GoPaddi Markup",
    desc: "GoPaddi Markup enables businesses and travel agents to add a profit margin to wholesale prices for flights, hotels, and vacation packages, generating revenue while using the platform. The platform also sets a predetermined markup range to protect clients from inflated pricing.",
    image: "1",
  },
  {
    title: "GoPoints",
    desc: "Earn GoPoints on every invite and enjoy lifelong commissions on your purchases and those of your referrals.",
    image: "2",
  },
];
