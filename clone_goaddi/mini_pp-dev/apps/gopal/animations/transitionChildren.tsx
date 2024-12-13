"use client";
import { ReactNode, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className: string;
  stagger?: number;
};

export const childVariants = {
  initial: {
    opacity: 0,
    y: -40,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 4,
    },
  },
};

const TranstitionChildren = ({ children, className, stagger }: Props) => {
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

  const parentVariants = {
    animate: {
      transition: {
        staggerChildren: stagger ?? 0.2,
        duration: 5,
      },
    },
  };
  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={control}
      exit="initial"
      variants={parentVariants}
      className={cn("flex flex-col", className)}
    >
      {children}
    </motion.div>
  );
};

export default TranstitionChildren;
