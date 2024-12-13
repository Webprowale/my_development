import React from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";

type Props = {};

const Showcase = (props: Props) => {
  return (
    <div className="bg-[#050D27] w-full pt-20 [mask-image:linear-gradient(top,transparent,#0066ff_20%,white_80%,transparent)]">
      <div className="mx-auto max-w-[1470px] h-full text-white w-full">
        <div className="flex justify-between w-full">
          <div className="max-w-[600px] flex flex-col justify-start gap-y-2 py-12 items-start">
            <h3 className="inline-flex flex-col items-center justify-center text-4xl font-extrabold gap-y-1 text-gray-50">
              Download the All-in-One Travel <br /> App!
            </h3>
            <p className="py-8 text-lg text-white">
              The GoPaddi app helps you travel the world & connect with others
              doing the same. On GoPaddi you can book flights, hotels, and
              activities, plan a trip from start to finish, and share trips with
              friends and family. It's everything you need to see the world, all
              in one place.
            </p>
            <div className="flex items-center gap-x-3">
              <button className="flex items-center gap-2 px-5 mt-4 text-sm font-medium text-black bg-white rounded-sm h-9 text-nowrap">
                <img
                  src="/assets/landing/playstore.svg"
                  alt=""
                  className="w-5 h-fit"
                />
                Download on Google Play
              </button>
              <button className="flex items-center gap-2 px-5 mt-4 text-sm font-medium text-black bg-white rounded-sm h-9 text-nowrap">
                <img
                  src="/assets/landing/apple.svg"
                  alt=""
                  className="w-5 h-fit"
                />
                Download on Apple Store
              </button>
            </div>
          </div>

          <div className="flex items-end justify-end px-3 overflow-hidden">
            {/* <Reveal delay={1.2}> */}
            {/* </Reveal> */}
            {/* <Reveal delay={1.4}> */}

            <img
              src="/assets/landing/13promin.svg"
              alt=""
              className="w-[45%] translate-x-36 z-[1] h-[70%] "
            />
            <img src="/assets/landing/13pro.svg" alt="" className="w-[45%] " />
            {/* </Reveal> */}
          </div>
        </div>
      </div>
      {/* <CoinContainerNoGravity /> */}
    </div>
  );
};

export default Showcase;
