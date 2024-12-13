import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import Offer from "./offer";
import Features from "./features";

type Props = {};

const Offerandfeatures = (props: Props) => {
  const container = useRef();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="">
      <Offer yProgress={scrollYProgress} />
      <Features yProgress={scrollYProgress} />
    </div>
  );
};

export default Offerandfeatures;
