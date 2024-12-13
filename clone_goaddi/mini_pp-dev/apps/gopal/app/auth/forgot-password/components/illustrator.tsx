"use client";
import TranstitionChildren from "@/animations/transitionChildren";
import Motion from "../../components/motion";
import React from "react";
import Curve from "@/animations/curve";
import { motion } from "framer-motion";
import Scale from "@/animations/scale";
import Float from "@/animations/float";

type Props = {};

const ForgotIllustrator = (props: Props) => {
  return (
    <div className="w-[55%] sticky top-0 h-screen text-white bg-primary600 relative">
      <TranstitionChildren className="justify-center mt-20 text-center max-w-xl mx-auto text-white">
        <Motion>{""}</Motion>
        <Motion>
          <h2 className="font-bold text-3xl max-w-[550px] mx-auto">
            Don&apos;t worry, resetting your password is easy
          </h2>
        </Motion>
        <Motion>
          <p className="text-center text-sm font-normal mt-3">
            Forgot your password? No problem! Enter your email address below and
            we'll send you instructions on how to reset it. Check your spam
            folder if you don't see the email within a few minutes."
          </p>
        </Motion>
      </TranstitionChildren>
      <div className="flex justify-center absolute w-full bottom-44">
        {/* Padlock */}
        <Scale scaleFrom={0.5} bounce={0.2} delay={0.9} className="w-[100px]">
          <motion.img
            src="/assets/auth/forgot-password/padlock.svg"
            className="w-[100px]"
          />
        </Scale>
        {/* Left Question */}
        <div className="absolute -top-16 left-28">
          <Scale delay={1.3} rotateFrom={60} className="w-[120px]">
            <motion.img
              src="/assets/auth/forgot-password/question.svg"
              className="w-[120px] inline-flex justify-start"
            />
          </Scale>
        </div>
        {/* Right Question */}
        <div className="absolute -top-16 right-28">
          <Scale delay={1.6} rotateFrom={60} className="w-[80px]">
            <motion.img
              src="/assets/auth/forgot-password/question.svg"
              className="w-[80px] inline-flex justify-start -rotate-180"
            />
          </Scale>
        </div>

        <div className="absolute -bottom-16 left-48">
          <Scale delay={2.2} rotateFrom={60} className="w-[60px]">
            <motion.img
              src="/assets/auth/forgot-password/question.svg"
              className="w-[60px] inline-flex justify-start -rotate-180"
            />
          </Scale>
        </div>

        <div className="absolute -bottom-40 right-36">
          <Scale delay={1.9} rotateFrom={60} className="w-[140px]">
            <motion.img
              src="/assets/auth/forgot-password/question.svg"
              className="w-[140px] inline-flex justify-start"
            />
          </Scale>
        </div>
      </div>
    </div>
  );
};

export default ForgotIllustrator;
