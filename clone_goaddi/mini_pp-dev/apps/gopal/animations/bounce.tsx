"use client";
import { ReactNode, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useAnimation } from "framer-motion";

type Props = {
  children: ReactNode;
};

export const variants = {
  initial: {
    opacity: 0,
    y: -200,
  },
  animate: {
    opacity: 1,
    y: -50,
    transition: {
      duration: 2,
      type: "spring",
      bounce: 0.5,
    },
  },
};

const Bounce = ({ children }: Props) => {
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

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={control}
      exit="initial"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default Bounce;
