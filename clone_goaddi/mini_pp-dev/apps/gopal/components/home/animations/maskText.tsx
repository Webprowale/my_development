import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function MaskText({
  phrases,
  className,
  delay,
  containerClassName,
}: {
  phrases: string[];
  className?: string;
  containerClassName?: string;
  delay?: number;
}) {
  const animation = {
    initial: { y: "100%" },
    enter: (i: number) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: delay ?? 0 + 0.1 * i,
      },
    }),
  };

  const { ref, inView, entry } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={containerClassName}>
      {phrases.map((phrase, index) => {
        return (
          <div key={index} className="overflow-hidden">
            <motion.p
              custom={index}
              variants={animation}
              initial="initial"
              animate={inView ? "enter" : ""}
              className={className}
            >
              {phrase}
            </motion.p>
          </div>
        );
      })}
    </div>
  );
}
