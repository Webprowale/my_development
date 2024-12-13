import React, { useEffect, useRef } from "react";
import GoButton from "../goui/button";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import MaskText from "./animations/maskText";
import AnimButton from "./animations/animButton";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import Float from "@/animations/float";

type Props = {};

const Hero = (props: Props) => {
  const ref = useRef(null);
  const { scrollYProgress, scrollXProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const inView = useInView(ref, { once: true });

  const blurBgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const airplaneX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const airplaneY = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);
  const rainbowY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  // const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  const controls = useAnimation();

  const pathVariants = {
    hidden: {
      // opacity: 0,
      pathLength: 0,
      transition: {
        duration: 5,
        ease: "easeInOut",
      },
    },
    visible: {
      // opacity: 1,
      pathLength: 1,
      transition: {
        duration: 5,
        ease: "easeInOut",
      },
    },
  };

  const svgVariants = {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: { duration: 1 },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start({
        rotate: ["20deg", "30deg", "0deg", "-20deg", "0deg"],
        y: [-160, -130, -80, -50, 0],
        x: [0, 10, -10, 5, 0],

        transition: { duration: 5, ease: "easeIn", type: "keyframes" },
      });
    }
  }, [controls, inView]);

  return (
    <AnimatePresence mode="wait">
      <div ref={ref} className="relative w-full overflow-hidden">
        <motion.div
          style={{ y: textY }}
          className="relative flex flex-col z-[999]  gap-y-5 pt-40 w-full justify-start items-center  h-[1000px] mx-auto max-w-[1470px] "
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Main Text */}
            <MaskText
              containerClassName="flex flex-col items-center justify-center"
              className="text-[48px] leading-[62px] font-black text-primary1000"
              phrases={[" We've made travel so simple!"]}
            />
            {/* Ballon */}
            <Float
              xFrom={5}
              xTo={2}
              yFrom={-5}
              yTo={2}
              className="absolute -top-8 left-12"
            >
              <motion.img
                initial={{
                  rotate: "0deg",
                  y: -160,
                }}
                animate={controls}
                src="/assets/landing/baloon.svg"
                className=""
                alt=""
              />
            </Float>
          </div>
          {/* Desc */}
          <MaskText
            containerClassName="flex  flex-col items-center justify-center"
            delay={0.3}
            className="text-base text-primary1000 max-w-[470px] mx-auto text-center"
            phrases={[
              "GoPaddi helps you travel the world & connect with others doing the same.",
            ]}
          />
          {/* Action Button */}
          <Link href="/gopal/auth/sign-up?account=Gopal">
            <button type="button" data-scroll data-scroll-speed={0.1}>
              <AnimButton className="z-10 w-[180px] h-[40px] bg-primary600 text-white rounded-sm flex items-center justify-center cursor-pointer">
                <p className="m-0 text-xs font-light relative z-10">
                  Join GoPaddi.
                </p>
              </AnimButton>
            </button>
          </Link>
        </motion.div>

        <motion.img
          // style={{ y: blurBgY }}
          src="/assets/landing/blur-buildings.svg"
          alt=""
          className="w-screen h-fit object-cover z-[2] absolute bottom-0"
        />
        <motion.img
          src="/assets/landing/buildings.svg"
          alt=""
          className="w-screen h-fit z-[2] absolute bottom-0"
        />
        {/* <motion.img
        style={{ y: rainbowY }}
        src="/assets/landing/rainbow.svg"
        alt=""
        className="w-screen h-fit z-[-1]  absolute bottom-40"
      /> */}
        <motion.svg
          // variants={svgVariants}
          width="1440"
          className="w-screen h-fit z-[1]  absolute bottom-40"
          height="378"
          viewBox="0 0 1440 378"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial="hidden"
          animate="visible"
          variants={pathVariants}
        >
          <motion.path
            opacity="0.4"
            d="M1512.42 184.695C1154.7 139.781 541.955 -127.878 -75 75.1841V173.329C73.5188 104.393 296.795 35.668 593.832 38.5041C1022.16 42.6103 1359.71 259.536 1512.42 378V184.674V184.695Z"
            fill="white"
            initial="hidden"
            animate="visible"
            variants={pathVariants}
          />
        </motion.svg>
        <Clouds />
        <Float
          xFrom={-5}
          xTo={0}
          yFrom={5}
          yTo={0}
          className="absolute right-80 top-80"
        >
          <motion.img
            style={{ x: airplaneX, y: airplaneY }}
            src="/assets/landing/airplane.svg"
            alt=""
            className="w-44 h-44 object-contain "
          />
        </Float>
      </div>
    </AnimatePresence>
  );
};

export default Hero;

export const Clouds = () => {
  return (
    <div className="absolute top-10 h-40 w-screen z-[1]">
      <Marquee speed={20} className="h-40">
        <div className="relative flex w-screen justify-between">
          <img
            src="/assets/landing/cloud.svg"
            alt=""
            className="w-28 h-fit z-[2]  "
          />
          <img
            src="/assets/landing/bird.svg"
            alt=""
            className="w-10 h-fit z-[2] left-[calc(100vw-30vw)] translate-y-6"
          />
          <div className="pr-40">
            <img
              src="/assets/landing/cloud.svg"
              alt=""
              className="w-28 h-fit z-[2] absolute top-0 left-[calc(100vw-70vw)] translate-y-12"
            />
          </div>
        </div>
      </Marquee>
      <Marquee speed={38} className="h-40 pl-32">
        <div className="relative flex w-screen justify-between">
          <img
            src="/assets/landing/cloud.svg"
            alt=""
            className="w-28 h-fit z-[2]  "
          />
          <img
            src="/assets/landing/bird.svg"
            alt=""
            className="w-10 h-fit z-[2]  translate-y-12"
          />
          <div className="pr-40">
            <img
              src="/assets/landing/cloud.svg"
              alt=""
              className="w-28 h-fit z-[2] absolute top-0 left-[calc(100vw-50vw)]"
            />
          </div>
        </div>
        <img
          src="/assets/landing/bird.svg"
          alt=""
          className="w-10 h-fit z-[2] right-[calc(100vw-20vw)] -translate-y-16"
        />
      </Marquee>
    </div>
  );
};
