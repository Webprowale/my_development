"use client";
import React from "react";
import { motion } from "framer-motion";

type Props = {};

const CompanyValues = (props: Props) => {
  return (
    <div className="relative w-full bg-white ">
      <motion.img
        src="/assets/landing/values-top.svg"
        alt=""
        className="w-screen h-fit"
      />

      <img
        src="/assets/landing/plane-half.svg"
        alt=""
        className="absolute -top-20 right-0 h-[400px] w-fit"
      />

      <div className="relative min-h-[100px] bg-primary100 h-full">
        {/* <div className="mx-auto max-w-[1470px]">
          <p className="text-base text-black font-normal ">
            Making a difference
          </p>
          <h3 className="text-4xl font-extrabold inline-flex justify-center gap-y-1 mt-2 mb-4 items-center flex-col text-black">
            Our Mission
          </h3>
        </div> */}
        {/* <div className="w-full">
          <ul className="flex">
            <li className="w-20 h-20 bg-white rounded-full"></li>
            <li className="w-20 h-20 bg-white rounded-full"></li>
            <li className="w-20 h-20 bg-white rounded-full"></li>
            <li className="w-20 h-20 bg-white rounded-full"></li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default CompanyValues;
