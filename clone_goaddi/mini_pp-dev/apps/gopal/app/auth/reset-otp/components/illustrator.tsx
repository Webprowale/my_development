"use client";
import TranstitionChildren from "@/animations/transitionChildren";
import Motion from "../../components/motion";
import React from "react";
import Curve from "@/animations/curve";
import { motion } from "framer-motion";
import Scale from "@/animations/scale";
import Float from "@/animations/float";

type Props = {};

const ResetIllustrator = (props: Props) => {
  return (
    <div className="w-[55%] sticky top-0 h-screen text-white bg-primary600 relative">
      <TranstitionChildren className="justify-center mt-20 text-center max-w-xl mx-auto text-white">
        <Motion>{""}</Motion>
        <Motion>
          <h2 className="font-bold text-2xl">
            We&apos;ve sent a verification code to your email!
          </h2>
        </Motion>
        <Motion>
          <p className="text-center text-sm font-normal mt-2">
            A one-time password (OTP) has been sent to your email address.
            Please enter the code in the designated field to complete your
            login.
          </p>
        </Motion>
      </TranstitionChildren>
      <div className="flex justify-center absolute w-full bottom-28">
        <Scale scaleFrom={0.5} bounce={0.2} delay={0.9} className="w-[450px]">
          <motion.img src="/assets/desktop.png" className="w-[450px]" />
        </Scale>
      </div>
      <div className="absolute bottom-0 w-full">
        {/* Hand 1 */}
        <div className="flex gap-10 items-end justify-center  w-full">
          <div className="relative">
            <Float yFrom={5} xTo={5} yTo={0}>
              <Curve delay={1.3} rotateFrom={60} yTo={5} className="w-[400px]">
                <motion.img
                  src="/assets/hand-otp.png"
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

export default ResetIllustrator;
