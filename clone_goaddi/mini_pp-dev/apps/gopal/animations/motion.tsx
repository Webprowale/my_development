"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { childVariants } from "@/animations/staggerChildren";

const Motion = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div className={className} variants={childVariants}>
      {children}
    </motion.div>
  );
};

export default Motion;
