"use client";
import TranstitionChildren from "@/animations/transitionChildren";
import Motion from "../../components/motion";
import React from "react";
import Curve from "@/animations/curve";
import { motion } from "framer-motion";
import Scale from "@/animations/scale";
import Float from "@/animations/float";

type Props = {};

const NewPassIllustrator = (props: Props) => {
  return (
    <div className="w-[55%] sticky top-0 h-screen text-white bg-primary600 relative overflow-hidden">
      <TranstitionChildren className="justify-center mt-20 text-center max-w-xl mx-auto text-white">
        <Motion>{""}</Motion>
        <Motion>
          <h2 className="font-bold text-2xl">Reset your password</h2>
        </Motion>
        <Motion>
          <p className="text-center text-sm font-normal mt-2">
            Simply enter your desired password and confirm it to regain access
            to your account.
          </p>
        </Motion>
      </TranstitionChildren>
      <div className="flex justify-center absolute w-full bottom-28">
        <Scale scaleFrom={0.5} bounce={0.2} delay={0.9} className="w-[450px]">
          <motion.img
            src="/assets/auth/new-password/laptop.svg"
            className="w-[450px]"
          />
        </Scale>
      </div>
      <div className="absolute bottom-0 w-full">
        {/* Hand 1 */}
        <div className="flex gap-10 items-end justify-center  w-full">
          <div className="relative">
            <Float yFrom={2} xTo={2} yTo={0}>
              <Curve delay={1.3} rotateFrom={60} yTo={2} className="w-[260px]">
                <motion.img
                  src="/assets/auth/new-password/left-hand.svg"
                  className="w-[200px] inline-flex justify-start"
                />
              </Curve>
            </Float>
          </div>
          <div className="relative">
            <Float yFrom={2} xTo={2} yTo={0}>
              <Curve delay={1.3} rotateFrom={60} yTo={2} className="w-[260px]">
                <motion.img
                  src="/assets/auth/new-password/right-hand.svg"
                  className="w-[200px] inline-flex justify-start"
                />
              </Curve>
            </Float>
          </div>
          {/* Desktop 2 */}
        </div>
      </div>
    </div>
  );
};

export default NewPassIllustrator;
