import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: JSX.Element;
  className?: string;
  rotateFrom?: number;
  rotateTo?: number;
  yFrom?: number;
  yTo?: number;
  delay?: number;
};

const Curve = ({
  children,
  className,
  rotateFrom,
  rotateTo,
  yFrom,
  yTo,
  delay,
}: Props) => {
  const ref = useRef(null);

  const inView = useInView(ref, { once: false });

  const curve = useAnimation();

  useEffect(() => {
    if (inView) {
      curve.start("animate");
    } else {
      curve.start("initial");
    }
  }, [curve, inView]);

  return (
    <div ref={ref} className={cn(" w-full h-full", className)}>
      <motion.div
        variants={{
          initial: { opacity: 0.4, rotate: rotateFrom ?? -60, y: yFrom ?? 500 },
          animate: { opacity: 1, rotate: rotateTo ?? 0, y: yTo ?? 0 },
        }}
        initial="initial"
        animate={curve}
        transition={{
          duration: 1.5,
          delay: delay ?? 0.2,
          type: "spring",
          bounce: 0.2,
        }}
        className="origin-bottom-right"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Curve;
