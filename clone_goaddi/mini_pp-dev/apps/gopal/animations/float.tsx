"use client";
import { ReactNode, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useAnimation } from "framer-motion";
import { getRandomNumber } from "@/utils";

type Props = {
  children: ReactNode;
  className?: string;
  xFrom?: number;
  xTo?: number;
  yFrom?: number;
  yTo?: number;
};

const Float = ({ children, className, xFrom, xTo, yFrom, yTo }: Props) => {
  const control = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (isInView) {
      control.start("animate");
    } else {
      control.start("initial");
    }
  }, [control, isInView]);

  const variants = {
    initial: {
      opacity: 1,
      y: yFrom ?? getRandomNumber(0, 10),
      x: xFrom ?? 0,
    },
    animate: {
      opacity: 1,
      y: yTo ?? getRandomNumber(0, -20),
      x: xTo ?? getRandomNumber(0, 20),
      transition: {
        ease: "easeInOut",
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={control}
      exit="initial"
      //@ts-ignore
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Float;
