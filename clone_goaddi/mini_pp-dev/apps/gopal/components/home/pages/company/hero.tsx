"use client";
import React from "react";
import { motion } from "framer-motion";
import { Clouds } from "../../hero";

type Props = {};

const CompanyHero = ({}: Props) => {
  const text =
    "Transforming travel experiences through innovation, limitless exploration, where every journey is a expertise, and connection, seamless, fulfilling, and inspiringa world of unforgettable adventure.".split(" ",);

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
  return (
    <div className="relative w-full overflow-hidden">
      <Clouds />
      <div className="relative flex flex-col z-[999] gap-y-5 pt-40 w-full justify-start items-center  h-[800px] mx-auto max-w-[1470px] ">
        <h3 className="relative text-6xl z-[3] font-extrabold text-center max-w-[1440px]  text-primary900">
          {text.map((el, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: i / 15,
              }}
              key={i}
            >
              {el}{" "}
            </motion.span>
          ))}
        </h3>
      </div>
      <motion.svg
        // variants={svgVariants}
        width="1440"
        className="w-screen h-fit z-[2]  absolute bottom-0"
        height="378"
        viewBox="0 0 1440 378"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
        variants={pathVariants}
      >
        <motion.path
          opacity="0.3"
          d="M1512.42 184.695C1154.7 139.781 541.955 -127.878 -75 75.1841V173.329C73.5188 104.393 296.795 35.668 593.832 38.5041C1022.16 42.6103 1359.71 259.536 1512.42 378V184.674V184.695Z"
          fill="white"
          initial="hidden"
          animate="visible"
          variants={pathVariants}
        />
      </motion.svg>
      <motion.img
        // style={{ y: blurBgY }}
        src="/assets/landing/blur-buildings.svg"
        alt=""
        className="w-screen h-fit object-cover z-[1] absolute bottom-0"
      />
    </div>
  );
};

export default CompanyHero;
