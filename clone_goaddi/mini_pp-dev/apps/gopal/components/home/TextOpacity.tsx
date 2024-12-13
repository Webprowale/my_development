"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";
import AnimButton from "./animations/animButton";

const paragraph =
  "GoPaddi puts everything you need for your trip - booking, planning, and exploring - right at your fingertips. Join the travel community and start creating memories today.";

export default function TextOpacity() {
  const words = paragraph.split(" ");
  return (
    <div className="w-full">
      <div style={{ height: "30vh" }}></div>
      <Paragraph paragraph={paragraph} />
      <Link
        className="flex w-full justify-center items-center"
        href="/gopal/auth/sign-up?account=Gopal"
      >
        <button type="button" data-scroll data-scroll-speed={0.1}>
          <AnimButton className="z-10 w-[180px] h-[40px] bg-primary600 text-white rounded-sm flex items-center justify-center cursor-pointer">
            <span className="m-0 text-xs font-light relative z-10">
              Get Started in 5 minutes
            </span>
          </AnimButton>
        </button>
      </Link>
      <div style={{ height: "20vh" }}></div>
    </div>
  );
}

function Paragraph({ paragraph }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "start 0.25"],
  });

  const words = paragraph.split(" ");
  return (
    <p
      ref={container}
      className="flex text-[60px] font-semibold text-center leading-[30px] p-[40px] justify-center max-w-[1240px] mx-auto text-gray-900 flex-wrap"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

const Word = ({ children, progress, range }) => {
  const amount = range[1] - range[0];
  const step = amount / children.length;
  return (
    <span className="relative text-center mr-[12px] mt-[36px]">
      {children.split("").map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;
        return (
          <Char key={`c_${i}`} progress={progress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
    </span>
  );
};

const Char = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span>
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  );
};
