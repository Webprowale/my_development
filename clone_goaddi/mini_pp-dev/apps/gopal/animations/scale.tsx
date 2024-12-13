import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: JSX.Element;
  className?: string;
  delay?: number;
  rotateFrom?: number;
  rotateTo?: number;
  scaleFrom?: number;
  scaleTo?: number;
  bounce?: number;
};

const Scale = ({
  children,
  className,
  delay,
  rotateFrom,
  rotateTo,
  scaleFrom,
  scaleTo,
  bounce,
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
    <div ref={ref} className={cn("", className)}>
      <motion.div
        variants={{
          initial: {
            opacity: 0,
            scale: scaleFrom ?? 0,
            rotate: rotateFrom ?? 0,
          },
          animate: {
            opacity: 1,
            scale: scaleTo ?? 1,
            rotate: rotateTo ?? 0,
          },
        }}
        initial="initial"
        animate={curve}
        transition={{
          duration: 1.8,
          delay: delay,
          type: "spring",
          bounce: bounce ?? 0.5,
        }}
        className="origin-bottom-right"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Scale;
